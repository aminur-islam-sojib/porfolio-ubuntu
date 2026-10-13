"use client";

import * as React from "react";
import { useLayoutMode } from "@/hooks/useLayoutMode";
import { Wallpaper } from "@/components/shell/Wallpaper";
import { Desktop } from "@/components/shell/Desktop";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { TabletShell } from "@/components/mobile/TabletShell";
import { DeepLinkHandler } from "@/components/shell/DeepLinkHandler";
import { FullscreenPrompt } from "@/components/shell/FullscreenPrompt";
import { useSystemStore } from "@/store/system";

export function AppShell() {
  const mode = useLayoutMode();

  // Root-level hydration of user appearance preferences
  React.useEffect(() => {
    try {
      const savedWallpaper = localStorage.getItem("ubuntu_wallpaper");
      if (savedWallpaper) {
        useSystemStore.setState({ wallpaper: savedWallpaper });
      }

      const savedAccent = localStorage.getItem("ubuntu_accent");
      if (savedAccent) {
        useSystemStore.getState().setAccentColor(savedAccent);
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
