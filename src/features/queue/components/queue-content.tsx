"use client";

import { ArrowDown, ArrowUp, ListMusic, X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { CoverArt } from "@/components/shared/cover-art";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { getTrackListItem } from "@/services/catalog";
import { usePlayerStore } from "@/stores/player-store";

export function QueueContent() {
  const { queue, currentIndex } = usePlayerStore(
    useShallow((s) => ({ queue: s.queue, currentIndex: s.currentIndex })),
  );
  const { playAt, removeFromQueue, moveInQueue, clearQueue } = usePlayerStore(
    useShallow((s) => ({
      playAt: s.playAt,
      removeFromQueue: s.removeFromQueue,
      moveInQueue: s.moveInQueue,
      clearQueue: s.clearQueue,
    })),
  );

  const current = currentIndex >= 0 ? getTrackListItem(queue[currentIndex] ?? "") : undefined;
  const upcoming = queue
    .map((id, index) => ({ index, item: getTrackListItem(id) }))
    .filter((entry) => entry.index > currentIndex && entry.item !== undefined);

  if (!current && upcoming.length === 0) {
    return (
      <EmptyState
        icon={ListMusic}
        title="Your queue is empty"
        description="Play a song, or use “Add to queue” on any track."
        className="m-4"
      />
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
      {current ? (
        <section aria-labelledby="queue-now">
          <h3 id="queue-now" className="mb-2 text-caption font-semibold tracking-widest text-muted-foreground uppercase">
            Now playing
          </h3>
          <div className="flex items-center gap-3">
            <CoverArt src={current.coverUrl} sizes="48px" className="size-12 shrink-0 rounded-md" />
            <div className="min-w-0">
              <p className="truncate text-small font-semibold text-accent">{current.title}</p>
              <p className="truncate text-caption text-muted-foreground">{current.artistName}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="queue-next" className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 id="queue-next" className="text-caption font-semibold tracking-widest text-muted-foreground uppercase">
            Next up ({upcoming.length})
          </h3>
          {upcoming.length > 0 ? (
            <Button size="sm" variant="ghost" onClick={clearQueue}>
              Clear queue
            </Button>
          ) : null}
        </div>

        {upcoming.length === 0 ? (
          <p className="text-small text-muted-foreground">Nothing is queued after this song.</p>
        ) : (
          <ol className="flex flex-col gap-1">
            {upcoming.map(({ index, item }, i) =>
              item ? (
                <li key={`${item.id}-${index}`} className="flex items-center gap-1 rounded-lg hover:bg-foreground/5">
                  <button
                    type="button"
                    onClick={() => playAt(index)}
                    aria-label={`Play ${item.title} by ${item.artistName}`}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-1.5 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <CoverArt src={item.coverUrl} sizes="40px" className="size-10 shrink-0 rounded-md" />
                    <span className="min-w-0">
                      <span className="block truncate text-small font-medium">{item.title}</span>
                      <span className="block truncate text-caption text-muted-foreground">
                        {item.artistName}
                      </span>
                    </span>
                  </button>
                  <IconButton
                    label={`Move ${item.title} up`}
                    size="sm"
                    disabled={i === 0}
                    onClick={() => moveInQueue(index, index - 1)}
                  >
                    <ArrowUp aria-hidden="true" />
                  </IconButton>
                  <IconButton
                    label={`Move ${item.title} down`}
                    size="sm"
                    disabled={i === upcoming.length - 1}
                    onClick={() => moveInQueue(index, index + 1)}
                  >
                    <ArrowDown aria-hidden="true" />
                  </IconButton>
                  <IconButton
                    label={`Remove ${item.title} from queue`}
                    size="sm"
                    onClick={() => removeFromQueue(index)}
                  >
                    <X aria-hidden="true" />
                  </IconButton>
                </li>
              ) : null,
            )}
          </ol>
        )}
      </section>
    </div>
  );
}
