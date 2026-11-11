"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import type { PlaylistFormDialogProps } from "./playlist-form-dialog";

const PlaylistFormDialog = dynamic(
  () => import("./playlist-form-dialog").then((module) => module.PlaylistFormDialog),
  { ssr: false },
);


export function LazyPlaylistFormDialog(props: PlaylistFormDialogProps) {
  const [requested, setRequested] = useState(props.open);
  if (props.open && !requested) setRequested(true);
  return requested ? <PlaylistFormDialog {...props} /> : null;
}
