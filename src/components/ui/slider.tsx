"use client";

import type * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<
    React.ComponentProps<typeof SliderPrimitive.Root>,
    "aria-label" | "aria-valuetext"
  > {

  "aria-label": string;

  "aria-valuetext"?: string;
}


export function Slider({
  className,
  "aria-label": ariaLabel,
  "aria-valuetext": ariaValueText,
  ...props
}: SliderProps) {
  return (
    <SliderPrimitive.Root
      className={cn(
        "group relative flex h-5 w-full touch-none items-center select-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 grow overflow-hidden rounded-full bg-foreground/15">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-foreground transition-colors duration-(--duration-fast) group-focus-within:bg-primary group-hover:bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={ariaLabel}
        aria-valuetext={ariaValueText}
        className="block size-3 rounded-full bg-foreground opacity-0 shadow-elevation-1 transition-opacity duration-(--duration-fast) group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      />
    </SliderPrimitive.Root>
  );
}
