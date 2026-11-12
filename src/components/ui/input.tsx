import type * as React from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        // 16px on phones prevents iOS from zooming the page when the field is focused.
        "h-10 w-full rounded-full border border-input bg-surface-2 px-4 text-base text-foreground md:text-small",
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