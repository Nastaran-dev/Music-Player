"use client";

import { useShallow } from "zustand/react/shallow";

import { getArtistById, getTrackById } from "@/services/catalog";
import { useFavoritesStore } from "@/stores/favorites-store";
import {
  selectCurrentTrackId,
  selectHasNext,
  usePlayerStore,
} from "@/stores/player-store";
import { useUiStore } from "@/stores/ui-store";

import type { MusicPlayerProps } from "../components/music-player";

export function usePlayerView(): MusicPlayerProps & { trackId: string | null } {
  const state = usePlayerStore(
    useShallow((s) => ({
      trackId: selectCurrentTrackId(s),
      hasNext: selectHasNext(s),
      status: s.status,
      currentTime: s.currentTime,
      duration: s.duration,
      volume: s.volume,
      muted: s.muted,
      shuffle: s.shuffle,
      repeat: s.repeat,
      errorMessage: s.errorMessage,
    })),
  );
  const actions = usePlayerStore(
    useShallow((s) => ({
      togglePlay: s.togglePlay,
      next: s.next,
      previous: s.previous,
      seek: s.seek,
      setVolume: s.setVolume,
      toggleMute: s.toggleMute,
      toggleShuffle: s.toggleShuffle,
      cycleRepeat: s.cycleRepeat,
    })),
  );

  const liked = useFavoritesStore((s) =>
    state.trackId ? s.likedTrackIds.includes(state.trackId) : false,
  );
  const toggleLike = useFavoritesStore((s) => s.toggleLikeTrack);
  const toggleQueue = useUiStore((s) => s.toggleQueue);
  const setExpanded = useUiStore((s) => s.setExpandedPlayerOpen);

  const track = state.trackId ? getTrackById(state.trackId) : undefined;
  const trackId = track ? state.trackId : null;

  return {
    trackId,
    track: track
      ? {
          title: track.title,
          artist: getArtistById(track.artistId)?.name ?? "Unknown artist",
          coverUrl: track.coverUrl,
        }
      : null,
    status: track ? state.status : "idle",
    currentTime: state.currentTime,
    duration: state.duration,
    volume: state.volume,
    muted: state.muted,
    shuffle: state.shuffle,
    repeat: state.repeat,
    liked,
    errorMessage: state.errorMessage ?? undefined,
    onTogglePlay: actions.togglePlay,
    onNext: state.hasNext ? actions.next : undefined,
    onPrevious: actions.previous,
    onSeek: actions.seek,
    onVolumeChange: actions.setVolume,
    onToggleMute: actions.toggleMute,
    onToggleShuffle: actions.toggleShuffle,
    onCycleRepeat: actions.cycleRepeat,
    onToggleLike: trackId ? () => toggleLike(trackId) : undefined,
    onOpenQueue: toggleQueue,
    onExpand: trackId ? () => setExpanded(true) : undefined,
  };
}
