"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CoverArt } from "@/components/shared/cover-art";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { cn } from "@/lib/utils";
import { usePlaylistsStore } from "@/stores/playlists-store";

export function SidebarPlaylists() {
  const pathname = usePathname();
  const hydrated = usePersistHydrated(usePlaylistsStore);
  const playlists = usePlaylistsStore((s) => s.playlists);

  if (!hydrated) return null;

  return (
    <div className="hidden px-1 py-2 lg:block">
      <p className="px-2 pb-1 text-caption font-semibold text-muted-foreground">Your playlists</p>
      {playlists.length === 0 ? (
        <p className="px-2 text-caption text-muted-foreground">
          Playlists you create will show up here.
        </p>
      ) : (
        <ul className="flex flex-col gap-0.5">
          {playlists.map((playlist) => {
            const href = `/playlists/${playlist.id}`;
            return (
              <li key={playlist.id}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg p-1.5 text-small text-muted-foreground hover:bg-foreground/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    pathname === href && "bg-foreground/10 text-foreground",
                  )}
                >
                  <CoverArt src={playlist.coverUrl} sizes="32px" className="size-8 shrink-0 rounded-md" />
                  <span className="truncate">{playlist.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
