"use client";

import * as React from "react";
import { useLayoutMode } from "@/hooks/useLayoutMode";
import { Wallpaper } from "@/components/shell/Wallpaper";
import { Desktop } from "@/components/shell/Desktop";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { TabletShell } from "@/components/mobile/TabletShell";
import { DeepLinkHandler } from "@/components/shell/DeepLinkHandler";

export function AppShell() {
  const mode = useLayoutMode();

  return (
    <>
      <DeepLinkHandler />
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

