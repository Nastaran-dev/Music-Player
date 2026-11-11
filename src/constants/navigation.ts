import {
  Clock3,
  Compass,
  Heart,
  House,
  Library,
  ListMusic,
  Search,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/search", label: "Search", icon: Search },
];

export const LIBRARY_NAV: readonly NavItem[] = [
  { href: "/library", label: "Your Library", icon: Library },
  { href: "/playlists", label: "Playlists", icon: ListMusic },
  { href: "/liked", label: "Liked Songs", icon: Heart },
  { href: "/recent", label: "Recently Played", icon: Clock3 },
];

export const PROFILE_NAV: NavItem = {
  href: "/profile",
  label: "Your profile",
  icon: UserRound,
};

export const MOBILE_TAB_NAV: readonly NavItem[] = [
  PRIMARY_NAV[0],
  PRIMARY_NAV[2],
  LIBRARY_NAV[0],
].filter((item): item is NavItem => item !== undefined);
