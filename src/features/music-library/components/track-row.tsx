import type { ReactNode } from "react";
import { Heart, Pause, Play } from "lucide-react";

import { CoverArt } from "@/components/shared/cover-art";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/utils/format-time";

import { EqualizerBars } from "./equalizer-bars";

export interface TrackRowProps {
  index: number;
  title: string;
  artistName: string;
  albumTitle?: string;
  coverUrl: string;
  duration: number;
  isExplicit?: boolean;
  isAvailable: boolean;
  isCurrent: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  liked?: boolean;
  onToggleLike?: () => void;
  menu?: ReactNode;
}

const SHOW_ON_HOVER = "hidden group-focus-within:block group-hover:block";
const HIDE_ON_HOVER = "group-focus-within:hidden group-hover:hidden";

export function TrackRow({
  index,
  title,
  artistName,
  albumTitle,
  coverUrl,
  duration,
  isExplicit = false,
  isAvailable,
  isCurrent,
  isPlaying,
  onPlay,
  liked = false,
  onToggleLike,
  menu,
}: TrackRowProps) {
  const showPause = isCurrent && isPlaying;

  return (
    <div
      className={cn(
        "group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-(--duration-fast)",
        "hover:bg-foreground/5 focus-within:bg-foreground/5 md:grid-cols-[2.5rem_minmax(0,2fr)_minmax(0,1fr)_auto]",
        isCurrent && "bg-foreground/5",
      )}
    >
      <button
        type="button"
        onClick={onPlay}
        aria-label={`${showPause ? "Pause" : "Play"} ${title} by ${artistName}`}
        className="flex size-10 items-center justify-center rounded-full text-small text-muted-foreground tabular-nums focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {showPause ? (
          <>
            <EqualizerBars className={HIDE_ON_HOVER} />
            <Pause
              className={cn("size-4 fill-current text-foreground", SHOW_ON_HOVER)}
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <span className={cn(isCurrent && "text-accent", HIDE_ON_HOVER)}>
              {index}
            </span>
            <Play
              className={cn("size-4 fill-current text-foreground", SHOW_ON_HOVER)}
              aria-hidden="true"
            />
          </>
        )}
      </button>

      <div className="flex min-w-0 items-center gap-3">
        <CoverArt
          src={coverUrl}
          sizes="40px"
          className="size-10 shrink-0 rounded-md"
        />
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-small font-medium",
              isCurrent ? "text-accent" : "text-foreground",
              !isAvailable && "text-muted-foreground",
            )}
          >
            {title}
          </p>
          <div className="flex items-center gap-1.5">
            {isExplicit ? (
              <Badge
                variant="neutral"
                role="img"
                aria-label="Explicit"
                className="px-1.5 py-0"
              >
                E
              </Badge>
            ) : null}
            <p className="truncate text-caption text-muted-foreground">{artistName}</p>
            {!isAvailable ? (
              <Badge variant="outline" className="px-1.5 py-0">
                No audio
              </Badge>
            ) : null}
          </div>
        </div>
      </div>

      <p className="hidden truncate text-small text-muted-foreground md:block">
        {albumTitle}
      </p>

      <div className="flex items-center gap-1">
        {onToggleLike ? (
          <IconButton
            label="Like"
            size="sm"
            pressed={liked}
            onClick={onToggleLike}
            className={cn(liked ? "text-accent" : "text-muted-foreground")}
          >
            <Heart className={liked ? "fill-current" : undefined} aria-hidden="true" />
          </IconButton>
        ) : null}
        <p className="w-10 text-right text-small text-muted-foreground tabular-nums">
          {formatDuration(duration)}
        </p>
        {menu}
      </div>
    </div>
  );
}
