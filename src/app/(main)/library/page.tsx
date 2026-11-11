import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { LibraryView } from "@/features/music-library/components/library-view";

export const metadata: Metadata = { title: "Your Library" };

export default function LibraryPage() {
  return (
    <>
      <PageHeader title="Your Library" description="Playlists, saved albums, followed artists and liked songs." />
      <LibraryView />
    </>
  );
}
