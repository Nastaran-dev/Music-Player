"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Disc3, Heart, LayoutGrid, List, ListMusic, UserRound } from "lucide-react";

import { CoverArt } from "@/components/shared/cover-art";
import { CardGrid, MediaCard } from "@/components/shared/media-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import {
  getAlbumById,
  getArtistById,
  getArtistTrackIds,
  getTrackById,
} from "@/services/catalog";
import { useFavoritesStore } from "@/stores/favorites-store";
import { usePlaylistsStore } from "@/stores/playlists-store";
import { useUiStore } from "@/stores/ui-store";
import type { LucideIcon } from "lucide-react";

import { TrackList } from "./track-list";

type TabId = "playlists" | "albums" | "artists" | "liked";
type SortId = "recent" | "name-asc" | "name-desc";

interface LibraryItem {
  id: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  href: string;
  trackIds: readonly string[];
  round?: boolean;
}

const SORT_LABELS: Record<SortId, string> = {
  recent: "Recently added",
  "name-asc": "Name (A–Z)",
  "name-desc": "Name (Z–A)",
};

function applyFilterAndSort<T>(
  items: readonly T[],
  getName: (item: T) => string,
  filter: string,
  sort: SortId,
): T[] {
  const needle = filter.trim().toLowerCase();
  const filtered = needle ? items.filter((item) => getName(item).toLowerCase().includes(needle)) : [...items];
  if (sort === "name-asc") filtered.sort((a, b) => getName(a).localeCompare(getName(b)));
  if (sort === "name-desc") filtered.sort((a, b) => getName(b).localeCompare(getName(a)));
  return filtered; 
}

function LibraryEmpty({ icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <EmptyState
      icon={icon}
      title={title}
      description={description}
      action={
        <Button asChild variant="outline">
          <Link href="/discover">Browse Discover</Link>
        </Button>
      }
    />
  );
}

function Collection({
  items,
  view,
  empty,
  noMatches,
}: {
  items: LibraryItem[];
  view: "grid" | "list";
  empty: boolean;
  noMatches: React.ReactNode;
}) {
  if (items.length === 0) return empty ? null : <p className="text-small text-muted-foreground">{noMatches}</p>;

  if (view === "grid") {
    return (
      <CardGrid>
        {items.map((item) => (
          <MediaCard key={item.id} {...item} />
        ))}
      </CardGrid>
    );
  }

  return (
    <ul className="flex flex-col">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <CoverArt
              src={item.coverUrl}
              sizes="48px"
              className={item.round ? "size-12 shrink-0 rounded-full" : "size-12 shrink-0 rounded-md"}
            />
            <span className="min-w-0">
              <span className="block truncate text-small font-medium">{item.title}</span>
              <span className="block truncate text-caption text-muted-foreground">{item.subtitle}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function LibraryView() {
  const favoritesReady = usePersistHydrated(useFavoritesStore);
  const playlistsReady = usePersistHydrated(usePlaylistsStore);
  const likedIds = useFavoritesStore((s) => s.likedTrackIds);
  const savedAlbumIds = useFavoritesStore((s) => s.savedAlbumIds);
  const followedIds = useFavoritesStore((s) => s.followedArtistIds);
  const playlists = usePlaylistsStore((s) => s.playlists);
  const view = useUiStore((s) => s.libraryView);
  const setView = useUiStore((s) => s.setLibraryView);

  const [tab, setTab] = useState<TabId>("playlists");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<SortId>("recent");

  const playlistItems = useMemo<LibraryItem[]>(
    () =>
      [...playlists]
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map((p) => ({
          id: p.id,
          title: p.title,
          subtitle: p.description || `${p.trackIds.length} songs`,
          coverUrl: p.coverUrl,
          href: `/playlists/${p.id}`,
          trackIds: p.trackIds,
        })),
    [playlists],
  );

  const albumItems = useMemo<LibraryItem[]>(
    () =>
      savedAlbumIds.flatMap((id) => {
        const album = getAlbumById(id);
        if (!album) return [];
        return [
          {
            id,
            title: album.title,
            subtitle: `${album.releaseYear} · ${getArtistById(album.artistId)?.name ?? ""}`,
            coverUrl: album.coverUrl,
            href: `/albums/${id}`,
            trackIds: album.trackIds,
          },
        ];
      }),
    [savedAlbumIds],
  );

  const artistItems = useMemo<LibraryItem[]>(
    () =>
      followedIds.flatMap((id) => {
        const artist = getArtistById(id);
        if (!artist) return [];
        return [
          {
            id,
            title: artist.name,
            subtitle: "Artist",
            coverUrl: artist.imageUrl,
            href: `/artists/${id}`,
            trackIds: getArtistTrackIds(id),
            round: true,
          },
        ];
      }),
    [followedIds],
  );

  if (!favoritesReady || !playlistsReady) {
    return (
      <div aria-busy="true" className="flex flex-col gap-4">
        <Skeleton className="h-10 w-80 rounded-full" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const shownPlaylists = applyFilterAndSort(playlistItems, (i) => i.title, filter, sort);
  const shownAlbums = applyFilterAndSort(albumItems, (i) => i.title, filter, sort);
  const shownArtists = applyFilterAndSort(artistItems, (i) => i.title, filter, sort);
  const shownLiked = applyFilterAndSort(likedIds, (id) => getTrackById(id)?.title ?? "", filter, sort);
  const noMatches = `Nothing matches “${filter.trim()}”.`;

  return (
    <Tabs value={tab} onValueChange={(value) => setTab(value as TabId)}>
      <TabsList aria-label="Library sections">
        <TabsTrigger value="playlists">Playlists ({playlistItems.length})</TabsTrigger>
        <TabsTrigger value="albums">Albums ({albumItems.length})</TabsTrigger>
        <TabsTrigger value="artists">Artists ({artistItems.length})</TabsTrigger>
        <TabsTrigger value="liked">Liked songs ({likedIds.length})</TabsTrigger>
      </TabsList>

      <h2 className="sr-only">Library items</h2>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="min-w-48 flex-1 sm:max-w-xs">
          <Input
            type="search"
            aria-label="Filter this section"
            placeholder="Filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            autoComplete="off"
          />
        </div>
        <label className="flex items-center gap-2 text-small text-muted-foreground">
          Sort
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortId)}
            className="h-10 rounded-full border border-input bg-surface-2 px-3 text-small text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {(Object.keys(SORT_LABELS) as SortId[]).map((id) => (
              <option key={id} value={id}>
                {SORT_LABELS[id]}
              </option>
            ))}
          </select>
        </label>
        {tab !== "liked" ? (
          <div role="group" aria-label="Layout" className="ml-auto flex items-center gap-1">
            <IconButton label="Grid view" size="sm" pressed={view === "grid"} variant={view === "grid" ? "secondary" : "ghost"} onClick={() => setView("grid")}>
              <LayoutGrid aria-hidden="true" />
            </IconButton>
            <IconButton label="List view" size="sm" pressed={view === "list"} variant={view === "list" ? "secondary" : "ghost"} onClick={() => setView("list")}>
              <List aria-hidden="true" />
            </IconButton>
          </div>
        ) : null}
      </div>

      <TabsContent value="playlists">
        {playlistItems.length === 0 ? (
          <EmptyState
            icon={ListMusic}
            title="No playlists yet"
            description="Create a playlist to see it here."
            action={
              <Button asChild variant="outline">
                <Link href="/playlists">Go to playlists</Link>
              </Button>
            }
          />
        ) : (
          <Collection items={shownPlaylists} view={view} empty={false} noMatches={noMatches} />
        )}
      </TabsContent>

      <TabsContent value="albums">
        {albumItems.length === 0 ? (
          <LibraryEmpty icon={Disc3} title="No saved albums" description="Save an album from its page and it will appear here." />
        ) : (
          <Collection items={shownAlbums} view={view} empty={false} noMatches={noMatches} />
        )}
      </TabsContent>

      <TabsContent value="artists">
        {artistItems.length === 0 ? (
          <LibraryEmpty icon={UserRound} title="You are not following anyone" description="Follow an artist from their page and they will appear here." />
        ) : (
          <Collection items={shownArtists} view={view} empty={false} noMatches={noMatches} />
        )}
      </TabsContent>

      <TabsContent value="liked">
        {likedIds.length === 0 ? (
          <LibraryEmpty icon={Heart} title="No liked songs yet" description="Tap the heart on any track to save it." />
        ) : shownLiked.length === 0 ? (
          <p className="text-small text-muted-foreground">{noMatches}</p>
        ) : (
          <TrackList trackIds={shownLiked} />
        )}
      </TabsContent>
    </Tabs>
  );
}
