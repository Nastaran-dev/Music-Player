"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ListMusic, Plus } from "lucide-react";

import { CardGrid } from "@/components/shared/media-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { usePlaylistsStore } from "@/stores/playlists-store";

import { PlaylistCard } from "./playlist-card";
import { LazyPlaylistFormDialog } from "./lazy-playlist-form-dialog";

export function YourPlaylists() {
  const router = useRouter();
  const hydrated = usePersistHydrated(usePlaylistsStore);
  const playlists = usePlaylistsStore((s) => s.playlists);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus aria-hidden="true" /> Create playlist
        </Button>
      </div>

      {!hydrated ? (
        <div aria-busy="true" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      ) : playlists.length === 0 ? (
        <EmptyState
          icon={ListMusic}
          title="You have no playlists yet"
          description="Create one, then add songs from anywhere in the app."
        />
      ) : (
        <CardGrid>
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              id={playlist.id}
              title={playlist.title}
              description={playlist.description}
              coverUrl={playlist.coverUrl}
              trackIds={playlist.trackIds}
            />
          ))}
        </CardGrid>
      )}

      <LazyPlaylistFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSaved={(id) => router.push(`/playlists/${id}`)}
      />
    </div>
  );
}
