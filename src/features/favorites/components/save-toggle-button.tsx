"use client";

import { Heart, UserCheck, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/stores/favorites-store";

export function SaveAlbumButton({ albumId, title }: { albumId: string; title: string }) {
  const saved = useFavoritesStore((s) => s.savedAlbumIds.includes(albumId));
  const toggle = useFavoritesStore((s) => s.toggleSaveAlbum);

  return (
    <Button
      variant="outline"
      size="lg"
      aria-pressed={saved}
      onClick={() => toggle(albumId)}
    >
      <Heart className={saved ? "fill-current text-accent" : undefined} aria-hidden="true" />
      {saved ? "Saved" : "Save"}
      <span className="sr-only"> {title}</span>
    </Button>
  );
}

export function FollowArtistButton({ artistId, name }: { artistId: string; name: string }) {
  const following = useFavoritesStore((s) => s.followedArtistIds.includes(artistId));
  const toggle = useFavoritesStore((s) => s.toggleFollowArtist);

  return (
    <Button
      variant="outline"
      size="lg"
      aria-pressed={following}
      onClick={() => toggle(artistId)}
    >
      {following ? <UserCheck aria-hidden="true" /> : <UserPlus aria-hidden="true" />}
      {following ? "Following" : "Follow"}
      <span className="sr-only"> {name}</span>
    </Button>
  );
}
