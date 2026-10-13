import { useSyncExternalStore } from "react";

/**
 * Safely requests fullscreen on the document element with cross-browser vendor prefix support.
 */
export async function enterFullscreen(): Promise<boolean> {
  if (typeof document === "undefined") return false;

  const elem = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  };

  try {
    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
      return true;
    } else if (elem.webkitRequestFullscreen) {
      await elem.webkitRequestFullscreen();
      return true;
    } else if (elem.mozRequestFullScreen) {
      await elem.mozRequestFullScreen();
      return true;
    } else if (elem.msRequestFullscreen) {
      await elem.msRequestFullscreen();
      return true;
    }
  } catch (err) {
    // Browser denied or user blocked; fail silently
    console.warn("Fullscreen request was not permitted:", err);
  }
  return false;
}

/**
 * Safely exits fullscreen.
 */
export async function exitFullscreen(): Promise<boolean> {
  if (typeof document === "undefined") return false;

  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void>;
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
  };

  try {
    if (doc.exitFullscreen) {
      await doc.exitFullscreen();
      return true;
    } else if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen();
      return true;
    } else if (doc.mozCancelFullScreen) {
      await doc.mozCancelFullScreen();
      return true;
    } else if (doc.msExitFullscreen) {
      await doc.msExitFullscreen();
      return true;
    }
  } catch (err) {
    console.warn("Exit fullscreen failed:", err);
  }
  return false;
}

/**
 * Check if the document is currently in fullscreen mode.
 */
export function getIsFullscreen(): boolean {
  if (typeof document === "undefined") return false;

  const doc = document as Document & {
    webkitFullscreenElement?: Element;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
  };

  return !!(
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement
  );
}

/**
 * Toggles between fullscreen and windowed mode.
 */
export async function toggleFullscreen(): Promise<boolean> {
  if (getIsFullscreen()) {
    return exitFullscreen();
  } else {
    return enterFullscreen();
  }
}

function subscribe(callback: () => void) {
  if (typeof document === "undefined") return () => {};
  document.addEventListener("fullscreenchange", callback);
  document.addEventListener("webkitfullscreenchange", callback);
  document.addEventListener("mozfullscreenchange", callback);
  document.addEventListener("MSFullscreenChange", callback);

  return () => {
    document.removeEventListener("fullscreenchange", callback);
    document.removeEventListener("webkitfullscreenchange", callback);
    document.removeEventListener("mozfullscreenchange", callback);
    document.removeEventListener("MSFullscreenChange", callback);
  };
}

/**
 * React hook that returns live fullscreen status with SSR safety.
 */
export function useIsFullscreen(): boolean {
  return useSyncExternalStore(subscribe, getIsFullscreen, () => false);
}
