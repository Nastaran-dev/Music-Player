import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { safeLocalStorage } from "@/lib/safe-storage";

const MAX_ITEMS = 8;

interface SearchHistoryState {

  recent: string[];
  add: (query: string) => void;
  remove: (query: string) => void;
  clear: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      recent: [],
      add: (query) => {
        const value = query.trim();
        if (!value) return;
        set((s) => ({
          recent: [
            value,
            ...s.recent.filter((item) => item.toLowerCase() !== value.toLowerCase()),
          ].slice(0, MAX_ITEMS),
        }));
      },
      remove: (query) => set((s) => ({ recent: s.recent.filter((item) => item !== query) })),
      clear: () => set({ recent: [] }),
    }),
    { name: "vybe:search-history",
      storage: createJSONStorage(() => safeLocalStorage), skipHydration: true },
  ),
);
