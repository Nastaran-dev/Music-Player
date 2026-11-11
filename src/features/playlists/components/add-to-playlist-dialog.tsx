"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";

import { CoverArt } from "@/components/shared/cover-art";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePlaylistsStore } from "@/stores/playlists-store";

import { LazyPlaylistFormDialog } from "./lazy-playlist-form-dialog";

interface AddToPlaylistDialogProps {
  trackIds: readonly string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddToPlaylistDialog({ trackIds, open, onOpenChange }: AddToPlaylistDialogProps) {
  const playlists = usePlaylistsStore((s) => s.playlists);
  const addTracks = usePlaylistsStore((s) => s.addTracks);
  const [createOpen, setCreateOpen] = useState(false);

  const add = (playlistId: string, title: string) => {
    const added = addTracks(playlistId, trackIds);
    toast[added > 0 ? "success" : "info"](
      added > 0 ? `Added to “${title}”` : `Already in “${title}”`,
    );
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to playlist</DialogTitle>
            <DialogDescription>Choose one of your playlists.</DialogDescription>
          </DialogHeader>

          <Button variant="outline" onClick={() => setCreateOpen(true)}>
            <Plus aria-hidden="true" /> New playlist
          </Button>

          {playlists.length > 0 ? (
            <ul className="grid max-h-72 gap-1 overflow-y-auto">
              {playlists.map((playlist) => {
                const alreadyIn = trackIds.every((id) => playlist.trackIds.includes(id));
                return (
                  <li key={playlist.id}>
                    <button
                      type="button"
                      onClick={() => add(playlist.id, playlist.title)}
                      className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <CoverArt src={playlist.coverUrl} sizes="40px" className="size-10 shrink-0 rounded-md" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-small font-medium">{playlist.title}</span>
                        <span className="block text-caption text-muted-foreground">
                          {playlist.trackIds.length} songs
                        </span>
                      </span>
                      {alreadyIn ? (
                        <span className="flex items-center gap-1 text-caption text-muted-foreground">
                          <Check className="size-4" aria-hidden="true" /> Added
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-small text-muted-foreground">
              You have no playlists yet. Create one to get started.
            </p>
          )}
        </DialogContent>
      </Dialog>

      <LazyPlaylistFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSaved={(id) => {
          const title = usePlaylistsStore.getState().playlists.find((p) => p.id === id)?.title ?? "playlist";
          add(id, title);
        }}
      />
    </>
  );
}
