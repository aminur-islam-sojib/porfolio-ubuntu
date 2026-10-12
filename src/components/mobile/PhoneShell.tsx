"use client";

import * as React from "react";
import { ChevronLeft, Layers, X } from "lucide-react";
import { Wallpaper } from "@/components/shell/Wallpaper";
import { StatusBar } from "@/components/mobile/StatusBar";
import { HomeGrid } from "@/components/mobile/HomeGrid";
import { AppSwitcher } from "@/components/mobile/AppSwitcher";
import { BootScreen } from "@/components/shell/BootScreen";
import { LockScreen } from "@/components/shell/LockScreen";
import { WelcomeModal } from "@/components/shell/WelcomeModal";
import { AppIcon } from "@/components/shell/AppIcon";
import { APP_REGISTRY } from "@/apps/registry";
import { useWindowStore } from "@/store/windows";
import { useSystemStore } from "@/store/system";

export function PhoneShell() {
  const openWindowIds = useWindowStore((state) => state.openWindowIds);
  const activeId = useWindowStore((state) => state.activeId);
  const openWindow = useWindowStore((state) => state.openWindow);
  const closeWindow = useWindowStore((state) => state.closeWindow);

  const isBooting = useSystemStore((state) => state.isBooting);
  const finishBoot = useSystemStore((state) => state.finishBoot);

  const [activeAppId, setActiveAppId] = React.useState<string | null>(() => activeId || null);
  const [isSwitcherOpen, setIsSwitcherOpen] = React.useState(false);

  const handleOpenApp = (id: string) => {
    openWindow(id);
    setActiveAppId(id);
    setIsSwitcherOpen(false);
  };

  const handleCloseActiveApp = () => {
    if (activeAppId) {
      closeWindow(activeAppId);
    }
    setActiveAppId(null);
  };

  const handleCloseSpecificApp = (id: string) => {
    closeWindow(id);
    if (activeAppId === id) {
      const remaining = openWindowIds.filter((wId) => wId !== id);
      setActiveAppId(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const handleCloseAll = () => {
    openWindowIds.forEach((id) => closeWindow(id));
    setActiveAppId(null);
    setIsSwitcherOpen(false);
  };

  const activeMetadata = activeAppId ? APP_REGISTRY[activeAppId] : null;
  const ActiveComponent = activeMetadata?.component;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#111111] text-white flex flex-col select-none font-sans">
      {/* 1. Ubuntu Wallpaper */}
      <Wallpaper />

      {/* 2. Top Mobile Status Bar */}
      <StatusBar />

      {/* 3. Main Workspace Area */}
      <div className="relative flex-1 w-full overflow-hidden flex flex-col">
        {/* If an app is active, render fullscreen presentation */}
        {activeMetadata && ActiveComponent ? (
          <div className="absolute inset-0 z-10 flex flex-col bg-[#1E1E1E] animate-in slide-in-from-bottom-6 duration-200">
            {/* Mobile App Header */}
            <div className="h-11 px-3 bg-[#252525] border-b border-white/10 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setActiveAppId(null)}
                className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Back to home"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-medium">Home</span>
              </button>

              <div className="flex items-center gap-1.5 truncate max-w-[160px]">
                <AppIcon id={activeMetadata.id} size={18} />
                <span className="text-xs font-semibold truncate">{activeMetadata.title}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsSwitcherOpen(true)}
                  aria-label="Open App Switcher"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCloseActiveApp}
                  aria-label="Close Application"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile App Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden touch-pan-y overscroll-contain">
              <ActiveComponent />
            </div>
          </div>
        ) : (
          /* When no app is active, render HomeGrid */
          <HomeGrid onOpenApp={handleOpenApp} openAppIds={openWindowIds} />
        )}
      </div>

      {/* 4. Bottom Gesture Pill Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="h-6 w-full flex items-center justify-center shrink-0 z-30 bg-black/40 backdrop-blur-md cursor-pointer select-none"
        onClick={() => {
          if (activeAppId) {
            setActiveAppId(null);
          } else {
            setIsSwitcherOpen(true);
          }
        }}
      >
        <div className="w-28 h-1 rounded-full bg-white/40 hover:bg-white/70 active:scale-95 transition-all" />
      </nav>

      {/* 5. Mobile App Switcher Overlay */}
      {isSwitcherOpen && (
        <AppSwitcher
          openAppIds={openWindowIds}
          activeAppId={activeAppId}
          onSelectApp={(id) => {
            setActiveAppId(id);
            setIsSwitcherOpen(false);
          }}
          onCloseApp={handleCloseSpecificApp}
          onCloseAll={handleCloseAll}
          onCloseSwitcher={() => setIsSwitcherOpen(false)}
        />
      )}

      {/* 6. Overlays */}
      <WelcomeModal />
      <LockScreen />
      {isBooting && <BootScreen onComplete={finishBoot} />}
    </div>
  );
}
