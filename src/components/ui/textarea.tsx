import type * as React from "react";

import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full resize-y rounded-xl border border-input bg-surface-2 px-4 py-3 text-small text-foreground",
        "placeholder:text-muted-foreground",
        "transition-[border-color,box-shadow] duration-(--duration-base) ease-(--ease-standard)",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
