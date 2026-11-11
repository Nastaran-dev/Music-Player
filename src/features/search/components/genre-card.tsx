import Link from "next/link";

import { CoverArt } from "@/components/shared/cover-art";
import type { Genre } from "@/types/music";

export function GenreCard({ genre }: { genre: Genre }) {
  return (
    <Link
      href={`/search?genre=${genre.id}`}
      className="group relative flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-xl p-4 text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      <CoverArt
        src={genre.image}
        sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
        className="absolute inset-0"
        imageClassName="transition-transform duration-(--duration-slow) ease-(--ease-emphasized) group-hover:scale-105 motion-reduce:transform-none"
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent"
      />
      <span className="relative font-display text-subheading font-bold">{genre.name}</span>
      <span className="relative line-clamp-1 text-caption text-white/85">{genre.description}</span>
    </Link>
  );
}