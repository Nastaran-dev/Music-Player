import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function MainNotFound() {
  return (
    <EmptyState
      icon={SearchX}
      title="We could not find that page"
      description="The album, artist or playlist you opened does not exist or has moved."
      action={
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      }
    />
  );
}
