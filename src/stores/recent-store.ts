import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { safeLocalStorage } from "@/lib/safe-storage";

import type { PlaybackSource } from "@/features/player/types";

const MAX_HISTORY = 100;
const MAX_CONTEXTS = 20;

export interface HistoryEntry {
  trackId: string;
  playedAt: string;
}

export interface ContextEntry extends PlaybackSource {
  playedAt: string;
}

interface RecentState {
  history: HistoryEntry[];
  contexts: ContextEntry[];
  recordTrack: (trackId: string) => void;
  recordContext: (source: PlaybackSource) => void;
  clearHistory: () => void;
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set) => ({
      history: [],
      contexts: [],
      recordTrack: (trackId) =>
        set((s) => ({
          history: [{ trackId, playedAt: new Date().toISOString() }, ...s.history].slice(0, MAX_HISTORY),
        })),
      recordContext: (source) =>
        set((s) => ({
          contexts: [
            { ...source, playedAt: new Date().toISOString() },
            ...s.contexts.filter((c) => !(c.type === source.type && c.id === source.id)),
          ].slice(0, MAX_CONTEXTS),
        })),
      clearHistory: () => set({ history: [], contexts: [] }),
    }),
    { name: "vybe:recent",
      storage: createJSONStorage(() => safeLocalStorage), skipHydration: true },
  ),
);

export function getRecentTrackIds(history: readonly HistoryEntry[], limit: number): string[] {
  return [...new Set(history.map((entry) => entry.trackId))].slice(0, limit);
}
