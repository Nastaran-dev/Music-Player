import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { safeLocalStorage } from "@/lib/safe-storage";

import { getAudioEngine, type EngineSnapshot } from "@/features/player/engine";
import {
  findNextIndex,
  findPreviousIndex,
  insertAt,
  moveItem,
  removeAt,
  shuffleKeepingCurrent,
} from "@/features/player/queue";
import type { PlaybackSource, PlayerStatus, RepeatMode } from "@/features/player/types";
import { getTrackById } from "@/services/catalog";

import { useRecentStore } from "./recent-store";

/** Pressing "previous" after this many seconds restarts the track instead of going back. */
const RESTART_THRESHOLD_SECONDS = 3;

const REPEAT_ORDER: Record<RepeatMode, RepeatMode> = {
  off: "all",
  all: "one",
  one: "off",
};

const isPlayableId = (id: string | undefined): boolean =>
  id !== undefined && Boolean(getTrackById(id)?.audioUrl);

function unavailableMessage(trackId: string): string {
  return process.env.NODE_ENV === "production"
    ? "This track is unavailable."
    : `No audio file linked for ${trackId}. Add it in src/mocks/audio-sources.ts.`;
}

interface PlayQueueOptions {
  startIndex?: number;
  /** Explicitly turn shuffle on or off for this queue. */
  shuffle?: boolean;
  /** The album or playlist this queue came from (shown in Recently played). */
  source?: PlaybackSource;
}

export interface PlayerState {
  /** Unshuffled order, used to restore the list when shuffle is turned off. */
  baseQueue: string[];
  /** Current play order (track ids). */
  queue: string[];
  /** -1 when nothing is selected. */
  currentIndex: number;
  status: PlayerStatus;
  currentTime: number;
  duration: number;
  errorMessage: string | null;

  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;

  playQueue: (trackIds: readonly string[], options?: PlayQueueOptions) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;

  /** Jump to an item already in the queue. */
  playAt: (index: number) => void;
  addToQueue: (trackId: string) => void;
  /** Inserts right after the current track. */
  playNext: (trackId: string) => void;
  /** Only upcoming items (after the current one) can be removed or moved. */
  removeFromQueue: (index: number) => void;
  moveInQueue: (from: number, to: number) => void;
  /** Keeps only the current track. */
  clearQueue: () => void;

  /** Called by PlayerEngineBridge. Not for components. */
  syncFromEngine: (snapshot: EngineSnapshot) => void;
  handleEnded: () => void;
}

function createPlayerStore() {
  return create<PlayerState>()(
    persist(
      (set, get) => {
        /** Loads and starts the track at `index`, or reports it as unavailable. */
        const startAt = (index: number): void => {
          const trackId = get().queue[index];
          const track = trackId ? getTrackById(trackId) : undefined;
          if (!trackId || !track) return;

          const engine = getAudioEngine();

          if (!track.audioUrl) {
            engine?.stop();
            set({
              currentIndex: index,
              status: "error",
              currentTime: 0,
              duration: track.duration,
              errorMessage: unavailableMessage(trackId),
            });
            return;
          }

          useRecentStore.getState().recordTrack(trackId);
          set({
            currentIndex: index,
            status: "loading",
            currentTime: 0,
            duration: track.duration,
            errorMessage: null,
          });
          engine?.load(track.audioUrl, { autoplay: true });
        };

        const neighborParams = () => {
          const { queue, currentIndex, repeat } = get();
          return {
            length: queue.length,
            currentIndex,
            repeat,
            isPlayable: (index: number) => isPlayableId(queue[index]),
          };
        };

        return {
          baseQueue: [],
          queue: [],
          currentIndex: -1,
          status: "idle",
          currentTime: 0,
          duration: 0,
          errorMessage: null,

          volume: 0.8,
          muted: false,
          shuffle: false,
          repeat: "off",

          playQueue: (trackIds, options = {}) => {
            const ids = [...trackIds];
            if (ids.length === 0) return;

            const shuffle = options.shuffle ?? get().shuffle;
            const firstPlayable = ids.findIndex((id) => isPlayableId(id));
            const requested =
              options.startIndex ??
              (options.shuffle
                ? Math.floor(Math.random() * ids.length)
                : Math.max(firstPlayable, 0));
            const startIndex = Math.min(Math.max(requested, 0), ids.length - 1);

            if (shuffle) {
              set({
                baseQueue: ids,
                queue: shuffleKeepingCurrent(ids, ids[startIndex]),
                shuffle,
              });
              startAt(0);
            } else {
              set({ baseQueue: ids, queue: ids, shuffle });
              startAt(startIndex);
            }
            if (options.source) useRecentStore.getState().recordContext(options.source);
          },

          togglePlay: () => {
            const { status, currentIndex } = get();
            if (currentIndex < 0) return;
            const engine = getAudioEngine();

            if (status === "playing" || status === "loading") {
              engine?.pause();
            } else if (status === "error" || status === "idle") {
              startAt(currentIndex); // retry
            } else {
              void engine?.play();
            }
          },

          next: () => {
            const index = findNextIndex(neighborParams());
            if (index !== null) startAt(index);
          },

          previous: () => {
            const engine = getAudioEngine();
            if (get().currentTime > RESTART_THRESHOLD_SECONDS) {
              engine?.seek(0);
              return;
            }
            const index = findPreviousIndex(neighborParams());
            if (index !== null) startAt(index);
            else engine?.seek(0);
          },

          seek: (seconds) => {
            getAudioEngine()?.seek(seconds);
            set({ currentTime: seconds });
          },

          setVolume: (volume) => {
            const next = Math.min(Math.max(volume, 0), 1);
            // Dragging the slider up while muted unmutes.
            const muted = next === 0 ? get().muted : false;
            const engine = getAudioEngine();
            engine?.setVolume(next);
            engine?.setMuted(muted);
            set({ volume: next, muted });
          },

          toggleMute: () => {
            const muted = !get().muted;
            getAudioEngine()?.setMuted(muted);
            set({ muted });
          },

          toggleShuffle: () => {
            const { shuffle, baseQueue, queue, currentIndex } = get();
            const currentId = queue[currentIndex];

            if (!shuffle) {
              if (currentId === undefined) {
                set({ shuffle: true });
                return;
              }
              set({
                shuffle: true,
                queue: shuffleKeepingCurrent(baseQueue, currentId),
                currentIndex: 0,
              });
              return;
            }

            set({
              shuffle: false,
              queue: baseQueue,
              currentIndex: currentId === undefined ? -1 : baseQueue.indexOf(currentId),
            });
          },

          cycleRepeat: () => set((state) => ({ repeat: REPEAT_ORDER[state.repeat] })),

          playAt: (index) => {
            if (index >= 0 && index < get().queue.length) startAt(index);
          },

          addToQueue: (trackId) => {
            const { queue, baseQueue, shuffle } = get();
            const nextQueue = [...queue, trackId];
            set({ queue: nextQueue, baseQueue: shuffle ? [...baseQueue, trackId] : nextQueue });
          },

          playNext: (trackId) => {
            const { queue, baseQueue, currentIndex, shuffle } = get();
            const nextQueue = insertAt(queue, currentIndex + 1, trackId);
            const currentId = queue[currentIndex];
            const baseAt = currentId === undefined ? 0 : baseQueue.indexOf(currentId) + 1;
            set({
              queue: nextQueue,
              baseQueue: shuffle ? insertAt(baseQueue, baseAt, trackId) : nextQueue,
            });
          },

          removeFromQueue: (index) => {
            const { queue, baseQueue, currentIndex, shuffle } = get();
            const id = queue[index];
            if (id === undefined || index <= currentIndex) return;
            const nextQueue = removeAt(queue, index);
            set({
              queue: nextQueue,
              baseQueue: shuffle ? removeAt(baseQueue, baseQueue.indexOf(id)) : nextQueue,
            });
          },

          moveInQueue: (from, to) => {
            const { queue, baseQueue, currentIndex, shuffle } = get();
            if (from <= currentIndex || to <= currentIndex) return;
            const nextQueue = moveItem(queue, from, to);
            set({ queue: nextQueue, baseQueue: shuffle ? baseQueue : nextQueue });
          },

          clearQueue: () => {
            const { queue, currentIndex } = get();
            const current = queue[currentIndex];
            const kept = current === undefined ? [] : [current];
            set({ queue: kept, baseQueue: kept, currentIndex: kept.length ? 0 : -1 });
          },

          syncFromEngine: (snapshot) => {
            // "idle" only happens when we unload a source ourselves; the store already knows.
            if (snapshot.status === "idle") return;
            set((state) => ({
              status: snapshot.status,
              currentTime: snapshot.currentTime,
              duration: snapshot.duration > 0 ? snapshot.duration : state.duration,
              errorMessage:
                snapshot.status === "error"
                  ? (snapshot.error ?? "Playback failed.")
                  : null,
            }));
          },

          handleEnded: () => {
            const engine = getAudioEngine();
            if (get().repeat === "one") {
              engine?.seek(0);
              void engine?.play();
              return;
            }
            const index = findNextIndex(neighborParams());
            if (index !== null) startAt(index);
          },
        };
      },
      {
        name: "vybe:player",
        storage: createJSONStorage(() => safeLocalStorage),
        // Persist playback preferences only (not the queue or position).
        partialize: (state) => ({
          volume: state.volume,
          muted: state.muted,
          shuffle: state.shuffle,
          repeat: state.repeat,
        }),
        skipHydration: true,
      },
    ),
  );
}

const globalForPlayer = globalThis as typeof globalThis & {
  __vybePlayerStore?: ReturnType<typeof createPlayerStore>;
};

/** One store instance, even when dev hot reloading re-runs this module. */
export const usePlayerStore = (globalForPlayer.__vybePlayerStore ??= createPlayerStore());

export const selectCurrentTrackId = (state: PlayerState): string | null =>
  state.queue[state.currentIndex] ?? null;

export const selectHasNext = (state: PlayerState): boolean =>
  findNextIndex({
    length: state.queue.length,
    currentIndex: state.currentIndex,
    repeat: state.repeat,
    isPlayable: (index) => isPlayableId(state.queue[index]),
  }) !== null;