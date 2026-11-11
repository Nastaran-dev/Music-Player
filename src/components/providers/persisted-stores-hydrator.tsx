"use client";

import { useEffect } from "react";

import { useFavoritesStore } from "@/stores/favorites-store";
import { useRecentStore } from "@/stores/recent-store";
import { usePlaylistsStore } from "@/stores/playlists-store";
import { useSearchHistoryStore } from "@/stores/search-history-store";


export function PersistedStoresHydrator() {
  useEffect(() => {
    void useFavoritesStore.persist.rehydrate();
    void usePlaylistsStore.persist.rehydrate();
    void useSearchHistoryStore.persist.rehydrate();
    void useRecentStore.persist.rehydrate();
  }, []);

  return null;
}
