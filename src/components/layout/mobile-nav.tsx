"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { LazyPlaylistFormDialog } from "@/features/playlists/components/lazy-playlist-form-dialog";
import { cn } from "@/lib/utils";
import { isActivePath } from "@/utils/navigation";

import { CreatePlaylistButton } from "./create-playlist-item";
import { navItemClasses } from "./navigation-item";

const TAB_CLASSES =
  "relative flex min-h-14 w-full flex-col items-center justify-center gap-0.5 text-caption font-medium text-muted-foreground transition-colors duration-(--duration-base) focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset aria-[current=page]:text-foreground";

function DrawerLinks({
  items,
  pathname,
}: {
  items: readonly NavItem[];
  pathname: string;
}) {
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

/** Phone navigation: bottom tab bar + a drawer with every destination. */
export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  // Set when "Create Playlist" is tapped: the dialog opens only after the drawer has closed.
  const createAfterClose = useRef(false);

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
                    transition={{
                      duration: DURATION.base,
                      ease: EASE.standard,
                    }}
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
            <SheetContent
              onCloseAutoFocus={(event) => {
                if (createAfterClose.current) {
                  event.preventDefault();
                  createAfterClose.current = false;
                  setCreateOpen(true);
                }
              }}
            >
              <div className="flex flex-col gap-3 overflow-y-auto p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <BrandLogo />
                <DrawerLinks items={PRIMARY_NAV} pathname={pathname} />
                <Separator />
                <DrawerLinks items={LIBRARY_NAV} pathname={pathname} />
                <CreatePlaylistButton
                  layout="full"
                  onClick={() => {
                    createAfterClose.current = true;
                    setOpen(false);
                  }}
                />
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

      <LazyPlaylistFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSaved={(id) => router.push(`/playlists/${id}`)}
      />
    </nav>
  );
}
