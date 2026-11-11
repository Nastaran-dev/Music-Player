"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { useUiStore } from "@/stores/ui-store";

const ExpandedPlayer = dynamic(
  () => import("./expanded-player").then((module) => module.ExpandedPlayer),
  { ssr: false },
);

export function LazyExpandedPlayer() {
  const open = useUiStore((s) => s.expandedPlayerOpen);
  const [requested, setRequested] = useState(false);
  if (open && !requested) setRequested(true);
  return requested ? <ExpandedPlayer /> : null;
}
