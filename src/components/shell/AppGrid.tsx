"use client";

import * as React from "react";
import { useSystemStore } from "@/store/system";
import { useWindowStore } from "@/store/windows";
import { APP_REGISTRY, AppMetadata } from "@/apps/registry";
import { AppIcon } from "@/components/shell/AppIcon";

export function AppGrid() {
  const isAppGridOpen = useSystemStore((state) => state.isAppGridOpen);

  React.useEffect(() => {
    if (!isAppGridOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        useSystemStore.getState().setAppGridOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAppGridOpen]);

  if (!isAppGridOpen) return null;

  const handleOpenApp = (id: string) => {
    useWindowStore.getState().openWindow(id);
    useSystemStore.getState().setAppGridOpen(false);
  };

  const allApps = Object.values(APP_REGISTRY);

  return (
    <div
      role="dialog"
      aria-label="Applications Drawer"
      className="fixed inset-0 z-[9995] bg-black/75 backdrop-blur-2xl flex flex-col items-center justify-center p-8 select-none animate-in fade-in duration-150 text-white"
      onClick={() => useSystemStore.getState().setAppGridOpen(false)}
    >
      <div
        className="w-full max-w-3xl flex flex-col items-center space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
          {allApps.map((app: AppMetadata) => (
            <button
              key={app.id}
              type="button"
              onClick={() => handleOpenApp(app.id)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-white/10 active:bg-white/15 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] w-24"
            >
              <AppIcon
                id={app.id}
                size={54}
                className="mb-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-medium text-white truncate max-w-[90px] text-center">
                {app.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

