"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { QueueDock } from "@/features/queue/components/queue-dock";
import { KeyboardShortcuts } from "@/features/player/components/keyboard-shortcuts";
import { LazyExpandedPlayer } from "@/features/player/components/lazy-expanded-player";
import { GlobalPlayer } from "@/features/player/components/global-player";
import { useUiStore } from "@/stores/ui-store";

import { Header } from "./header";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

/**
 * Application frame:
 *
 *   ┌─────────┬──────────────────────┐
 *   │ Sidebar │ Header (sticky)      │
 *   │         │ Main (scrolls)       │
 *   ├─────────┴──────────────────────┤
 *   │ Global player  (+ mobile tabs) │
 *   └────────────────────────────────┘
 *
 * The page scroll happens inside the main column, so the player never
 * overlaps content and no bottom padding hacks are needed.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore persisted UI preferences after hydration (see ui-store).
  useEffect(() => {
    void useUiStore.persist.rehydrate();
  }, []);

  // The scroll container is not the window, so reset it on navigation.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    // `fixed inset-0` pins the whole app frame to the screen: the window itself never
    // scrolls, so the sidebar, header and player cannot move. Only <main>'s column scrolls.
    <div className="fixed inset-0 grid grid-rows-[minmax(0,1fr)_auto] overflow-hidden bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-(--z-toast) focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="flex min-h-0">
        <Sidebar />
        <div
          ref={scrollRef}
          className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain bg-ambient"
        >
          <Header />
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto w-full max-w-screen-2xl px-4 py-6 outline-none md:px-8 md:py-8"
          >
            {children}
          </main>
        </div>
        <QueueDock />
      </div>

      <div>
        <GlobalPlayer />
        <MobileNav />
      </div>
      <LazyExpandedPlayer />
      <KeyboardShortcuts />
    </div>
  );
}