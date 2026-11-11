"use client";

import { useState } from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/utils/format-time";

interface ProgressSliderProps {
  currentTime: number;
  duration: number;
  onSeek?: (seconds: number) => void;
  disabled?: boolean;
  className?: string;
}

export function ProgressSlider({
  currentTime,
  duration,
  onSeek,
  disabled = false,
  className,
}: ProgressSliderProps) {
  const [dragValue, setDragValue] = useState<number | null>(null);

  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const shown = dragValue ?? Math.min(Math.max(currentTime, 0), safeDuration);
  const isDisabled = disabled || safeDuration === 0 || !onSeek;

  return (
    <div className={cn("flex w-full items-center gap-2", className)}>
      <span className="w-10 text-right text-caption text-muted-foreground tabular-nums">
        {formatDuration(shown)}
      </span>
      <Slider
        aria-label="Seek"
        aria-valuetext={`${formatDuration(shown)} of ${formatDuration(safeDuration)}`}
        value={[shown]}
        min={0}
        max={safeDuration || 1}
        step={1}
        disabled={isDisabled}
        onValueChange={([value]) => setDragValue(value ?? 0)}
        onValueCommit={([value]) => {
          setDragValue(null);
          onSeek?.(value ?? 0);
        }}
      />
      <span className="w-10 text-caption text-muted-foreground tabular-nums">
        {formatDuration(safeDuration)}
      </span>
    </div>
  );
}
