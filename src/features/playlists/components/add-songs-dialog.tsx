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
import { Input } from "@/components/ui/input";
import { getTrackListItem, getTrendingTrackIds } from "@/services/catalog";
import { searchCatalog } from "@/services/search";
import { usePlaylistsStore } from "@/stores/playlists-store";

interface AddSongsDialogProps {
  playlistId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSongsDialog({ playlistId, open, onOpenChange }: AddSongsDialogProps) {
  const [query, setQuery] = useState("");
  const playlist = usePlaylistsStore((s) => s.playlists.find((p) => p.id === playlistId));
  const addTracks = usePlaylistsStore((s) => s.addTracks);

  const ids = query.trim()
    ? searchCatalog(query, 12).tracks.map((track) => track.id)
    : getTrendingTrackIds(8);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add songs</DialogTitle>
          <DialogDescription>
            {query.trim() ? "Search results" : "Suggested songs. Search to find more."}
          </DialogDescription>
        </DialogHeader>

        <Input
          type="search"
          aria-label="Search songs to add"
          placeholder="Search songs or artists"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />

        {ids.length === 0 ? (
          <p className="text-small text-muted-foreground">No songs match “{query.trim()}”.</p>
        ) : (
          <ul className="grid max-h-72 gap-1 overflow-y-auto">
            {ids.map((trackId) => {
              const item = getTrackListItem(trackId);
              if (!item) return null;
              const added = playlist?.trackIds.includes(trackId) ?? false;
              return (
                <li key={trackId} className="flex items-center gap-3 rounded-lg p-1.5">
                  <CoverArt src={item.coverUrl} sizes="40px" className="size-10 shrink-0 rounded-md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-small font-medium">{item.title}</p>
                    <p className="truncate text-caption text-muted-foreground">{item.artistName}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={added}
                    onClick={() => {
                      addTracks(playlistId, [trackId]);
                      toast.success(`Added “${item.title}”`);
                    }}
                  >
                    {added ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
                    {added ? "Added" : "Add"}
                    <span className="sr-only"> {item.title}</span>
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
