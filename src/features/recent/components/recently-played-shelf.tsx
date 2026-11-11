"use client";

import { ContentSection } from "@/components/layout/content-section";
import { TrackList } from "@/features/music-library/components/track-list";
import { usePersistHydrated } from "@/hooks/use-persist-hydrated";
import { getRecentTrackIds, useRecentStore } from "@/stores/recent-store";

export function RecentlyPlayedShelf() {
  const ready = usePersistHydrated(useRecentStore);
  const history = useRecentStore((s) => s.history);

  if (!ready || history.length === 0) return null;

  return (
    <ContentSection id="recently-played" title="Recently played" href="/recent">
      <TrackList trackIds={getRecentTrackIds(history, 5)} />
    </ContentSection>
  );
}
