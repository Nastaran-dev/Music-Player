import { MediaCard } from "@/components/shared/media-card";
import { getArtistTrackIds } from "@/services/catalog";
import type { Artist } from "@/types/music";

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <MediaCard
      href={`/artists/${artist.id}`}
      title={artist.name}
      subtitle="Artist"
      coverUrl={artist.imageUrl}
      trackIds={getArtistTrackIds(artist.id)}
      round
    />
  );
}
