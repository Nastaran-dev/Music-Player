import Link from "next/link";

import { CoverArt } from "@/components/shared/cover-art";
import { PlayCollectionButton } from "@/features/player/components/play-collection-button";
import type { PlaybackSource } from "@/features/player/types";
import { cn } from "@/lib/utils";

export interface MediaCardProps {
  href: string;
  title: string;
  subtitle?: string;
  coverUrl: string;
  trackIds: readonly string[];
  round?: boolean;
  source?: PlaybackSource;
  className?: string;
}


export function MediaCard({
  href,
  title,
  subtitle,
  coverUrl,
  trackIds,
  round = false,
  source,
  className,
}: MediaCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl p-3 transition-colors duration-(--duration-base) hover:bg-foreground/5 focus-within:bg-foreground/5",
        className,
      )}
    >
      <div className="relative">
        <CoverArt
          src={coverUrl}
          sizes="(min-width: 1280px) 16vw, (min-width: 768px) 22vw, 45vw"
          imageClassName="transition-transform duration-(--duration-slow) ease-(--ease-emphasized) group-hover:scale-105 motion-reduce:transform-none"
          className={cn(
            "aspect-square w-full shadow-elevation-1",
            round ? "rounded-full" : "rounded-lg",
          )}
        />
        <PlayCollectionButton
          trackIds={trackIds}
          label={`Play ${title}`}
          variant="overlay"
          source={source}
        />
      </div>
      <div className={cn("min-w-0", round && "text-center")}>
        <h3 className="truncate text-small font-semibold">
          <Link
            href={href}
            className="rounded-sm after:absolute after:inset-0 focus-visible:outline-none"
          >
            {title}
          </Link>
        </h3>
        {subtitle ? (
          <p className="truncate text-caption text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </article>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {children}
    </div>
  );
}
