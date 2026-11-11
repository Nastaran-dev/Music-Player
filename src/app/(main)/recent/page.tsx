import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { RecentlyPlayedView } from "@/features/recent/components/recently-played-view";

export const metadata: Metadata = { title: "Recently Played" };

export default function RecentPage() {
  return (
    <>
      <PageHeader title="Recently Played" description="Pick up where you left off." />
      <RecentlyPlayedView />
    </>
  );
}
