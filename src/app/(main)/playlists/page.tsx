import type { Metadata } from "next";

import { ContentSection } from "@/components/layout/content-section";
import { PageHeader } from "@/components/layout/page-header";
import { CardGrid } from "@/components/shared/media-card";
import { PlaylistCard } from "@/features/playlists/components/playlist-card";
import { YourPlaylists } from "@/features/playlists/components/your-playlists";
import { getAllPlaylists } from "@/services/catalog";

export const metadata: Metadata = { title: "Playlists" };

export default function PlaylistsPage() {
  return (
    <>
      <PageHeader title="Playlists" description="Your own playlists and VYBE's featured picks." />
      <ContentSection id="your-playlists" title="Your playlists">
        <YourPlaylists />
      </ContentSection>
      <ContentSection id="featured-playlists" title="Featured playlists">
        <CardGrid>
          {getAllPlaylists().map((p) => (
            <PlaylistCard key={p.id} id={p.id} title={p.title} description={p.description} coverUrl={p.coverUrl} trackIds={p.trackIds} />
          ))}
        </CardGrid>
      </ContentSection>
    </>
  );
}
