"use client";

import * as React from "react";
import { useWindowStore } from "@/store/windows";
import { useSystemStore } from "@/store/system";
import { toggleFullscreen } from "@/lib/fullscreen";

export function useHotkeys() {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Fullscreen with F11
      if (e.key === "F11") {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      const system = useSystemStore.getState();
      if (system.isBooting || system.isLocked) {
        return;
      }

      // Lock Screen shortcut: Super + L
      if (e.metaKey && (e.key === "l" || e.key === "L")) {
        e.preventDefault();
        system.lockScreen();
        return;
      }

      const state = useWindowStore.getState();
      const { activeId } = state;

      // 1. Alt + Tab window switcher
      if (e.altKey && e.key === "Tab") {
        e.preventDefault();
        if (!state.isSwitcherOpen) {
          state.setSwitcherOpen(true);
          state.setSwitcherIndex(1);
        } else {
          state.stepSwitcher(e.shiftKey ? -1 : 1);
        }
        return;
      }

      // 2. Ctrl + Alt + T -> Launch / focus Terminal
      if (e.ctrlKey && e.altKey && (e.key === "t" || e.key === "T")) {
        e.preventDefault();
        state.openWindow("terminal");
        return;
      }

      // 3. Alt + F4 -> Close active window
      if (e.altKey && e.key === "F4" && activeId) {
        e.preventDefault();
        state.closeWindow(activeId);
        return;
      }

      // 4. Meta (Super) key alone -> Toggle Activities
      if (e.key === "Meta" && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        useSystemStore.getState().toggleActivities();
        return;
      }

      // 5. Meta (Super) + Arrow keys for snapping and tiling
      if (e.metaKey && activeId) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          state.maximizeWindow(activeId);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          const win = state.windows[activeId];
          if (win?.isMaximized || win?.snapZone !== "none") {
            state.restoreWindow(activeId);
          } else {
            state.minimizeWindow(activeId);
          }
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          state.applySnap(activeId, "left");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          state.applySnap(activeId, "right");
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // When Alt is released while switcher is open, commit switcher selection
      if (e.key === "Alt") {
        const state = useWindowStore.getState();
        if (state.isSwitcherOpen) {
          state.commitSwitcher();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
}
