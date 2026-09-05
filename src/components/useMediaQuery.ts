"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Mobile-first by construction: the server snapshot is always false, so the
 * narrow layout is what renders first and the wide one is an enhancement.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
