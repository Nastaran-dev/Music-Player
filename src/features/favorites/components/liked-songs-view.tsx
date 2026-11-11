"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { CollectionHeader } from "@/components/layout/collection-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { TrackList } from "@/features/music-library/components/track-list";
import { PlayCollectionButton } from "@/features/player/components/play-collection-button";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { getTrackById } from "@/services/catalog";
import { useFavoritesStore } from "@/stores/favorites-store";
import { formatTotalDuration } from "@/utils/format-time";

export function LikedSongsView() {
  const hydrated = usePersistHydrated(useFavoritesStore);
  const likedIds = useFavoritesStore((s) => s.likedTrackIds);

  if (!hydrated) {
    return (
      <div aria-busy="true" className="flex flex-col gap-3">
        <Skeleton className="h-56 w-full rounded-xl" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  const total = likedIds.reduce((sum, id) => sum + (getTrackById(id)?.duration ?? 0), 0);

  return (
    <>
      <CollectionHeader
        kind="Playlist"
        title="Liked Songs"
        coverUrl=""
        meta={[
          `${likedIds.length} ${likedIds.length === 1 ? "song" : "songs"}`,
          ...(likedIds.length > 0 ? [formatTotalDuration(total)] : []),
        ]}
        actions={
          <>
            <PlayCollectionButton trackIds={likedIds} label="Liked Songs" />
            <PlayCollectionButton trackIds={likedIds} label="Liked Songs" shuffle />
          </>
        }
      />
      {likedIds.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Songs you like will show up here"
          description="Tap the heart on any track to save it."
          action={
            <Button asChild variant="outline">
              <Link href="/discover">Find something to like</Link>
            </Button>
          }
        />
      ) : (
        <TrackList trackIds={likedIds} />
      )}
    </>
  );
}
