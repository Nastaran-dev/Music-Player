"use client";

import type * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

export function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  // min-w-0 lets the tabs shrink inside flex/grid parents instead of pushing the page wider.
  return <TabsPrimitive.Root className={cn("min-w-0", className)} {...props} />;
}

export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        // Phones: full width; if the tabs do not fit they scroll sideways inside the pill.
        // From `sm` up: the pill is only as wide as its tabs.
        "flex w-full max-w-full items-center gap-1 overflow-x-auto rounded-full bg-surface-2 p-1 sm:inline-flex sm:w-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full px-3 text-small font-medium whitespace-nowrap text-muted-foreground sm:px-4",
        "transition-colors duration-(--duration-base) ease-(--ease-standard) hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "data-[state=active]:bg-secondary data-[state=active]:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("mt-6 min-w-0 focus-visible:outline-none", className)}
      {...props}
    />
  );
}