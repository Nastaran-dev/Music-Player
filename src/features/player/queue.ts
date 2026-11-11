import type { RepeatMode } from "./types";

interface NeighborParams {
  length: number;
  currentIndex: number;
  repeat: RepeatMode;
  isPlayable: (index: number) => boolean;
}

export function findNextIndex({
  length,
  currentIndex,
  repeat,
  isPlayable,
}: NeighborParams): number | null {
  for (let step = 1; step <= length; step++) {
    let index = currentIndex + step;
    if (index >= length) {
      if (repeat !== "all") return null;
      index %= length;
    }
    if (isPlayable(index)) return index;
  }
  return null;
}

export function findPreviousIndex({
  length,
  currentIndex,
  repeat,
  isPlayable,
}: NeighborParams): number | null {
  for (let step = 1; step <= length; step++) {
    let index = currentIndex - step;
    if (index < 0) {
      if (repeat !== "all") return null;
      index = ((index % length) + length) % length;
    }
    if (index !== currentIndex && isPlayable(index)) return index;
  }
  return null;
}

export function shuffleKeepingCurrent(
  ids: readonly string[],
  currentId: string | undefined,
  random: () => number = Math.random,
): string[] {
  const rest = ids.filter((id, i) => !(id === currentId && ids.indexOf(id) === i));
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [rest[i], rest[j]] = [rest[j] as string, rest[i] as string];
  }
  return currentId !== undefined && ids.includes(currentId) ? [currentId, ...rest] : rest;
}

export function removeAt<T>(items: readonly T[], index: number): T[] {
  if (index < 0 || index >= items.length) return [...items];
  return [...items.slice(0, index), ...items.slice(index + 1)];
}

export function insertAt<T>(items: readonly T[], index: number, item: T): T[] {
  const at = Math.min(Math.max(index, 0), items.length);
  return [...items.slice(0, at), item, ...items.slice(at)];
}

export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  if (from < 0 || from >= items.length || to < 0 || to >= items.length) {
    return [...items];
  }
  const copy = [...items];
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved as T);
  return copy;
}
