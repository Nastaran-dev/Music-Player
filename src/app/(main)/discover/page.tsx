import type { Metadata } from "next";

import { ContentSection } from "@/components/layout/content-section";
import { PageHeader } from "@/components/layout/page-header";
import { CardGrid } from "@/components/shared/media-card";
import { AlbumCard } from "@/features/albums/album-card";
import { ArtistCard } from "@/features/artists/artist-card";
import { TrackList } from "@/features/music-library/components/track-list";
import { PlaylistCard } from "@/features/playlists/components/playlist-card";
import {
  getAllAlbums,
  getAllArtists,
  getAllPlaylists,
  getAllTrackIds,
} from "@/services/catalog";

export const metadata: Metadata = { title: "Discover" };

export default function DiscoverPage() {
  const trackIds = getAllTrackIds();

  return (
    <>
      <PageHeader title="Discover" description="Everything in the catalog. Tracks without an audio file are marked." />

      <ContentSection id="playlists" title="Playlists">
        <CardGrid>
          {getAllPlaylists().map((p) => (
            <PlaylistCard key={p.id} id={p.id} title={p.title} description={p.description} coverUrl={p.coverUrl} trackIds={p.trackIds} />
          ))}
        </CardGrid>
      </ContentSection>

      <ContentSection id="albums" title="Albums">
        <CardGrid>
          {getAllAlbums().map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </CardGrid>
      </ContentSection>

      <ContentSection id="artists" title="Artists">
        <CardGrid>
          {getAllArtists().map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </CardGrid>
      </ContentSection>

      <ContentSection id="all-tracks" title={`All tracks (${trackIds.length})`}>
        <TrackList trackIds={trackIds} />
      </ContentSection>
    </>
  );
}
