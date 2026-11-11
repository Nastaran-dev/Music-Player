"use client";

import { X } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useUiStore } from "@/stores/ui-store";

import { QueueContent } from "./queue-content";

export function QueueDock() {
  const open = useUiStore((s) => s.queueOpen);
  const setOpen = useUiStore((s) => s.setQueueOpen);
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  if (!open) return null;

  if (isDesktop) {
    return (
      <aside
        aria-label="Queue"
        className="flex w-80 shrink-0 flex-col border-l border-border bg-surface-1"
      >
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="font-display text-subheading font-semibold">Queue</h2>
          <IconButton label="Close queue" size="sm" onClick={() => setOpen(false)}>
            <X aria-hidden="true" />
          </IconButton>
        </div>
        <QueueContent />
      </aside>
    );
  }

  return (
    <Sheet open onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[min(22rem,92vw)]">
        <SheetTitle className="px-4 pt-4 font-display text-subheading font-semibold">Queue</SheetTitle>
        <QueueContent />
      </SheetContent>
    </Sheet>
  );
}
