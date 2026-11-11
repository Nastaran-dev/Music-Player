import type * as React from "react";

import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-7 items-center justify-center rounded-md border border-border bg-surface-2 px-1.5 py-0.5 text-caption font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}
