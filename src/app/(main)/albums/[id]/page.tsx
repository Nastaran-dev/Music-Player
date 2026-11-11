import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CollectionHeader } from "@/components/layout/collection-header";
import { SaveAlbumButton } from "@/features/favorites/components/save-toggle-button";
import { TrackList } from "@/features/music-library/components/track-list";
import { PlayCollectionButton } from "@/features/player/components/play-collection-button";
import { getAlbumById, getAllAlbums, getArtistById, getGenreById } from "@/services/catalog";
import { formatTotalDuration } from "@/utils/format-time";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllAlbums().map((album) => ({ id: album.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: getAlbumById(id)?.title ?? "Album" };
}

export default async function AlbumPage({ params }: Props) {
  const { id } = await params;
  const album = getAlbumById(id);
  if (!album) notFound();

  const artist = getArtistById(album.artistId);
  const source = { type: "album", id: album.id } as const;

  return (
    <>
      <CollectionHeader
        kind="Album"
        title={album.title}
        coverUrl={album.coverUrl}
        meta={[
          artist ? (
            <Link key="artist" href={`/artists/${artist.id}`} className="rounded-sm font-medium text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              {artist.name}
            </Link>
          ) : (
            "Unknown artist"
          ),
          String(album.releaseYear),
          getGenreById(album.genre)?.name ?? album.genre,
          `${album.trackIds.length} songs`,
          formatTotalDuration(album.totalDuration),
        ]}
        actions={
          <>
            <PlayCollectionButton trackIds={album.trackIds} label={album.title} source={source} />
            <PlayCollectionButton trackIds={album.trackIds} label={album.title} shuffle source={source} />
            <SaveAlbumButton albumId={album.id} title={album.title} />
          </>
        }
      />
      <TrackList trackIds={album.trackIds} source={source} />
    </>
  );
}
