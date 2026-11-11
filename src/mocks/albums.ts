// Generated mock data (fictional artists, albums and tracks). Safe to edit by hand.
import type { Album } from "@/types/music";

import { tracks } from "./tracks";

const rawAlbums: readonly Omit<Album, "trackIds" | "totalDuration">[] = [
  {
    id: "album-01",
    title: "Neon Afterglow",
    artistId: "artist-01",
    coverUrl: "/covers/albums/album-001.jpg",
    releaseYear: 2024,
    genre: "pop",
  },
  {
    id: "album-02",
    title: "Paper Lanterns",
    artistId: "artist-02",
    coverUrl: "/covers/albums/album-002.jpg",
    releaseYear: 2023,
    genre: "indie",
  },
  {
    id: "album-03",
    title: "Concrete Gardens",
    artistId: "artist-03",
    coverUrl: "/covers/albums/album-03.jpg",
    releaseYear: 2025,
    genre: "hip-hop",
  },
  {
    id: "album-04",
    title: "Loud Hearts, Quiet Rooms",
    artistId: "artist-04",
    coverUrl: "/covers/albums/album-04.jpg",
    releaseYear: 2022,
    genre: "rock",
  },
  {
    id: "album-05",
    title: "Blue Hour Sessions",
    artistId: "artist-05",
    coverUrl: "/covers/albums/album-05.jpg",
    releaseYear: 2021,
    genre: "jazz",
  },
  {
    id: "album-06",
    title: "Signal Drift",
    artistId: "artist-06",
    coverUrl: "/covers/albums/album-06.jpg",
    releaseYear: 2024,
    genre: "electronic",
  },
  {
    id: "album-07",
    title: "Honey & Smoke",
    artistId: "artist-07",
    coverUrl: "/covers/albums/album-07.jpg",
    releaseYear: 2023,
    genre: "rnb",
  },
  {
    id: "album-08",
    title: "Pulse Theory",
    artistId: "artist-08",
    coverUrl: "/covers/albums/album-08.jpg",
    releaseYear: 2025,
    genre: "electronic",
  },
  {
    id: "album-09",
    title: "Wildflower Letters",
    artistId: "artist-09",
    coverUrl: "/covers/albums/album-09.jpg",
    releaseYear: 2022,
    genre: "indie",
  },
  {
    id: "album-10",
    title: "Orbit Season",
    artistId: "artist-10",
    coverUrl: "/covers/albums/album-10.jpg",
    releaseYear: 2024,
    genre: "hip-hop",
  },
  {
    id: "album-11",
    title: "Tidelines",
    artistId: "artist-11",
    coverUrl: "/covers/albums/album-11.jpg",
    releaseYear: 2023,
    genre: "ambient",
  },
  {
    id: "album-12",
    title: "Sugar Static",
    artistId: "artist-12",
    coverUrl: "/covers/albums/album-12.jpg",
    releaseYear: 2025,
    genre: "pop",
  },
  {
    id: "album-13",
    title: "Highway Hymns",
    artistId: "artist-13",
    coverUrl: "/covers/albums/album-13.jpg",
    releaseYear: 2020,
    genre: "rock",
  },
  {
    id: "album-14",
    title: "Candlelit",
    artistId: "artist-14",
    coverUrl: "/covers/albums/album-14.jpg",
    releaseYear: 2022,
    genre: "jazz",
  },
  // {
  //   id: "album-15",
  //   title: "Skyline Protocol",
  //   artistId: "artist-15",
  //   coverUrl: "/covers/albums/album-15.jpg",
  //   releaseYear: 2026,
  //   genre: "electronic",
  // },
];

export const albums: readonly Album[] = rawAlbums.map((album) => {
  const albumTracks = tracks.filter((track) => track.albumId === album.id);
  return {
    ...album,
    trackIds: albumTracks.map((track) => track.id),
    totalDuration: albumTracks.reduce((sum, track) => sum + track.duration, 0),
  };
});
