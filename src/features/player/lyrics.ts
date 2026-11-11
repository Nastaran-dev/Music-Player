import type { LyricLine } from "@/types/music";

export function isSyncedLyrics(lines: readonly LyricLine[]): boolean {
  return lines.length > 0 && lines.every((line) => line.time !== null);
}


export function findActiveLyricIndex(
  lines: readonly LyricLine[],
  currentTime: number,
): number {
  let active = -1;
  for (let i = 0; i < lines.length; i++) {
    const time = lines[i]?.time;
    if (time === null || time === undefined) return -1;
    if (time <= currentTime) active = i;
    else break;
  }
  return active;
}
