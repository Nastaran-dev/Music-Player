"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Disc3,
  Ellipsis,
  Heart,
  ListEnd,
  ListPlus,
  ListStart,
  Trash2,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { IconButton } from "@/components/ui/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddToPlaylistDialog } from "@/features/playlists/components/add-to-playlist-dialog";
import { getTrackById } from "@/services/catalog";
import { useFavoritesStore } from "@/stores/favorites-store";
import { usePlayerStore } from "@/stores/player-store";

interface TrackMenuProps {
  trackId: string;
  position?: number;
  count?: number;
  onRemove?: () => void;
  onMove?: (to: number) => void;
}

export function TrackMenu({ trackId, position, count, onRemove, onMove }: TrackMenuProps) {
  const track = getTrackById(trackId);
  const [addOpen, setAddOpen] = useState(false);
  const [addMounted, setAddMounted] = useState(false);
  const liked = useFavoritesStore((s) => s.likedTrackIds.includes(trackId));
  const toggleLike = useFavoritesStore((s) => s.toggleLikeTrack);
  const addToQueue = usePlayerStore((s) => s.addToQueue);
  const playNext = usePlayerStore((s) => s.playNext);

  if (!track) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton label={`More options for ${track.title}`} size="sm" showTooltip={false}>
            <Ellipsis aria-hidden="true" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => {
              playNext(trackId);
              toast.success("Playing next");
            }}
          >
            <ListStart aria-hidden="true" /> Play next
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              addToQueue(trackId);
              toast.success("Added to queue");
            }}
          >
            <ListEnd aria-hidden="true" /> Add to queue
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setAddMounted(true);
              setAddOpen(true);
            }}
          >
            <ListPlus aria-hidden="true" /> Add to playlist
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => toggleLike(trackId)}>
            <Heart aria-hidden="true" /> {liked ? "Remove from liked songs" : "Add to liked songs"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/albums/${track.albumId}`}>
              <Disc3 aria-hidden="true" /> Go to album
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/artists/${track.artistId}`}>
              <UserRound aria-hidden="true" /> Go to artist
            </Link>
          </DropdownMenuItem>

          {onRemove || onMove ? <DropdownMenuSeparator /> : null}
          {onMove && position !== undefined && count !== undefined ? (
            <>
              <DropdownMenuItem disabled={position === 0} onSelect={() => onMove(position - 1)}>
                <ArrowUp aria-hidden="true" /> Move up
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={position >= count - 1}
                onSelect={() => onMove(position + 1)}
              >
                <ArrowDown aria-hidden="true" /> Move down
              </DropdownMenuItem>
            </>
          ) : null}
          {onRemove ? (
            <DropdownMenuItem onSelect={onRemove}>
              <Trash2 aria-hidden="true" /> Remove from this playlist
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      {addMounted ? (
        <AddToPlaylistDialog trackIds={[trackId]} open={addOpen} onOpenChange={setAddOpen} />
      ) : null}
    </>
  );
}
