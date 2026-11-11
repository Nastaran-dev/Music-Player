"use client";

import { Heart, ListMusic, Maximize2 } from "lucide-react";

import { CoverArt } from "@/components/shared/cover-art";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

import type { PlayerStatus, PlayerTrackInfo, RepeatMode } from "../types";
import { PlayerControls } from "./player-controls";
import { ProgressSlider } from "./progress-slider";
import { VolumeControl } from "./volume-control";

export interface MusicPlayerProps {
  track: PlayerTrackInfo | null;
  status: PlayerStatus;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  liked: boolean;
  errorMessage?: string;
  onTogglePlay?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSeek?: (seconds: number) => void;
  onVolumeChange?: (volume: number) => void;
  onToggleMute?: () => void;
  onToggleShuffle?: () => void;
  onCycleRepeat?: () => void;
  onToggleLike?: () => void;
  onOpenQueue?: () => void;
  onExpand?: () => void;
}

export function MusicPlayer({
  track,
  status,
  currentTime,
  duration,
  volume,
  muted,
  shuffle,
  repeat,
  liked,
  errorMessage,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onCycleRepeat,
  onToggleLike,
  onOpenQueue,
  onExpand,
}: MusicPlayerProps) {
  const idle = track === null;
  const isPlaying = status === "playing";
  const showError = status === "error" && Boolean(errorMessage);
  const progress =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const info = (
    <>
      <CoverArt
        src={track?.coverUrl}
        sizes="56px"
        className="size-12 shrink-0 rounded-md md:size-14"
      />
      <span className="min-w-0">
        <span className="block truncate text-small font-semibold">
          {track ? track.title : "Nothing playing"}
        </span>
        <span
          aria-hidden={showError || undefined}
          className={cn(
            "block truncate text-caption",
            showError
              ? "text-subtle-destructive-foreground"
              : "text-muted-foreground",
          )}
        >
          {showError
            ? errorMessage
            : track
              ? track.artist
              : "Pick a song to start listening"}
        </span>
      </span>
    </>
  );

  return (
    <section
      aria-label="Music player"
      className="relative border-t border-border bg-surface-1/85 backdrop-blur-xl"
    >
      <p className="sr-only" aria-live="polite">
        {isPlaying && track
          ? `Now playing ${track.title} by ${track.artist}`
          : ""}
      </p>
      {showError ? (
        <p role="alert" className="sr-only">
          {errorMessage}
        </p>
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-foreground/10 md:hidden"
      >
        <div
          className="h-full bg-accent transition-[width] duration-300 ease-linear motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-3 px-3 py-2 md:grid md:grid-cols-[minmax(0,1fr)_minmax(20rem,40rem)_minmax(0,1fr)] md:gap-4 md:px-4 md:py-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {track && onExpand ? (
            <button
              type="button"
              onClick={onExpand}
              aria-label={`Open now playing: ${track.title} by ${track.artist}`}
              className="flex min-w-0 items-center gap-3 rounded-lg text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {info}
            </button>
          ) : (
            <div className="flex min-w-0 items-center gap-3">{info}</div>
          )}
          <IconButton
            label="Like"
            size="sm"
            pressed={liked}
            disabled={idle || !onToggleLike}
            onClick={onToggleLike}
            className={cn("hidden xs:inline-flex", liked && "text-accent")}
          >
            <Heart
              className={liked ? "fill-current" : undefined}
              aria-hidden="true"
            />
          </IconButton>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1 md:w-full">
          <PlayerControls
            status={status}
            hasTrack={!idle}
            shuffle={shuffle}
            repeat={repeat}
            onTogglePlay={onTogglePlay}
            onNext={onNext}
            onPrevious={onPrevious}
            onToggleShuffle={onToggleShuffle}
            onCycleRepeat={onCycleRepeat}
            secondaryClassName="hidden md:inline-flex"
          />
          <div className="hidden w-full md:block">
            <ProgressSlider
              currentTime={currentTime}
              duration={duration}
              onSeek={onSeek}
              disabled={idle}
            />
          </div>
        </div>

        <div className="hidden items-center justify-end gap-1 md:flex">
          <IconButton
            label="Queue"
            size="sm"
            disabled={!onOpenQueue}
            onClick={onOpenQueue}
          >
            <ListMusic aria-hidden="true" />
          </IconButton>
          <IconButton
            label="Open now playing"
            size="sm"
            disabled={idle || !onExpand}
            onClick={onExpand}
          >
            <Maximize2 aria-hidden="true" />
          </IconButton>
          <VolumeControl
            volume={volume}
            muted={muted}
            disabled={idle}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />
        </div>
      </div>
    </section>
  );
}
