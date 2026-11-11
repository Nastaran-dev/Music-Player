"use client";

import { useEffect } from "react";

import { getAlbumById, getArtistById, getTrackById } from "@/services/catalog";
import { selectCurrentTrackId, usePlayerStore } from "@/stores/player-store";

export function useMediaSession(): void {
  const trackId = usePlayerStore(selectCurrentTrackId);
  const status = usePlayerStore((s) => s.status);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const track = trackId ? getTrackById(trackId) : undefined;
    navigator.mediaSession.metadata = track
      ? new MediaMetadata({
          title: track.title,
          artist: getArtistById(track.artistId)?.name ?? "",
          album: getAlbumById(track.albumId)?.title ?? "",
          artwork: [{ src: track.coverUrl, sizes: "512x512", type: "image/svg+xml" }],
        })
      : null;
  }, [trackId]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.playbackState =
      status === "playing" ? "playing" : status === "paused" ? "paused" : "none";
  }, [status]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const session = navigator.mediaSession;
    const handlers: Array<[MediaSessionAction, MediaSessionActionHandler]> = [
      ["play", () => {
        const { status: current, togglePlay } = usePlayerStore.getState();
        if (current !== "playing" && current !== "loading") togglePlay();
      }],
      ["pause", () => {
        const { status: current, togglePlay } = usePlayerStore.getState();
        if (current === "playing" || current === "loading") togglePlay();
      }],
      ["previoustrack", () => usePlayerStore.getState().previous()],
      ["nexttrack", () => usePlayerStore.getState().next()],
      ["seekto", (details) => {
        if (details.seekTime !== undefined && details.seekTime !== null) {
          usePlayerStore.getState().seek(details.seekTime);
        }
      }],
    ];

    for (const [action, handler] of handlers) {
      try {
        session.setActionHandler(action, handler);
      } catch {
      }
    }
    return () => {
      for (const [action] of handlers) {
        try {
          session.setActionHandler(action, null);
        } catch {
          // Ignore.
        }
      }
    };
  }, []);
}
