import { ContentSection } from "@/components/layout/content-section";
import { CardGrid } from "@/components/shared/media-card";
import { AlbumCard } from "@/features/albums/album-card";
import { ArtistCard } from "@/features/artists/artist-card";
import { HomeGreeting } from "@/features/home/components/home-greeting";
import { TrackList } from "@/features/music-library/components/track-list";
import { RecentlyPlayedShelf } from "@/features/recent/components/recently-played-shelf";
import { PlaylistCard } from "@/features/playlists/components/playlist-card";
import { GenreCard } from "@/features/search/components/genre-card";
import {
  getAllGenres,
  getAllPlaylists,
  getNewReleases,
  getPopularArtists,
  getTrendingTrackIds,
} from "@/services/catalog";

export default function HomePage() {
  return (
    <>
      <HomeGreeting />

      <RecentlyPlayedShelf />

      <ContentSection id="featured" title="Featured playlists" href="/playlists">
        <CardGrid>
          {getAllPlaylists()
            .slice(0, 6)
            .map((p) => (
              <PlaylistCard key={p.id} id={p.id} title={p.title} description={p.description} coverUrl={p.coverUrl} trackIds={p.trackIds} />
            ))}
        </CardGrid>
      </ContentSection>

      <ContentSection id="trending" title="Trending tracks" href="/discover">
        <TrackList trackIds={getTrendingTrackIds(10)} />
      </ContentSection>

      <ContentSection id="artists" title="Popular artists" href="/discover">
        <CardGrid>
          {getPopularArtists(6).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </CardGrid>
      </ContentSection>

      <ContentSection id="new" title="New releases" href="/discover">
        <CardGrid>
          {getNewReleases(6).map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </CardGrid>
      </ContentSection>

      <ContentSection id="genres" title="Browse genres" href="/search">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {getAllGenres().map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </ContentSection>
    </>
  );
}
