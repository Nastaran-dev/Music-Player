import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { safeLocalStorage } from "@/lib/safe-storage";

import { PLAYLIST_COVER_OPTIONS } from "@/constants/playlists";
import { moveItem, removeAt } from "@/features/player/queue";

export interface UserPlaylist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  trackIds: string[];
  createdAt: string;
  updatedAt: string;
}

interface CreatePlaylistInput {
  title: string;
  description?: string;
  coverUrl?: string;
}

interface PlaylistsState {
  playlists: UserPlaylist[];
  createPlaylist: (input: CreatePlaylistInput) => string;
  updatePlaylist: (
    id: string,
    patch: Partial<Pick<UserPlaylist, "title" | "description" | "coverUrl">>,
  ) => void;
  deletePlaylist: (id: string) => void;
  addTracks: (id: string, trackIds: readonly string[]) => number;
  removeTrackAt: (id: string, index: number) => void;
  moveTrack: (id: string, from: number, to: number) => void;
}

const createId = () =>
  `my-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const touch = (playlist: UserPlaylist, patch: Partial<UserPlaylist>): UserPlaylist => ({
  ...playlist,
  ...patch,
  updatedAt: new Date().toISOString(),
});

export const usePlaylistsStore = create<PlaylistsState>()(
  persist(
    (set, get) => {
      const mutate = (id: string, fn: (playlist: UserPlaylist) => UserPlaylist) =>
        set((s) => ({
          playlists: s.playlists.map((p) => (p.id === id ? fn(p) : p)),
        }));

      return {
        playlists: [],

        createPlaylist: ({ title, description = "", coverUrl }) => {
          const id = createId();
          const now = new Date().toISOString();
          const fallbackCover =
            PLAYLIST_COVER_OPTIONS[get().playlists.length % PLAYLIST_COVER_OPTIONS.length] ??
            "";
          set((s) => ({
            playlists: [
              {
                id,
                title: title.trim(),
                description: description.trim(),
                coverUrl: coverUrl ?? fallbackCover,
                trackIds: [],
                createdAt: now,
                updatedAt: now,
              },
              ...s.playlists,
            ],
          }));
          return id;
        },

        updatePlaylist: (id, patch) => mutate(id, (p) => touch(p, patch)),

        deletePlaylist: (id) =>
          set((s) => ({ playlists: s.playlists.filter((p) => p.id !== id) })),

        addTracks: (id, trackIds) => {
          const playlist = get().playlists.find((p) => p.id === id);
          if (!playlist) return 0;
          const fresh = trackIds.filter(
            (trackId, i) =>
              !playlist.trackIds.includes(trackId) && trackIds.indexOf(trackId) === i,
          );
          if (fresh.length > 0) {
            mutate(id, (p) => touch(p, { trackIds: [...p.trackIds, ...fresh] }));
          }
          return fresh.length;
        },

        removeTrackAt: (id, index) =>
          mutate(id, (p) => touch(p, { trackIds: removeAt(p.trackIds, index) })),

        moveTrack: (id, from, to) =>
          mutate(id, (p) => touch(p, { trackIds: moveItem(p.trackIds, from, to) })),
      };
    },
    { name: "vybe:playlists",
      storage: createJSONStorage(() => safeLocalStorage), skipHydration: true },
  ),
);
