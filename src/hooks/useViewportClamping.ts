"use client";

import * as React from "react";
import { useWindowStore } from "@/store/windows";

export function useViewportClamping() {
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        useWindowStore.getState().clampAllWindowsOnResize();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}

