import type { Metadata } from "next";

import { LikedSongsView } from "@/features/favorites/components/liked-songs-view";

export const metadata: Metadata = { title: "Liked Songs" };

export default function LikedPage() {
  return <LikedSongsView />;
}
