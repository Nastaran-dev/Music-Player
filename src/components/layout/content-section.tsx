import type { ReactNode } from "react";
import Link from "next/link";

import { Typography } from "@/components/ui/typography";

interface ContentSectionProps {
  id: string;
  title: string;
  href?: string;
  children: ReactNode;
}

export function ContentSection({ id, title, href, children }: ContentSectionProps) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3 pb-8">
      <div className="flex items-baseline justify-between gap-4">
        <Typography variant="heading" as="h2" id={id}>
          {title}
        </Typography>
        {href ? (
          <Link
            href={href}
            className="rounded-sm text-small font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Show all
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
