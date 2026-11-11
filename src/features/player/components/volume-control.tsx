"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onVolumeChange?: (volume: number) => void;
  onToggleMute?: () => void;
  disabled?: boolean;
  className?: string;
}

export function VolumeControl({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
  disabled = false,
  className,
}: VolumeControlProps) {
  const effective = muted ? 0 : volume;
  const percent = Math.round(effective * 100);
  const Icon = effective === 0 ? VolumeX : effective < 0.5 ? Volume1 : Volume2;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <IconButton
        label="Mute"
        size="sm"
        pressed={muted}
        disabled={disabled || !onToggleMute}
        onClick={onToggleMute}
      >
        <Icon aria-hidden="true" />
      </IconButton>
      <Slider
        className="w-24"
        aria-label="Volume"
        aria-valuetext={`${percent}%`}
        value={[percent]}
        min={0}
        max={100}
        step={1}
        disabled={disabled || !onVolumeChange}
        onValueChange={([value]) => onVolumeChange?.((value ?? 0) / 100)}
      />
    </div>
  );
}
