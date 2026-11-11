import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CollectionHeader } from "@/components/layout/collection-header";
import { ContentSection } from "@/components/layout/content-section";
import { CardGrid } from "@/components/shared/media-card";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { AlbumCard } from "@/features/albums/album-card";
import { ArtistCard } from "@/features/artists/artist-card";
import { FollowArtistButton } from "@/features/favorites/components/save-toggle-button";
import { TrackList } from "@/features/music-library/components/track-list";
import { PlayCollectionButton } from "@/features/player/components/play-collection-button";
import {
  getAllArtists,
  getArtistAlbums,
  getArtistById,
  getArtistTrackIds,
  getGenreById,
  getRelatedArtists,
} from "@/services/catalog";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllArtists().map((artist) => ({ id: artist.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: getArtistById(id)?.name ?? "Artist" };
}

export default async function ArtistPage({ params }: Props) {
  const { id } = await params;
  const artist = getArtistById(id);
  if (!artist) notFound();

  const trackIds = getArtistTrackIds(artist.id);
  const albums = getArtistAlbums(artist.id);
  const related = getRelatedArtists(artist.id, 6);

  return (
    <>
      <CollectionHeader
        kind="Artist"
        title={artist.name}
        coverUrl={artist.imageUrl}
        round
        meta={[`${artist.monthlyListeners.toLocaleString("en-US")} monthly listeners`]}
        actions={
          <>
            <PlayCollectionButton trackIds={trackIds} label={artist.name} />
            <FollowArtistButton artistId={artist.id} name={artist.name} />
            <span className="flex gap-1.5">
              {artist.genres.map((genre) => (
                <Badge key={genre} variant="primary">
                  {getGenreById(genre)?.name ?? genre}
                </Badge>
              ))}
            </span>
          </>
        }
      />

      <ContentSection id="popular" title="Popular">
        <TrackList trackIds={trackIds.slice(0, 5)} />
      </ContentSection>

      {albums.length > 0 ? (
        <ContentSection id="albums" title="Albums">
          <CardGrid>
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </CardGrid>
        </ContentSection>
      ) : null}

      {related.length > 0 ? (
        <ContentSection id="related" title="Related artists">
          <CardGrid>
            {related.map((other) => (
              <ArtistCard key={other.id} artist={other} />
            ))}
          </CardGrid>
        </ContentSection>
      ) : null}

      <ContentSection id="about" title="About">
        <Typography tone="muted" className="max-w-prose">
          {artist.biography}
        </Typography>
      </ContentSection>
    </>
  );
}
