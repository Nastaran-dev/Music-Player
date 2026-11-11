import { lyricsByTrackId } from "@/mocks/lyrics";
import type { Lyrics } from "@/types/music";

const SIMULATED_LATENCY_MS = 350;

export async function fetchLyrics(trackId: string): Promise<Lyrics | null> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  return lyricsByTrackId[trackId] ?? null;
}
