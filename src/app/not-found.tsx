import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center gap-4 px-6"
    >
      <Typography variant="overline" tone="muted">
        Error 404
      </Typography>
      <Typography variant="title">This page is off the playlist</Typography>
      <Typography tone="muted">
        The page you are looking for does not exist or has moved.
      </Typography>
      <Button asChild size="lg">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
