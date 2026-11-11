"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Clock3, Search, SearchX, X } from "lucide-react";

import { ContentSection } from "@/components/layout/content-section";
import { CardGrid } from "@/components/shared/media-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlbumCard } from "@/features/albums/album-card";
import { ArtistCard } from "@/features/artists/artist-card";
import { TrackList } from "@/features/music-library/components/track-list";
import { PlaylistCard } from "@/features/playlists/components/playlist-card";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { getAllGenres, getGenreById } from "@/services/catalog";
import { getGenreResults, searchCatalog, searchSuggestions, type SearchResults } from "@/services/search";
import { useSearchHistoryStore } from "@/stores/search-history-store";
import type { GenreId } from "@/types/music";

import { GenreCard } from "./genre-card";

interface SearchViewProps {
  initialQuery: string;
  initialGenre?: GenreId;
}

const DEBOUNCE_MS = 200;

function ResultSections({ results, show }: { results: SearchResults; show: "all" | "tracks" | "artists" | "albums" | "playlists" }) {
  const trackIds = results.tracks.map((t) => t.id);
  const visible = (kind: typeof show) => show === "all" || show === kind;

  return (
    <>
      {visible("tracks") && trackIds.length > 0 ? (
        <ContentSection id={`res-tracks-${show}`} title="Songs">
          <TrackList trackIds={show === "all" ? trackIds.slice(0, 5) : trackIds} />
        </ContentSection>
      ) : null}
      {visible("artists") && results.artists.length > 0 ? (
        <ContentSection id={`res-artists-${show}`} title="Artists">
          <CardGrid>
            {(show === "all" ? results.artists.slice(0, 6) : results.artists).map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </CardGrid>
        </ContentSection>
      ) : null}
      {visible("albums") && results.albums.length > 0 ? (
        <ContentSection id={`res-albums-${show}`} title="Albums">
          <CardGrid>
            {(show === "all" ? results.albums.slice(0, 6) : results.albums).map((a) => (
              <AlbumCard key={a.id} album={a} />
            ))}
          </CardGrid>
        </ContentSection>
      ) : null}
      {visible("playlists") && results.playlists.length > 0 ? (
        <ContentSection id={`res-playlists-${show}`} title="Playlists">
          <CardGrid>
            {(show === "all" ? results.playlists.slice(0, 6) : results.playlists).map((p) => (
              <PlaylistCard key={p.id} id={p.id} title={p.title} description={p.description} coverUrl={p.coverUrl} trackIds={p.trackIds} />
            ))}
          </CardGrid>
        </ContentSection>
      ) : null}
    </>
  );
}

export function SearchView({ initialQuery, initialGenre }: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [debounced, setDebounced] = useState(initialQuery);
  const historyReady = usePersistHydrated(useSearchHistoryStore);
  const recent = useSearchHistoryStore((s) => s.recent);
  const addRecent = useSearchHistoryStore((s) => s.add);
  const removeRecent = useSearchHistoryStore((s) => s.remove);
  const clearRecent = useSearchHistoryStore((s) => s.clear);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const trimmed = query.trim();
  const pending = trimmed !== debounced.trim();
  const results = useMemo(() => searchCatalog(debounced), [debounced]);
  const suggestions = trimmed ? searchSuggestions(trimmed) : [];
  const genre = initialGenre ? getGenreById(initialGenre) : undefined;
  const genreResults = useMemo(() => (initialGenre ? getGenreResults(initialGenre) : null), [initialGenre]);

  const total = results.tracks.length + results.artists.length + results.albums.length + results.playlists.length;

  const choose = (value: string) => {
    setQuery(value);
    setDebounced(value);
    addRecent(value);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDebounced(query);
    addRecent(query);
  };

  return (
    <div className="flex flex-col gap-6">
      <form role="search" onSubmit={submit} className="group/search relative max-w-xl">
        <label htmlFor="search-page-input" className="sr-only">
          Search songs, artists, albums and playlists
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          id="search-page-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What do you want to listen to?"
          autoComplete="off"
          enterKeyHint="search"
          className="h-12 pl-11"
        />
        {suggestions.length > 0 && !(suggestions.length === 1 && suggestions[0]?.toLowerCase() === trimmed.toLowerCase()) ? (
          <ul
            aria-label="Suggestions"
            className="absolute inset-x-0 top-full z-(--z-sticky) mt-2 hidden overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-elevation-2 group-focus-within/search:block"
          >
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  onClick={() => choose(suggestion)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-small hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </form>

      {trimmed ? (
        pending ? (
          <div aria-busy="true" aria-label="Searching" className="flex flex-col gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-md" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : total === 0 ? (
          <EmptyState
            icon={SearchX}
            title={`No results for “${trimmed}”`}
            description="Check the spelling or try a different artist, album or song."
            action={
              <Button variant="outline" onClick={() => choose("")}>
                Clear search
              </Button>
            }
          />
        ) : (
          <Tabs defaultValue="all">
            <TabsList aria-label="Result types">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tracks">Songs ({results.tracks.length})</TabsTrigger>
              <TabsTrigger value="artists">Artists ({results.artists.length})</TabsTrigger>
              <TabsTrigger value="albums">Albums ({results.albums.length})</TabsTrigger>
              <TabsTrigger value="playlists">Playlists ({results.playlists.length})</TabsTrigger>
            </TabsList>
            {(["all", "tracks", "artists", "albums", "playlists"] as const).map((kind) => (
              <TabsContent key={kind} value={kind}>
                <ResultSections results={results} show={kind} />
              </TabsContent>
            ))}
          </Tabs>
        )
      ) : genre && genreResults ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Badge variant="primary">Genre: {genre.name}</Badge>
            <Link href="/search" className="rounded-sm text-small text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              Clear genre
            </Link>
          </div>
          <ResultSections results={genreResults} show="all" />
        </div>
      ) : (
        <>
          {historyReady && recent.length > 0 ? (
            <ContentSection id="recent-searches" title="Recent searches">
              <ul className="flex flex-wrap gap-2">
                {recent.map((item) => (
                  <li key={item} className="flex items-center rounded-full bg-surface-2 pl-3">
                    <button
                      type="button"
                      onClick={() => choose(item)}
                      className="flex items-center gap-2 rounded-full py-1.5 pr-2 text-small focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <Clock3 className="size-4 text-muted-foreground" aria-hidden="true" />
                      {item}
                    </button>
                    <IconButton label={`Remove ${item} from recent searches`} size="sm" showTooltip={false} onClick={() => removeRecent(item)}>
                      <X aria-hidden="true" />
                    </IconButton>
                  </li>
                ))}
                <li>
                  <Button size="sm" variant="ghost" onClick={clearRecent}>
                    Clear all
                  </Button>
                </li>
              </ul>
            </ContentSection>
          ) : null}
          <ContentSection id="browse-genres" title="Browse genres">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {getAllGenres().map((g) => (
                <GenreCard key={g.id} genre={g} />
              ))}
            </div>
          </ContentSection>
        </>
      )}
    </div>
  );
}
