import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;

  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-14 text-center",
        className,
      )}
    >
      {Icon ? (
        <span className="flex size-14 items-center justify-center rounded-full bg-surface-2 text-muted-foreground">
          <Icon className="size-6" aria-hidden="true" />
        </span>
      ) : null}
      <Typography variant="subheading" as="h2">
        {title}
      </Typography>
      {description ? (
        <Typography variant="small" tone="muted" className="max-w-sm">
          {description}
        </Typography>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
