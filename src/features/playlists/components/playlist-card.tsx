import { MediaCard } from "@/components/shared/media-card";

interface PlaylistCardProps {
  id: string;
  title: string;
  description?: string;
  coverUrl: string;
  trackIds: readonly string[];
}

export function PlaylistCard({ id, title, description, coverUrl, trackIds }: PlaylistCardProps) {
  return (
    <MediaCard
      href={`/playlists/${id}`}
      title={title}
      subtitle={description || `${trackIds.length} songs`}
      coverUrl={coverUrl}
      trackIds={trackIds}
      source={{ type: "playlist", id }}
    />
  );
}
