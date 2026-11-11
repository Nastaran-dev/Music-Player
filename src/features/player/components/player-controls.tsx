"use client";

import { AnimatePresence, motion } from "motion/react";
import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { DURATION } from "@/constants/motion";
import { cn } from "@/lib/utils";

import type { PlayerStatus, RepeatMode } from "../types";

interface PlayerControlsProps {
  status: PlayerStatus;
  hasTrack: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  onTogglePlay?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onToggleShuffle?: () => void;
  onCycleRepeat?: () => void;
  secondaryClassName?: string;
  className?: string;
}

const ACTIVE = "text-accent";

export function PlayerControls({
  status,
  hasTrack,
  shuffle,
  repeat,
  onTogglePlay,
  onNext,
  onPrevious,
  onToggleShuffle,
  onCycleRepeat,
  secondaryClassName,
  className,
}: PlayerControlsProps) {
  const idle = !hasTrack;
  const isPlaying = status === "playing";
  const RepeatIcon = repeat === "one" ? Repeat1 : Repeat;

  return (
    <div className={cn("flex items-center gap-1 md:gap-2", className)}>
      <IconButton
        label="Shuffle"
        size="sm"
        pressed={shuffle}
        disabled={idle || !onToggleShuffle}
        onClick={onToggleShuffle}
        className={cn(secondaryClassName, shuffle && ACTIVE)}
      >
        <Shuffle aria-hidden="true" />
      </IconButton>
      <IconButton
        label="Previous track"
        disabled={idle || !onPrevious}
        onClick={onPrevious}
        className={secondaryClassName}
      >
        <SkipBack className="fill-current" aria-hidden="true" />
      </IconButton>
      <IconButton
        label={isPlaying ? "Pause" : "Play"}
        variant="primary"
        size="lg"
        loading={status === "loading"}
        disabled={idle || !onTogglePlay}
        onClick={onTogglePlay}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isPlaying ? "pause" : "play"}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            className="flex"
          >
            {isPlaying ? (
              <Pause className="fill-current" aria-hidden="true" />
            ) : (
              <Play className="fill-current" aria-hidden="true" />
            )}
          </motion.span>
        </AnimatePresence>
      </IconButton>
      <IconButton label="Next track" disabled={idle || !onNext} onClick={onNext}>
        <SkipForward className="fill-current" aria-hidden="true" />
      </IconButton>
      <IconButton
        label={`Repeat: ${repeat}`}
        size="sm"
        pressed={repeat !== "off"}
        disabled={idle || !onCycleRepeat}
        onClick={onCycleRepeat}
        className={cn(secondaryClassName, repeat !== "off" && ACTIVE)}
      >
        <RepeatIcon aria-hidden="true" />
      </IconButton>
    </div>
  );
}
