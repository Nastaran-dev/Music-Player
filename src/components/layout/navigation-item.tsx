"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DURATION, EASE } from "@/constants/motion";
import { cn } from "@/lib/utils";

export type NavLayout = "collapsed" | "responsive" | "full";

export function navItemClasses(layout: NavLayout): string {
  return cn(
    "relative flex h-11 w-full items-center gap-3 rounded-lg text-small font-medium",
    "text-muted-foreground transition-colors duration-(--duration-base) ease-(--ease-standard)",
    "hover:bg-foreground/10 hover:text-foreground",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
    layout === "collapsed" && "justify-center",
    layout === "responsive" && "justify-center lg:justify-start lg:px-3",
    layout === "full" && "justify-start px-3",
  );
}

export function navLabelClasses(layout: NavLayout): string {
  if (layout === "collapsed") return "sr-only";
  if (layout === "responsive") return "sr-only lg:not-sr-only";
  return "";
}

interface NavigationItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  layout: NavLayout;
  indicatorId?: string;
}

export function NavigationItem({
  href,
  label,
  icon: Icon,
  active,
  layout,
  indicatorId = "sidebar-indicator",
}: NavigationItemProps) {
  const link = (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        navItemClasses(layout),
        active && "bg-foreground/10 text-foreground",
      )}
    >
      {active ? (
        <motion.span
          layoutId={indicatorId}
          aria-hidden="true"
          className="absolute top-2.5 bottom-2.5 left-0 w-1 rounded-full bg-primary"
          transition={{ duration: DURATION.base, ease: EASE.standard }}
        />
      ) : null}
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      <span className={navLabelClasses(layout)}>{label}</span>
    </Link>
  );

  if (layout === "full") return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent
        side="right"
        className={layout === "responsive" ? "lg:hidden" : undefined}
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
