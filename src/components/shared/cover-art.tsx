"use client";

import { useState } from "react";
import { Image } from "@imagekit/next";
import { Music2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface CoverArtProps {
  src?: string | null;
  alt?: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function CoverArt({
  src,
  alt = "",
  sizes,
  className,
  imageClassName,
  priority,
}: CoverArtProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;

  return (
    <div className={cn("relative overflow-hidden bg-surface-3", className)}>
      {showImage && src ? (
        <Image
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={src.endsWith(".svg")}
          onError={() => setFailedSrc(src)}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "flex size-full items-center justify-center bg-brand-gradient text-white",
            imageClassName,
          )}
        >
          <Music2 className="size-1/2" />
        </div>
      )}
    </div>
  );
}
