"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock3 } from "lucide-react";

import { ContentSection } from "@/components/layout/content-section";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { CoverArt } from "@/components/shared/cover-art";
import { CardGrid } from "@/components/shared/media-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { AlbumCard } from "@/features/albums/album-card";
import { TrackList } from "@/features/music-library/components/track-list";
import { PlaylistCard } from "@/features/playlists/components/playlist-card";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { getAlbumById, getPlaylistById, getTrackListItem } from "@/services/catalog";
import { usePlayerStore } from "@/stores/player-store";
import { usePlaylistsStore } from "@/stores/playlists-store";
import { getRecentTrackIds, useRecentStore } from "@/stores/recent-store";
import { formatPlayedAt } from "@/utils/format-time";

const HISTORY_SHOWN = 20;

export function RecentlyPlayedView() {
  const recentReady = usePersistHydrated(useRecentStore);
  const playlistsReady = usePersistHydrated(usePlaylistsStore);
  const history = useRecentStore((s) => s.history);
  const contexts = useRecentStore((s) => s.contexts);
  const clearHistory = useRecentStore((s) => s.clearHistory);
  const userPlaylists = usePlaylistsStore((s) => s.playlists);
  const playQueue = usePlayerStore((s) => s.playQueue);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!recentReady || !playlistsReady) {
    return (
      <div aria-busy="true" className="flex flex-col gap-3">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (history.length === 0 && contexts.length === 0) {
    return (
      <EmptyState
        icon={Clock3}
        title="Nothing played yet"
        description="Songs, albums and playlists you listen to will show up here."
        action={
          <Button asChild variant="outline">
            <Link href="/discover">Find something to play</Link>
          </Button>
        }
      />
    );
  }

  const trackIds = getRecentTrackIds(history, 20);
  const albums = contexts.flatMap((c) => {
    const album = c.type === "album" ? getAlbumById(c.id) : undefined;
    return album ? [album] : [];
  });
  const playlists = contexts.flatMap((c) => {
    if (c.type !== "playlist") return [];
    const catalog = getPlaylistById(c.id);
    if (catalog) return [catalog];
    const own = userPlaylists.find((p) => p.id === c.id);
    return own ? [own] : [];
  });

  return (
    <>
      <div className="flex justify-end pb-4">
        <Button variant="ghost" onClick={() => setConfirmOpen(true)}>
          Clear history
        </Button>
      </div>

      <ContentSection id="recent-tracks" title="Recently played songs">
        <TrackList trackIds={trackIds} />
      </ContentSection>

      {albums.length > 0 ? (
        <ContentSection id="recent-albums" title="Albums">
          <CardGrid>
            {albums.slice(0, 6).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </CardGrid>
        </ContentSection>
      ) : null}

      {playlists.length > 0 ? (
        <ContentSection id="recent-playlists" title="Playlists">
          <CardGrid>
            {playlists.slice(0, 6).map((p) => (
              <PlaylistCard key={p.id} id={p.id} title={p.title} description={p.description} coverUrl={p.coverUrl} trackIds={p.trackIds} />
            ))}
          </CardGrid>
        </ContentSection>
      ) : null}

      <ContentSection id="history" title="Playback history">
        <ol className="flex flex-col">
          {history.slice(0, HISTORY_SHOWN).map((entry, index) => {
            const item = getTrackListItem(entry.trackId);
            if (!item) return null;
            return (
              <li key={`${entry.trackId}-${entry.playedAt}-${index}`}>
                <button
                  type="button"
                  onClick={() => playQueue([entry.trackId])}
                  aria-label={`Play ${item.title} by ${item.artistName} again`}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <CoverArt src={item.coverUrl} sizes="40px" className="size-10 shrink-0 rounded-md" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-small font-medium">{item.title}</span>
                    <span className="block truncate text-caption text-muted-foreground">{item.artistName}</span>
                  </span>
                  <time dateTime={entry.playedAt} className="text-caption text-muted-foreground">
                    {formatPlayedAt(entry.playedAt)}
                  </time>
                </button>
              </li>
            );
          })}
        </ol>
      </ContentSection>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Clear playback history?"
        description="This removes your recently played songs, albums and playlists from this browser."
        confirmLabel="Clear history"
        destructive
        onConfirm={clearHistory}
      />
    </>
  );
}
