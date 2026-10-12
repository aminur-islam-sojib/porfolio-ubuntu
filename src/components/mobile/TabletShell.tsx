"use client";

import * as React from "react";
import { Columns, X, Minus, SplitSquareHorizontal } from "lucide-react";
import { Wallpaper } from "@/components/shell/Wallpaper";
import { TopBar } from "@/components/shell/TopBar";
import { QuickSettings } from "@/components/shell/QuickSettings";
import { Activities } from "@/components/shell/Activities";
import { AppGrid } from "@/components/shell/AppGrid";
import { BootScreen } from "@/components/shell/BootScreen";
import { LockScreen } from "@/components/shell/LockScreen";
import { WelcomeModal } from "@/components/shell/WelcomeModal";
import { NotificationToast } from "@/components/shell/NotificationToast";
import { AppIcon } from "@/components/shell/AppIcon";
import { APP_REGISTRY, AppMetadata } from "@/apps/registry";
import { useWindowStore } from "@/store/windows";
import { useSystemStore } from "@/store/system";
import { profileData } from "@/data/profile";

export function TabletShell() {
  const openWindowIds = useWindowStore((state) => state.openWindowIds);
  const activeId = useWindowStore((state) => state.activeId);
  const openWindow = useWindowStore((state) => state.openWindow);
  const closeWindow = useWindowStore((state) => state.closeWindow);

  const isBooting = useSystemStore((state) => state.isBooting);
  const finishBoot = useSystemStore((state) => state.finishBoot);

  const [isSplitMode, setIsSplitMode] = React.useState(false);
  const [splitSecondaryId, setSplitSecondaryId] = React.useState<string | null>(null);

  const primaryId = activeId || (openWindowIds.length > 0 ? openWindowIds[0] : null);
  const secondaryId = splitSecondaryId || (openWindowIds.find((id) => id !== primaryId) ?? null);

  const handleOpenApp = (id: string) => {
    openWindow(id);
    if (isSplitMode && primaryId && id !== primaryId) {
      setSplitSecondaryId(id);
    }
  };

  const toggleSplit = () => {
    if (!isSplitMode) {
      const candidate = openWindowIds.find((id) => id !== primaryId) || "projects";
      if (!openWindowIds.includes(candidate)) {
        openWindow(candidate);
      }
      setSplitSecondaryId(candidate);
      setIsSplitMode(true);
    } else {
      setIsSplitMode(false);
    }
  };

  const allApps = Object.values(APP_REGISTRY);
  const pinnedApps = allApps.filter((a) => a.isPinned);

  const PrimaryMeta = primaryId ? APP_REGISTRY[primaryId] : null;
  const PrimaryComp = PrimaryMeta?.component;

  const SecondaryMeta = secondaryId ? APP_REGISTRY[secondaryId] : null;
  const SecondaryComp = SecondaryMeta?.component;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#111111] text-white flex flex-col select-none font-sans">
      <Wallpaper />
      <TopBar />

      {/* Main Tablet Workspace */}
      <main className="relative flex-1 w-full pt-[30px] pb-20 px-3 flex gap-3 overflow-hidden">
        {primaryId && PrimaryMeta && PrimaryComp ? (
          <>
            {/* Primary Window Pane */}
            <section
              aria-label={PrimaryMeta.title}
              className={`flex-1 h-full rounded-2xl bg-[#1E1E1E] border border-white/15 shadow-2xl flex flex-col overflow-hidden transition-all ${
                isSplitMode && secondaryId ? "w-1/2" : "w-full"
              }`}
            >
              {/* Touch Title Bar (minimum 44px hit targets) */}
              <div className="h-11 px-3 bg-[#252525] border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 truncate">
                  <AppIcon id={PrimaryMeta.id} size={22} />
                  <span className="text-xs font-semibold truncate">{PrimaryMeta.title}</span>
                </div>

                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={toggleSplit}
                    aria-label="Toggle split view"
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Columns className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => useWindowStore.getState().minimizeWindow(PrimaryMeta.id)}
                    aria-label="Minimize"
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => closeWindow(PrimaryMeta.id)}
                    aria-label="Close"
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden touch-pan-y">
                <PrimaryComp />
              </div>
            </section>

            {/* Split Screen Secondary Pane */}
            {isSplitMode && secondaryId && SecondaryMeta && SecondaryComp && (
              <section
                aria-label={SecondaryMeta.title}
                className="w-1/2 h-full rounded-2xl bg-[#1E1E1E] border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-200"
              >
                <div className="h-11 px-3 bg-[#252525] border-b border-white/10 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2 truncate">
                    <AppIcon id={SecondaryMeta.id} size={22} />
                    <span className="text-xs font-semibold truncate">{SecondaryMeta.title}</span>
                  </div>

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setIsSplitMode(false)}
                      aria-label="Exit split view"
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                    >
                      <SplitSquareHorizontal className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => closeWindow(SecondaryMeta.id)}
                      aria-label="Close secondary pane"
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden touch-pan-y">
                  <SecondaryComp />
                </div>
              </section>
            )}
          </>
        ) : (
          /* Empty Workspace State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-20 h-20 rounded-full bg-[var(--ubuntu-orange)]/20 border border-[var(--ubuntu-orange)]/30 flex items-center justify-center shadow-xl">
              <span className="text-3xl font-bold text-[var(--ubuntu-orange)]">
                {profileData.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
              <p className="text-sm text-zinc-300">{profileData.title}</p>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">
              Tap any app on the bottom dock to begin exploring the interactive portfolio.
            </p>
          </div>
        )}
      </main>

      {/* Bottom Tablet Dock */}
      <nav
        aria-label="Tablet Dock"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 rounded-2xl bg-black/50 backdrop-blur-2xl border border-white/15 px-3 py-1.5 flex items-center gap-2 shadow-2xl"
      >
        {pinnedApps.map((app: AppMetadata) => {
          const isOpen = openWindowIds.includes(app.id);
          const isCurrent = primaryId === app.id || (isSplitMode && secondaryId === app.id);
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => handleOpenApp(app.id)}
              aria-label={app.title}
              className={`min-w-[48px] min-h-[48px] p-1.5 rounded-xl flex items-center justify-center relative hover:bg-white/10 active:scale-95 transition-all ${
                isCurrent ? "bg-white/15 ring-2 ring-[var(--ubuntu-orange)]/60" : ""
              }`}
            >
              <AppIcon id={app.id} size={42} />
              {isOpen && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--ubuntu-orange)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Shell Overlays */}
      <QuickSettings />
      <Activities />
      <AppGrid />
      <NotificationToast />
      <WelcomeModal />
      <LockScreen />
      {isBooting && <BootScreen onComplete={finishBoot} />}
    </div>
  );
}

