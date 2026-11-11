"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { LazyPlaylistFormDialog } from "@/features/playlists/components/lazy-playlist-form-dialog";
import { cn } from "@/lib/utils";

import {
  navItemClasses,
  navLabelClasses,
  type NavLayout,
} from "./navigation-item";

export function CreatePlaylistItem({
  layout,
  onCreated,
}: {
  layout: NavLayout;
  onCreated?: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(navItemClasses(layout))}
      >
        <Plus className="size-5 shrink-0" aria-hidden="true" />
        <span className={navLabelClasses(layout)}>Create Playlist</span>
      </button>
      <LazyPlaylistFormDialog
        open={open}
        onOpenChange={setOpen}
        onSaved={(id) => {
          router.push(`/playlists/${id}`);
          onCreated?.();
        }}
      />
    </>
  );
}
