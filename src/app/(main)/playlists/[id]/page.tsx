import type { Metadata } from "next";

import { CollectionHeader } from "@/components/layout/collection-header";
import { TrackList } from "@/features/music-library/components/track-list";
import { PlayCollectionButton } from "@/features/player/components/play-collection-button";
import { UserPlaylistView } from "@/features/playlists/components/user-playlist-view";
import { getAllPlaylists, getPlaylistById, getTrackById } from "@/services/catalog";
import { formatTotalDuration } from "@/utils/format-time";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllPlaylists().map((playlist) => ({ id: playlist.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: getPlaylistById(id)?.title ?? "Playlist" };
}

export default async function PlaylistPage({ params }: Props) {
  const { id } = await params;
  const playlist = getPlaylistById(id);

  // Not a featured playlist: it is one the user created (stored in this browser).
  if (!playlist) return <UserPlaylistView id={id} />;

  const source = { type: "playlist", id: playlist.id } as const;
  const total = playlist.trackIds.reduce((sum, trackId) => sum + (getTrackById(trackId)?.duration ?? 0), 0);

  return (
    <>
      <CollectionHeader
        kind="Featured playlist"
        title={playlist.title}
        description={playlist.description}
        coverUrl={playlist.coverUrl}
        meta={[`${playlist.trackIds.length} songs`, formatTotalDuration(total)]}
        actions={
          <>
            <PlayCollectionButton trackIds={playlist.trackIds} label={playlist.title} source={source} />
            <PlayCollectionButton trackIds={playlist.trackIds} label={playlist.title} shuffle source={source} />
          </>
        }
      />
      <TrackList trackIds={playlist.trackIds} source={source} />
    </>
  );
}
