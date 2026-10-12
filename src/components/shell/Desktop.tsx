"use client";

import * as React from "react";
import { Wallpaper } from "@/components/shell/Wallpaper";
import { TopBar } from "@/components/shell/TopBar";
import { Dock } from "@/components/shell/Dock";
import { DesktopIcons } from "@/components/shell/DesktopIcons";
import { SnapPreview } from "@/components/shell/SnapPreview";
import { AltTabSwitcher } from "@/components/shell/AltTabSwitcher";
import { Activities } from "@/components/shell/Activities";
import { AppGrid } from "@/components/shell/AppGrid";
import { QuickSettings } from "@/components/shell/QuickSettings";
import { NotificationToast } from "@/components/shell/NotificationToast";
import { ContextMenu } from "@/components/shell/ContextMenu";
import { WindowManager } from "@/components/window/WindowManager";
import { useHotkeys } from "@/hooks/useHotkeys";
import { useViewportClamping } from "@/hooks/useViewportClamping";

export function Desktop() {
  const [contextMenuPos, setContextMenuPos] = React.useState<{ x: number; y: number } | null>(
    null
  );

  // Activate global keyboard hotkeys & viewport resize clamping
  useHotkeys();
  useViewportClamping();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className="relative h-screen w-screen overflow-hidden select-none bg-[#111111] text-white font-sans"
    >
      {/* 1. Wallpaper */}
      <Wallpaper />

      {/* 2. Top Bar */}
      <TopBar />

      {/* 3. Ubuntu Dock */}
      <Dock />

      {/* 4. Desktop Icons & Rubber-Band Marquee Selection */}
      <DesktopIcons />

      {/* 5. Snap Preview Overlay */}
      <SnapPreview />

      {/* 6. Alt + Tab Application Switcher */}
      <AltTabSwitcher />

      {/* 7. Activities Overview */}
      <Activities />

      {/* 8. Show Applications Drawer */}
      <AppGrid />

      {/* 9. QuickSettings Menu */}
      <QuickSettings />

      {/* 10. System Notification Toast */}
      <NotificationToast />

      {/* 11. Right-Click Context Menu */}
      {contextMenuPos && (
        <ContextMenu
          x={contextMenuPos.x}
          y={contextMenuPos.y}
          onClose={() => setContextMenuPos(null)}
        />
      )}

      {/* 12. Window Manager Surface */}
      <WindowManager />
    </div>
  );
}
