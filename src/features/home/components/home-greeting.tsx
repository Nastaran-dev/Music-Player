"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useCurrentHour } from "@/hooks/use-current-hour";
import { getGreeting } from "@/utils/greeting";

export function HomeGreeting() {
  const hour = useCurrentHour();
  const greeting = hour === null ? "Welcome back" : getGreeting(hour);

  return (
    <PageHeader
      title={greeting}
      description="Your music, playlists and recommendations in one place."
    />
  );
}
