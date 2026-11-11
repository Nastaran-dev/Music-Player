export type GenreId =
  | "pop"
  | "electronic"
  | "hip-hop"
  | "rock"
  | "jazz"
  | "indie"
  | "rnb"
  | "ambient";

export interface Genre {
  id: GenreId;
  name: string;
  description: string;
  image: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  biography: string;
  monthlyListeners: number;
  genres: readonly GenreId[];
}

export interface Track {
  id: string;
  title: string;
  artistId: string;
  albumId: string;

  duration: number;
  coverUrl: string;

  audioUrl: string | null;
  genre: GenreId;
  releaseDate: string;
  popularity: number;
  isExplicit: boolean;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  genre: GenreId;
  trackIds: readonly string[];

  totalDuration: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  trackIds: readonly string[];
  createdAt: string;
  updatedAt: string;
}

export interface LyricLine {
  time: number | null;
  text: string;
}

export interface Lyrics {
  trackId: string;
  lines: LyricLine[];
}
