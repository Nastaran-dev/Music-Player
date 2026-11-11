import type { ReactNode } from "react";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-4 pb-6",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <Typography variant="title">{title}</Typography>
        {description ? (
          <Typography tone="muted" className="max-w-prose">
            {description}
          </Typography>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
