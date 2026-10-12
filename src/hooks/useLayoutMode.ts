"use client";

import * as React from "react";

export type LayoutMode = "phone" | "tablet" | "desktop";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot(): LayoutMode {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "phone";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getServerSnapshot(): LayoutMode | null {
  return null;
}

/**
 * Returns current layout mode ("phone" | "tablet" | "desktop").
 * Returns null during SSR / pre-hydration to guard against hydration mismatches and flashes.
 */
export function useLayoutMode(): LayoutMode | null {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function getLayoutMode(width: number): LayoutMode {
  if (width < 768) return "phone";
  if (width < 1024) return "tablet";
  return "desktop";
}
