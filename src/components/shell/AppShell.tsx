"use client";

import * as React from "react";
import { useLayoutMode } from "@/hooks/useLayoutMode";
import { Wallpaper } from "@/components/shell/Wallpaper";
import { Desktop } from "@/components/shell/Desktop";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { TabletShell } from "@/components/mobile/TabletShell";

export function AppShell() {
  const mode = useLayoutMode();

  // Guard against SSR hydration mismatches and layout flashes
  if (mode === null) {
    return (
      <div className="fixed inset-0 bg-[#111111] overflow-hidden select-none">
        <Wallpaper />
      </div>
    );
  }

  if (mode === "phone") {
    return <PhoneShell />;
  }

  if (mode === "tablet") {
    return <TabletShell />;
  }

  return <Desktop />;
}

