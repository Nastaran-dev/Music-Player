import type { Metadata } from "next";
import { UserRound } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Your profile" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="Your profile"
        description="Your listening preferences."
      />
      <EmptyState
        icon={UserRound}
        title="Profile is not available yet"
        description="Preferences and listening stats arrive in a later phase."
      />
    </>
  );
}
