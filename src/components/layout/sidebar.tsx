"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { IconButton } from "@/components/ui/icon-button";
import { Separator } from "@/components/ui/separator";
import { LIBRARY_NAV, PRIMARY_NAV, PROFILE_NAV } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/ui-store";
import { isActivePath } from "@/utils/navigation";

import { CreatePlaylistItem } from "./create-playlist-item";
import { SidebarPlaylists } from "./sidebar-playlists";
import { NavigationItem, type NavLayout } from "./navigation-item";

export function Sidebar() {
  const pathname = usePathname();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const layout: NavLayout = collapsed ? "collapsed" : "responsive";

  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        "hidden shrink-0 flex-col gap-2 border-r border-border bg-surface-1 p-3 md:flex",
        "transition-[width] duration-(--duration-slow) ease-(--ease-emphasized)",
        collapsed ? "w-[72px]" : "w-[72px] lg:w-64",
      )}
    >
      <Link
        href="/"
        aria-label="VYBE home"
        className={cn(
          "flex h-12 items-center rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          collapsed ? "justify-center" : "justify-center lg:justify-start lg:px-2",
        )}
      >
        <BrandLogo
          showWordmark={!collapsed}
          wordmarkClassName="hidden lg:inline"
        />
      </Link>

      <nav aria-label="Main">
        <ul className="flex flex-col gap-1">
          {PRIMARY_NAV.map((item) => (
            <li key={item.href}>
              <NavigationItem
                {...item}
                active={isActivePath(pathname, item.href)}
                layout={layout}
              />
            </li>
          ))}
        </ul>
      </nav>

      <Separator className="my-1" />

      <nav aria-label="Your library">
        <ul className="flex flex-col gap-1">
          {LIBRARY_NAV.map((item) => (
            <li key={item.href}>
              <NavigationItem
                {...item}
                active={isActivePath(pathname, item.href)}
                layout={layout}
              />
            </li>
          ))}
          <li>
            <CreatePlaylistItem layout={layout} />
          </li>
        </ul>
      </nav>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {!collapsed ? <SidebarPlaylists /> : null}
      </div>

      <Separator className="my-1" />

      <NavigationItem
        {...PROFILE_NAV}
        active={isActivePath(pathname, PROFILE_NAV.href)}
        layout={layout}
      />

      <div
        className={cn("hidden lg:flex", collapsed ? "justify-center" : "justify-end")}
      >
        <IconButton
          label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          size="sm"
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <PanelLeftOpen aria-hidden="true" />
          ) : (
            <PanelLeftClose aria-hidden="true" />
          )}
        </IconButton>
      </div>
    </aside>
  );
}
