import { MediaCard } from "@/components/shared/media-card";
import { getArtistById } from "@/services/catalog";
import type { Album } from "@/types/music";

export function AlbumCard({ album }: { album: Album }) {
  const artist = getArtistById(album.artistId)?.name ?? "Unknown artist";
  return (
    <MediaCard
      href={`/albums/${album.id}`}
      title={album.title}
      subtitle={`${album.releaseYear} · ${artist}`}
      coverUrl={album.coverUrl}
      trackIds={album.trackIds}
      source={{ type: "album", id: album.id }}
    />
  );
}
