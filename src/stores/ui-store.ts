import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { safeLocalStorage } from "@/lib/safe-storage";

export type LibraryView = "grid" | "list";

interface UiState {
  sidebarCollapsed: boolean;
  libraryView: LibraryView;
  
  queueOpen: boolean;
  expandedPlayerOpen: boolean;
  shortcutsOpen: boolean;
  toggleSidebar: () => void;
  setLibraryView: (view: LibraryView) => void;
  setQueueOpen: (open: boolean) => void;
  toggleQueue: () => void;
  setExpandedPlayerOpen: (open: boolean) => void;
  setShortcutsOpen: (open: boolean) => void;
}


export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      libraryView: "grid",
      queueOpen: false,
      expandedPlayerOpen: false,
      shortcutsOpen: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setLibraryView: (libraryView) => set({ libraryView }),
      setQueueOpen: (queueOpen) => set({ queueOpen }),
      toggleQueue: () => set((state) => ({ queueOpen: !state.queueOpen })),
      setExpandedPlayerOpen: (expandedPlayerOpen) => set({ expandedPlayerOpen }),
      setShortcutsOpen: (shortcutsOpen) => set({ shortcutsOpen }),
    }),
    {
      name: "vybe:ui",
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        libraryView: state.libraryView,
      }),
      skipHydration: true,
    },
  ),
);
