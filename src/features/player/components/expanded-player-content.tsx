"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronDown, Heart } from "lucide-react";

import { CoverArt } from "@/components/shared/cover-art";
import { IconButton } from "@/components/ui/icon-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import { DURATION, EASE } from "@/constants/motion";
import { cn } from "@/lib/utils";

import type { MusicPlayerProps } from "./music-player";
import { PlayerControls } from "./player-controls";
import { ProgressSlider } from "./progress-slider";
import { VolumeControl } from "./volume-control";

interface ExpandedPlayerContentProps extends MusicPlayerProps {
  lyrics: ReactNode;
  queue: ReactNode;
  onClose?: () => void;
}

export function ExpandedPlayerContent({
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
  lyrics,
  queue,
  onClose,
}: ExpandedPlayerContentProps) {
  const idle = track === null;

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <CoverArt
        src={track?.coverUrl}
        sizes="200px"
        className="pointer-events-none absolute inset-0 scale-150 opacity-40 blur-3xl"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-background/70" />

      <div className="relative flex items-center gap-2 px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-2">
        <IconButton label="Close now playing" onClick={onClose}>
          <ChevronDown aria-hidden="true" />
        </IconButton>
        <Typography variant="overline" tone="muted" as="p">
          Now playing
        </Typography>
      </div>

      <div className="relative grid min-h-0 flex-1 gap-8 overflow-y-auto px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] lg:grid-cols-2 lg:overflow-hidden lg:px-12">
        <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-6">
          <motion.div
            key={`${track?.title ?? ""}|${track?.coverUrl ?? ""}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: status === "playing" ? 1 : 0.95 }}
            transition={{ duration: DURATION.slow, ease: EASE.emphasized }}
          >
            <CoverArt
              src={track?.coverUrl}
              sizes="(min-width: 1024px) 28rem, 80vw"
              priority
              className="aspect-square w-full rounded-2xl shadow-elevation-3"
            />
          </motion.div>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Typography variant="title" as="h2" className="truncate text-heading">
                {track?.title ?? "Nothing playing"}
              </Typography>
              <Typography
                tone={status === "error" ? "default" : "muted"}
                className={cn("truncate", status === "error" && "text-subtle-destructive-foreground")}
              >
                {status === "error" && errorMessage ? errorMessage : (track?.artist ?? "")}
              </Typography>
            </div>
            <IconButton
              label="Like"
              pressed={liked}
              disabled={idle || !onToggleLike}
              onClick={onToggleLike}
              className={cn(liked && "text-accent")}
            >
              <Heart className={liked ? "fill-current" : undefined} aria-hidden="true" />
            </IconButton>
          </div>

          <ProgressSlider
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            disabled={idle}
          />

          <div className="flex items-center justify-between gap-4">
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
              className="w-full justify-between"
            />
          </div>

          <VolumeControl
            className="hidden justify-center md:flex"
            volume={volume}
            muted={muted}
            disabled={idle}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />
        </div>

        <Tabs defaultValue="lyrics" className="flex min-h-0 flex-col pb-4">
          <TabsList aria-label="Now playing details" className="self-start">
            <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
            <TabsTrigger value="queue">Queue</TabsTrigger>
          </TabsList>
          <TabsContent value="lyrics" className="mt-4 h-[50dvh] min-h-0 lg:h-auto lg:flex-1">
            {lyrics}
          </TabsContent>
          <TabsContent value="queue" className="mt-4 flex h-[50dvh] min-h-0 flex-col lg:h-auto lg:flex-1">
            {queue}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
