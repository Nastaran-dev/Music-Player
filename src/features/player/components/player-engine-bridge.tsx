"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { getAudioEngine } from "@/features/player/engine";
import { usePlayerStore } from "@/stores/player-store";

import { useMediaSession } from "../hooks/use-media-session";

/**
 * Connects the framework-free AudioEngine to the Zustand store:
 * engine events flow into the store, and persisted volume settings
 * flow back into the engine. Renders nothing.
 */
export function PlayerEngineBridge() {
  useMediaSession();

  // Tell the user when a song cannot be played (missing file, network or decode error).
  useEffect(
    () =>
      usePlayerStore.subscribe((state, previous) => {
        const justFailed =
          state.status === "error" &&
          (previous.status !== "error" || state.currentIndex !== previous.currentIndex);
        if (justFailed && state.errorMessage) {
          toast.error(state.errorMessage, { id: "playback-error" });
        }
      }),
    [],
  );

  useEffect(() => {
    const engine = getAudioEngine();
    if (!engine) return;

    const stopSync = engine.subscribe((snapshot) =>
      usePlayerStore.getState().syncFromEngine(snapshot),
    );
    // If the engine is already playing (e.g. after a hot reload), catch up immediately.
    usePlayerStore.getState().syncFromEngine(engine.getSnapshot());
    const stopEnded = engine.onEnded(() => usePlayerStore.getState().handleEnded());

    let cancelled = false;
    void Promise.resolve(usePlayerStore.persist.rehydrate()).then(() => {
      if (cancelled) return;
      const { volume, muted } = usePlayerStore.getState();
      engine.setVolume(volume);
      engine.setMuted(muted);
    });

    return () => {
      cancelled = true;
      stopSync();
      stopEnded();
    };
  }, []);

  return null;
}