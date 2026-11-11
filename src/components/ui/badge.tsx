import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-caption font-medium whitespace-nowrap [&_svg]:size-3",
  {
    variants: {
      variant: {
        neutral: "bg-secondary text-secondary-foreground",
        primary: "bg-subtle-primary text-subtle-primary-foreground",
        accent: "bg-subtle-accent text-subtle-accent-foreground",
        success: "bg-subtle-success text-subtle-success-foreground",
        warning: "bg-subtle-warning text-subtle-warning-foreground",
        destructive:
          "bg-subtle-destructive text-subtle-destructive-foreground",
        outline: "border border-input text-foreground",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
