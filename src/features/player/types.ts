
export interface PlayerTrackInfo {
  title: string;
  artist: string;
  coverUrl?: string | null;
}

export type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "error";

export type RepeatMode = "off" | "one" | "all";

export interface PlaybackSource {
  type: "album" | "playlist";
  id: string;
}
