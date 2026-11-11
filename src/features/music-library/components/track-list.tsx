"use client";

import { Music2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { EmptyState } from "@/components/ui/empty-state";
import { getTrackListItem, type TrackListItem } from "@/services/catalog";
import { useFavoritesStore } from "@/stores/favorites-store";
import type { PlaybackSource } from "@/features/player/types";
import { selectCurrentTrackId, usePlayerStore } from "@/stores/player-store";

import { TrackMenu } from "./track-menu";
import { TrackRow } from "./track-row";

interface TrackListProps {
  trackIds: readonly string[];
  onRemove?: (position: number) => void;
  onMove?: (from: number, to: number) => void;
  source?: PlaybackSource;
  emptyTitle?: string;
  emptyDescription?: string;
}


export function TrackList({
  trackIds,
  onRemove,
  onMove,
  source,
  emptyTitle = "No tracks here yet",
  emptyDescription = "Tracks you add will appear in this list.",
}: TrackListProps) {
  const { currentTrackId, status } = usePlayerStore(
    useShallow((s) => ({ currentTrackId: selectCurrentTrackId(s), status: s.status })),
  );
  const playQueue = usePlayerStore((s) => s.playQueue);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const likedTrackIds = useFavoritesStore((s) => s.likedTrackIds);
  const toggleLike = useFavoritesStore((s) => s.toggleLikeTrack);

  const items: TrackListItem[] = [];
  for (const id of trackIds) {
    const item = getTrackListItem(id);
    if (item) items.push(item);
  }

  if (items.length === 0) {
    return <EmptyState icon={Music2} title={emptyTitle} description={emptyDescription} />;
  }

  const queueIds = items.map((item) => item.id);

  return (
    <ol className="flex flex-col">
      {items.map((item, position) => (
        <li key={`${item.id}-${position}`}>
          <TrackRow
            index={position + 1}
            title={item.title}
            artistName={item.artistName}
            albumTitle={item.albumTitle}
            coverUrl={item.coverUrl}
            duration={item.duration}
            isExplicit={item.isExplicit}
            isAvailable={item.isAvailable}
            isCurrent={item.id === currentTrackId}
            isPlaying={item.id === currentTrackId && status === "playing"}
            liked={likedTrackIds.includes(item.id)}
            onToggleLike={() => toggleLike(item.id)}
            onPlay={() =>
              item.id === currentTrackId
                ? togglePlay()
                : playQueue(queueIds, { startIndex: position, source })
            }
            menu={
              <TrackMenu
                trackId={item.id}
                position={position}
                count={items.length}
                onRemove={onRemove ? () => onRemove(position) : undefined}
                onMove={onMove ? (to) => onMove(position, to) : undefined}
              />
            }
          />
        </li>
      ))}
    </ol>
  );
}
