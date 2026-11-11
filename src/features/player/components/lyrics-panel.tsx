"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { MicVocal } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { fetchLyrics } from "@/services/lyrics";

import { findActiveLyricIndex, isSyncedLyrics } from "../lyrics";

interface LyricsPanelProps {
  trackId: string | null;
  currentTime: number;
  onSeek?: (seconds: number) => void;
}


export function LyricsPanel({ trackId, currentTime, onSeek }: LyricsPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["lyrics", trackId],
    queryFn: () => fetchLyrics(trackId ?? ""),
    enabled: trackId !== null,
  });

  const lines = data?.lines ?? [];
  const synced = isSyncedLyrics(lines);
  const activeIndex = synced ? findActiveLyricIndex(lines, currentTime) : -1;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || activeIndex < 0) return;
    const element = container.querySelector<HTMLElement>(`[data-line="${activeIndex}"]`);
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({
      top: element.offsetTop - container.clientHeight / 2 + element.clientHeight / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeIndex]);

  if (trackId === null) {
    return (
      <EmptyState icon={MicVocal} title="Nothing playing" description="Play a song to see its lyrics." />
    );
  }

  if (isPending) {
    return (
      <div aria-busy="true" aria-label="Loading lyrics" className="flex flex-col gap-4 py-6">
        {[70, 90, 60, 80, 50, 85].map((width, i) => (
          <Skeleton key={i} className="h-6" style={{ width: `${width}%` }} />
        ))}
      </div>
    );
  }

  if (isError || !data || lines.length === 0) {
    return (
      <EmptyState
        icon={MicVocal}
        title="Lyrics unavailable"
        description="We do not have lyrics for this song yet."
      />
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Lyrics"
      tabIndex={0}
      className="relative h-full min-h-64 overflow-y-auto rounded-lg py-6 pr-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <ol className="flex flex-col gap-4">
        {lines.map((line, index) => {
          const active = index === activeIndex;
          const className = cn(
            "w-full text-left font-display text-subheading leading-snug font-semibold transition-colors duration-(--duration-base)",
            active ? "text-foreground" : "text-muted-foreground",
          );

          if (line.text === "") return <li key={index} aria-hidden="true" className="h-2" />;

          return (
            <li key={index} data-line={index}>
              {line.time !== null && onSeek ? (
                <button
                  type="button"
                  onClick={() => onSeek(line.time ?? 0)}
                  aria-current={active ? "true" : undefined}
                  className={cn(className, "rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none hover:text-foreground")}
                >
                  {line.text}
                </button>
              ) : (
                <p className={className}>{line.text}</p>
              )}
            </li>
          );
        })}
      </ol>
      <p className="pt-6 text-caption text-muted-foreground">
        {synced
          ? "Demo lyrics. Timing follows the catalog and may not match your audio file."
          : "Demo lyrics without timing."}
      </p>
    </div>
  );
}
