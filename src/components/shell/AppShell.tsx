"use client";

import * as React from "react";
import { useLayoutMode } from "@/hooks/useLayoutMode";
import { Wallpaper } from "@/components/shell/Wallpaper";
import { Desktop } from "@/components/shell/Desktop";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { TabletShell } from "@/components/mobile/TabletShell";
import { DeepLinkHandler } from "@/components/shell/DeepLinkHandler";
import { FullscreenPrompt } from "@/components/shell/FullscreenPrompt";
import { Oneko } from "@/components/shell/Oneko";
import { useSystemStore } from "@/store/system";

export function AppShell() {
  const mode = useLayoutMode();

  // Root-level hydration of user appearance preferences
  React.useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceBoot = urlParams.has("boot");
      const hasBooted = sessionStorage.getItem("ubuntu_booted");
      if (!hasBooted || forceBoot) {
        useSystemStore.setState({ isBooting: true });
      } else {
        const isUnlocked = sessionStorage.getItem("ubuntu_unlocked");
        if (!isUnlocked) {
          useSystemStore.setState({ isLocked: true });
        }
      }
      const savedTheme = localStorage.getItem("ubuntu_theme") as "dark" | "light" | null;
      if (savedTheme) {
        useSystemStore.getState().setTheme(savedTheme);
      }

      const savedWallpaper = localStorage.getItem("ubuntu_wallpaper");
      if (savedWallpaper) {
        useSystemStore.setState({ wallpaper: savedWallpaper });
      }

      const savedAccent = localStorage.getItem("ubuntu_accent");
      if (savedAccent) {
        useSystemStore.getState().setAccentColor(savedAccent);
      }

      const savedFont = localStorage.getItem("ubuntu_font") as import("@/store/system").SystemFontFamily | null;
      if (savedFont) {
        useSystemStore.getState().setFont(savedFont);
      }

      const savedOneko = localStorage.getItem("ubuntu_oneko");
      if (savedOneko === "true") {
        useSystemStore.getState().setOneko(true);
      }

      const savedCustom = localStorage.getItem("ubuntu_custom_wallpapers");
      if (savedCustom) {
        useSystemStore.setState({ customWallpapers: JSON.parse(savedCustom) });
      }
    } catch {}
  }, []);

  return (
    <>
      <DeepLinkHandler />
      <FullscreenPrompt />
      <Oneko />
      {mode === null ? (
        <div className="fixed inset-0 bg-[#111111] overflow-hidden select-none">
          <Wallpaper />
        </div>
      ) : mode === "phone" ? (
        <PhoneShell />
      ) : mode === "tablet" ? (
        <TabletShell />
      ) : (
        <Desktop />
      )}
    </>
  );
}
