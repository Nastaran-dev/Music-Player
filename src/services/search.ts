import type { Album, Artist, GenreId, Playlist, Track } from "@/types/music";

import {
  getAlbumById,
  getAllAlbums,
  getAllArtists,
  getAllPlaylists,
  getAllTracks,
  getArtistById,
} from "./catalog";

export interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
}

export const EMPTY_RESULTS: SearchResults = {
  tracks: [],
  artists: [],
  albums: [],
  playlists: [],
};

const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

function scoreText(text: string, tokens: readonly string[]): number {
  const haystack = normalize(text);
  let score = 0;
  for (const token of tokens) {
    const index = haystack.indexOf(token);
    if (index === -1) return 0;
    score += index === 0 ? 3 : haystack[index - 1] === " " ? 2 : 1;
  }
  return score;
}

function rank<T>(
  items: readonly T[],
  tokens: readonly string[],
  primary: (item: T) => string,
  secondary: (item: T) => string,
  limit: number,
): T[] {
  return items
    .map((item) => {
      const title = scoreText(primary(item), tokens);
      const score = title > 0 ? title * 3 : scoreText(`${primary(item)} ${secondary(item)}`, tokens);
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

const artistName = (id: string) => getArtistById(id)?.name ?? "";
const albumTitle = (id: string) => getAlbumById(id)?.title ?? "";

export function searchCatalog(query: string, limit = 20): SearchResults {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return EMPTY_RESULTS;

  return {
    tracks: rank(
      getAllTracks(),
      tokens,
      (t) => t.title,
      (t) => `${artistName(t.artistId)} ${albumTitle(t.albumId)}`,
      limit,
    ),
    artists: rank(getAllArtists(), tokens, (a) => a.name, (a) => a.genres.join(" "), limit),
    albums: rank(getAllAlbums(), tokens, (a) => a.title, (a) => artistName(a.artistId), limit),
    playlists: rank(getAllPlaylists(), tokens, (p) => p.title, (p) => p.description, limit),
  };
}

export function searchSuggestions(query: string, max = 5): string[] {
  const results = searchCatalog(query, 4);
  const names = [
    ...results.artists.map((a) => a.name),
    ...results.tracks.map((t) => t.title),
    ...results.albums.map((a) => a.title),
    ...results.playlists.map((p) => p.title),
  ];
  return [...new Set(names)].slice(0, max);
}

export function getGenreResults(genre: GenreId): SearchResults {
  return {
    tracks: getAllTracks().filter((t) => t.genre === genre),
    artists: getAllArtists().filter((a) => a.genres.includes(genre)),
    albums: getAllAlbums().filter((a) => a.genre === genre),
    playlists: [],
  };
}
