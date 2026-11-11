import type { ReactNode } from "react";

import { CoverArt } from "@/components/shared/cover-art";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface CollectionHeaderProps {
  kind: string;
  title: string;
  description?: string;
  coverUrl: string;
  meta?: ReactNode[];
  actions?: ReactNode;
  round?: boolean;
}
export function CollectionHeader({
  kind,
  title,
  description,
  coverUrl,
  meta = [],
  actions,
  round = false,
}: CollectionHeaderProps) {
  return (
    <header className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-end">
      <CoverArt
        src={coverUrl}
        sizes="224px"
        priority
        className={cn(
          "size-44 shrink-0 self-center shadow-elevation-3 sm:size-56 sm:self-auto",
          round ? "rounded-full" : "rounded-xl",
        )}
      />
      <div className="flex min-w-0 flex-col gap-3">
        <Typography variant="overline" tone="muted">
          {kind}
        </Typography>
        <Typography variant="display" className="text-title sm:text-display wrap-break-word">
          {title}
        </Typography>
        {description ? (
          <Typography tone="muted" className="max-w-prose">
            {description}
          </Typography>
        ) : null}
        {meta.length > 0 ? (
          <p className="flex flex-wrap items-center gap-x-2 text-small text-muted-foreground">
            {meta.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">·</span> : null}
                {item}
              </span>
            ))}
          </p>
        ) : null}
        {actions ? <div className="flex flex-wrap items-center gap-2 pt-1">{actions}</div> : null}
      </div>
    </header>
  );
}
