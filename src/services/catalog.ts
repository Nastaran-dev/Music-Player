import { albums } from "@/mocks/albums";
import { artists } from "@/mocks/artists";
import { genres } from "@/mocks/genres";
import { playlists } from "@/mocks/playlists";
import { tracks } from "@/mocks/tracks";
import type { Album, Artist, Genre, Playlist, Track } from "@/types/music";


const trackMap = new Map(tracks.map((track) => [track.id, track]));
const artistMap = new Map(artists.map((artist) => [artist.id, artist]));
const albumMap = new Map(albums.map((album) => [album.id, album]));
const playlistMap = new Map(playlists.map((playlist) => [playlist.id, playlist]));

export const getTrackById = (id: string): Track | undefined => trackMap.get(id);
export const getArtistById = (id: string): Artist | undefined => artistMap.get(id);
export const getAlbumById = (id: string): Album | undefined => albumMap.get(id);
export const getPlaylistById = (id: string): Playlist | undefined =>
  playlistMap.get(id);

export const getAllTracks = (): readonly Track[] => tracks;
export const getAllArtists = (): readonly Artist[] => artists;
export const getAllAlbums = (): readonly Album[] => albums;
export const getAllPlaylists = (): readonly Playlist[] => playlists;
export const getAllGenres = (): readonly Genre[] => genres;

export const getAllTrackIds = (): string[] => tracks.map((track) => track.id);

export function getTrendingTrackIds(limit = 10): string[] {
  return [...tracks]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
    .map((track) => track.id);
}

export interface TrackListItem {
  id: string;
  title: string;
  artistName: string;
  albumTitle: string;
  coverUrl: string;
  duration: number;
  isExplicit: boolean;
  isAvailable: boolean;
}

export function getTrackListItem(id: string): TrackListItem | undefined {
  const track = trackMap.get(id);
  if (!track) return undefined;

  return {
    id: track.id,
    title: track.title,
    artistName: artistMap.get(track.artistId)?.name ?? "Unknown artist",
    albumTitle: albumMap.get(track.albumId)?.title ?? "Unknown album",
    coverUrl: track.coverUrl,
    duration: track.duration,
    isExplicit: track.isExplicit,
    isAvailable: track.audioUrl !== null,
  };
}

export const getGenreById = (id: string): Genre | undefined =>
  genres.find((genre) => genre.id === id);

export function getArtistTrackIds(artistId: string): string[] {
  return tracks
    .filter((track) => track.artistId === artistId)
    .sort((a, b) => b.popularity - a.popularity)
    .map((track) => track.id);
}

export function getArtistAlbums(artistId: string): Album[] {
  return albums.filter((album) => album.artistId === artistId);
}


export function getRelatedArtists(artistId: string, limit = 6): Artist[] {
  const artist = artistMap.get(artistId);
  if (!artist) return [];
  return artists
    .filter((other) => other.id !== artistId)
    .map((other) => ({
      other,
      shared: other.genres.filter((genre) => artist.genres.includes(genre)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.other.monthlyListeners - a.other.monthlyListeners)
    .slice(0, limit)
    .map((entry) => entry.other);
}

export const getPopularArtists = (limit = 6): Artist[] =>
  [...artists].sort((a, b) => b.monthlyListeners - a.monthlyListeners).slice(0, limit);

export const getNewReleases = (limit = 6): Album[] =>
  [...albums].sort((a, b) => b.releaseYear - a.releaseYear).slice(0, limit);
