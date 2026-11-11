"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import { QueueContent } from "@/features/queue/components/queue-content";
import { useUiStore } from "@/stores/ui-store";

import { usePlayerView } from "../hooks/use-player-view";
import { ExpandedPlayerContent } from "./expanded-player-content";
import { LyricsPanel } from "./lyrics-panel";

export function ExpandedPlayer() {
  const open = useUiStore((s) => s.expandedPlayerOpen);
  const setOpen = useUiStore((s) => s.setExpandedPlayerOpen);
  const { trackId, ...view } = usePlayerView();

  return (
    <DialogPrimitive.Root open={open && view.track !== null} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content className="fixed inset-0 z-(--z-modal) outline-none data-[state=closed]:animate-slide-out-bottom data-[state=open]:animate-slide-in-bottom">
          <DialogPrimitive.Title className="sr-only">Now playing</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Large artwork, playback controls, lyrics and the queue for the current song.
          </DialogPrimitive.Description>
          <ExpandedPlayerContent
            {...view}
            onClose={() => setOpen(false)}
            lyrics={<LyricsPanel trackId={trackId} currentTime={view.currentTime} onSeek={view.onSeek} />}
            queue={<QueueContent />}
          />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
