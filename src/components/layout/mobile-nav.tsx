"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  LIBRARY_NAV,
  MOBILE_TAB_NAV,
  PRIMARY_NAV,
  PROFILE_NAV,
  type NavItem,
} from "@/constants/navigation";
import { DURATION, EASE } from "@/constants/motion";
import { cn } from "@/lib/utils";
import { isActivePath } from "@/utils/navigation";

import { CreatePlaylistItem } from "./create-playlist-item";
import { navItemClasses } from "./navigation-item";

const TAB_CLASSES =
  "relative flex min-h-14 w-full flex-col items-center justify-center gap-0.5 text-caption font-medium text-muted-foreground transition-colors duration-(--duration-base) focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset aria-[current=page]:text-foreground";

function DrawerLinks({ items, pathname }: { items: readonly NavItem[]; pathname: string }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map(({ href, label, icon: Icon }) => {
        const active = isActivePath(pathname, href);
        return (
          <li key={href}>
            <SheetClose asChild>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  navItemClasses("full"),
                  active && "bg-foreground/10 text-foreground",
                )}
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                {label}
              </Link>
            </SheetClose>
          </li>
        );
      })}
    </ul>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Primary"
      className="border-t border-border bg-surface-1 pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="flex">
        {MOBILE_TAB_NAV.map(({ href, label, icon: Icon }) => {
          const active = isActivePath(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={TAB_CLASSES}
              >
                {active ? (
                  <motion.span
                    layoutId="mobile-tab-indicator"
                    aria-hidden="true"
                    className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-primary"
                    transition={{ duration: DURATION.base, ease: EASE.standard }}
                  />
                ) : null}
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
        <li className="flex-1">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" className={TAB_CLASSES}>
                <Menu className="size-5" aria-hidden="true" />
                Menu
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-3 overflow-y-auto p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <BrandLogo />
                <DrawerLinks items={PRIMARY_NAV} pathname={pathname} />
                <Separator />
                <DrawerLinks items={LIBRARY_NAV} pathname={pathname} />
                <CreatePlaylistItem layout="full" onCreated={() => setOpen(false)} />
                <Separator />
                <DrawerLinks items={[PROFILE_NAV]} pathname={pathname} />
                <div className="pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
}
