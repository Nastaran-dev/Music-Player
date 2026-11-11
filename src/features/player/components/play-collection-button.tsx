"use client";

import { Play, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { usePlayerStore } from "@/stores/player-store";

import type { PlaybackSource } from "../types";

interface PlayCollectionButtonProps {
  trackIds: readonly string[];
  label: string;
  variant?: "overlay" | "button";
  shuffle?: boolean;
  source?: PlaybackSource;
}

export function PlayCollectionButton({
  trackIds,
  label,
  variant = "button",
  shuffle = false,
  source,
}: PlayCollectionButtonProps) {
  const playQueue = usePlayerStore((s) => s.playQueue);
  const empty = trackIds.length === 0;
  const start = () => playQueue(trackIds, shuffle ? { shuffle: true, source } : { source });

  if (variant === "overlay") {
    return (
      <IconButton
        label={label}
        variant="primary"
        size="lg"
        showTooltip={false}
        disabled={empty}
        onClick={start}
        className="absolute right-3 bottom-3 z-10 translate-y-2 opacity-0 shadow-elevation-2 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100"
      >
        <Play className="fill-current" aria-hidden="true" />
      </IconButton>
    );
  }

  return (
    <Button
      size="lg"
      variant={shuffle ? "outline" : "primary"}
      disabled={empty}
      onClick={start}
    >
      {shuffle ? (
        <Shuffle aria-hidden="true" />
      ) : (
        <Play className="fill-current" aria-hidden="true" />
      )}
      {shuffle ? "Shuffle" : "Play"}
      <span className="sr-only"> {label}</span>
    </Button>
  );
}
