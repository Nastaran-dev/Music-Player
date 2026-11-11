"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListMusic, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { CollectionHeader } from "@/components/layout/collection-header";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCollectionButton } from "@/features/player/components/play-collection-button";
import { TrackList } from "@/features/music-library/components/track-list";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { getTrackById } from "@/services/catalog";
import { usePlaylistsStore } from "@/stores/playlists-store";
import { formatTotalDuration } from "@/utils/format-time";

import { AddSongsDialog } from "./add-songs-dialog";
import { LazyPlaylistFormDialog } from "./lazy-playlist-form-dialog";

export function UserPlaylistView({ id }: { id: string }) {
  const router = useRouter();
  const hydrated = usePersistHydrated(usePlaylistsStore);
  const playlist = usePlaylistsStore((s) => s.playlists.find((p) => p.id === id));
  const deletePlaylist = usePlaylistsStore((s) => s.deletePlaylist);
  const removeTrackAt = usePlaylistsStore((s) => s.removeTrackAt);
  const moveTrack = usePlaylistsStore((s) => s.moveTrack);

  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!hydrated) {
    return (
      <div aria-busy="true" className="flex flex-col gap-4">
        <Skeleton className="h-56 w-full rounded-xl" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!playlist) {
    return (
      <EmptyState
        icon={ListMusic}
        title="Playlist not found"
        description="It may have been deleted, or it was created in another browser."
        action={
          <Button asChild variant="outline">
            <Link href="/playlists">Back to playlists</Link>
          </Button>
        }
      />
    );
  }

  const totalSeconds = playlist.trackIds.reduce(
    (sum, trackId) => sum + (getTrackById(trackId)?.duration ?? 0),
    0,
  );

  const source = { type: "playlist", id } as const;

  return (
    <>
      <CollectionHeader
        kind="Playlist"
        title={playlist.title}
        description={playlist.description || undefined}
        coverUrl={playlist.coverUrl}
        meta={[
          `${playlist.trackIds.length} ${playlist.trackIds.length === 1 ? "song" : "songs"}`,
          formatTotalDuration(totalSeconds),
        ]}
        actions={
          <>
            <PlayCollectionButton trackIds={playlist.trackIds} label={playlist.title} source={source} />
            <PlayCollectionButton trackIds={playlist.trackIds} label={playlist.title} shuffle source={source} />
            <Button variant="outline" size="lg" onClick={() => setAddOpen(true)}>
              <Plus aria-hidden="true" /> Add songs
            </Button>
            <Button variant="ghost" size="lg" onClick={() => setEditOpen(true)}>
              <Pencil aria-hidden="true" /> Edit
            </Button>
            <Button variant="ghost" size="lg" onClick={() => setDeleteOpen(true)}>
              <Trash2 aria-hidden="true" /> Delete
            </Button>
          </>
        }
      />

      <TrackList
        trackIds={playlist.trackIds}
        source={source}
        onRemove={(position) => {
          removeTrackAt(id, position);
          toast.success("Removed from playlist");
        }}
        onMove={(from, to) => moveTrack(id, from, to)}
        emptyTitle="This playlist is empty"
        emptyDescription="Use “Add songs” or the track menu anywhere in the app."
      />

      <LazyPlaylistFormDialog open={editOpen} onOpenChange={setEditOpen} playlist={playlist} />
      <AddSongsDialog playlistId={id} open={addOpen} onOpenChange={setAddOpen} />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`Delete “${playlist.title}”?`}
        description="This removes the playlist from this browser. The songs themselves are not affected."
        confirmLabel="Delete playlist"
        destructive
        onConfirm={() => {
          deletePlaylist(id);
          toast.success("Playlist deleted");
          router.push("/playlists");
        }}
      />
    </>
  );
}
