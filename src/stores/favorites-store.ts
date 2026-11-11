import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { safeLocalStorage } from "@/lib/safe-storage";

interface FavoritesState {
  likedTrackIds: string[];
  savedAlbumIds: string[];
  followedArtistIds: string[];
  toggleLikeTrack: (trackId: string) => void;
  toggleSaveAlbum: (albumId: string) => void;
  toggleFollowArtist: (artistId: string) => void;
}

const toggle = (list: string[], id: string): string[] =>
  list.includes(id) ? list.filter((item) => item !== id) : [id, ...list];

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      likedTrackIds: [],
      savedAlbumIds: [],
      followedArtistIds: [],
      toggleLikeTrack: (id) =>
        set((s) => ({ likedTrackIds: toggle(s.likedTrackIds, id) })),
      toggleSaveAlbum: (id) =>
        set((s) => ({ savedAlbumIds: toggle(s.savedAlbumIds, id) })),
      toggleFollowArtist: (id) =>
        set((s) => ({ followedArtistIds: toggle(s.followedArtistIds, id) })),
    }),
    { name: "vybe:favorites",
      storage: createJSONStorage(() => safeLocalStorage), skipHydration: true },
  ),
);
