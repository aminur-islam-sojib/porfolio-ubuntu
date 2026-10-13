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
import { BootScreen } from "@/components/shell/BootScreen";
import { LockScreen } from "@/components/shell/LockScreen";
import { WelcomeModal } from "@/components/shell/WelcomeModal";
import { useSystemStore } from "@/store/system";
import { useHotkeys } from "@/hooks/useHotkeys";
import { useViewportClamping } from "@/hooks/useViewportClamping";

export function Desktop() {
  const [contextMenuPos, setContextMenuPos] = React.useState<{ x: number; y: number } | null>(
    null
  );

  const isBooting = useSystemStore((state) => state.isBooting);

  // Check initial session boot, lock status, and appearance preferences
  React.useEffect(() => {
    const hasBooted = sessionStorage.getItem("ubuntu_booted");
    if (!hasBooted) {
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

    const savedCustom = localStorage.getItem("ubuntu_custom_wallpapers");
    if (savedCustom) {
      try {
        useSystemStore.setState({ customWallpapers: JSON.parse(savedCustom) });
      } catch {}
    }
  }, []);

  const handleBootComplete = React.useCallback(() => {
    useSystemStore.getState().finishBoot();
    const isUnlocked = sessionStorage.getItem("ubuntu_unlocked");
    if (!isUnlocked) {
      useSystemStore.setState({ isLocked: true });
    }
  }, []);

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

      {/* 13. First-Visit Welcome Tour Dialog */}
      <WelcomeModal />

      {/* 14. GDM Lock Screen */}
      <LockScreen />

      {/* 15. Plymouth Boot Screen */}
      {isBooting && <BootScreen onComplete={handleBootComplete} />}
    </div>
  );
}
