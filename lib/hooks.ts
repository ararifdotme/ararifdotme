"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** false during SSR and hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/** Current time in ms, ticking every `interval` ms. null on the server. */
export function useNow(interval: number): number | null {
  return useSyncExternalStore(
    (cb) => {
      const id = setInterval(cb, interval);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / interval) * interval,
    () => null,
  );
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
