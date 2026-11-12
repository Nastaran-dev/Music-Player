"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Keyboard, Search } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { useSearchHistoryStore } from "@/stores/search-history-store";
import { useUiStore } from "@/stores/ui-store";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const addRecent = useSearchHistoryStore((s) => s.add);
  const openShortcuts = useUiStore((s) => s.setShortcutsOpen);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    addRecent(trimmed);
    router.push(
      trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search",
    );
  }

  return (
    <header className="sticky top-0 z-(--z-sticky) flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl md:px-8">
      <Link
        href="/"
        aria-label="VYBE home"
        className="rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
      >
        <BrandLogo showWordmark={false} />
      </Link>

      <form
        role="search"
        onSubmit={handleSubmit}
        className={cn(
          "relative max-w-md flex-1",

          pathname === "/search" && "hidden md:block",
        )}
      >
        <label htmlFor="global-search" className="sr-only">
          Search songs, artists, albums and playlists
        </label>
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="global-search"
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search songs, artists, albums"
          autoComplete="off"
          enterKeyHint="search"
          className="pl-10"
        />
      </form>

      <div className="ml-auto hidden items-center gap-2 md:flex">
        <IconButton
          label="Keyboard shortcuts"
          onClick={() => openShortcuts(true)}
        >
          <Keyboard aria-hidden="true" />
        </IconButton>
        <ThemeToggle />
      </div>
    </header>
  );
}
