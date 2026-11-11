"use client";

import { useEffect } from "react";

import { usePlayerStore } from "@/stores/player-store";
import { useUiStore } from "@/stores/ui-store";

import { getShortcutAction } from "../keyboard";

const SEEK_STEP_SECONDS = 5;
const VOLUME_STEP = 0.05;

export function useKeyboardShortcuts(): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const action = getShortcutAction(event);
      if (!action) return;

      const player = usePlayerStore.getState();
      const hasTrack = player.currentIndex >= 0;
      event.preventDefault();

      switch (action) {
        case "togglePlay":
          player.togglePlay();
          break;
        case "seekForward":
          if (hasTrack) player.seek(player.currentTime + SEEK_STEP_SECONDS);
          break;
        case "seekBackward":
          if (hasTrack) player.seek(Math.max(0, player.currentTime - SEEK_STEP_SECONDS));
          break;
        case "volumeUp":
          player.setVolume(player.volume + VOLUME_STEP);
          break;
        case "volumeDown":
          player.setVolume(player.volume - VOLUME_STEP);
          break;
        case "next":
          player.next();
          break;
        case "previous":
          if (hasTrack) player.previous();
          break;
        case "toggleMute":
          player.toggleMute();
          break;
        case "showHelp":
          useUiStore.getState().setShortcutsOpen(true);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
