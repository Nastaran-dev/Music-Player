import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useCurrentHour(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getHours(),
    () => null,
  );
}
