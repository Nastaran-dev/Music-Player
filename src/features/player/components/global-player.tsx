"use client";

import { usePlayerView } from "../hooks/use-player-view";
import { MusicPlayer } from "./music-player";

export function GlobalPlayer() {
  const { trackId, ...view } = usePlayerView();
  void trackId;
  return <MusicPlayer {...view} />;
}
