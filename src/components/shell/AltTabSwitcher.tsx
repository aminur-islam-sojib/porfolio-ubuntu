"use client";

import * as React from "react";
import { useWindowStore } from "@/store/windows";
import { APP_REGISTRY } from "@/apps/registry";
import { AppIcon } from "@/components/shell/AppIcon";
import { cn } from "@/lib/cn";

export function AltTabSwitcher() {
  const isSwitcherOpen = useWindowStore((state) => state.isSwitcherOpen);
  const switcherIndex = useWindowStore((state) => state.switcherIndex);
  const mruOrder = useWindowStore((state) => state.mruOrder);
  const windows = useWindowStore((state) => state.windows);

  // Filter only open windows in MRU order
  const openAppIds = React.useMemo(() => {
    return mruOrder.filter((id) => windows[id]?.isOpen);
  }, [mruOrder, windows]);

  if (!isSwitcherOpen || openAppIds.length === 0) {
    return null;
  }

  const selectedId = openAppIds[switcherIndex % openAppIds.length] || openAppIds[0];
  const selectedApp = APP_REGISTRY[selectedId];

  return (
    <div
      role="dialog"
      aria-label="Application Switcher"
      className="fixed inset-0 z-[99990] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm select-none animate-in fade-in duration-100"
      onClick={() => useWindowStore.getState().commitSwitcher()}
    >
      <div
        className="bg-[#1E1E1E]/95 border border-white/15 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col items-center gap-4 max-w-[90vw] overflow-x-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Switcher App Tiles */}
        <div className="flex items-center gap-3">
          {openAppIds.map((id, idx) => {
            const app = APP_REGISTRY[id];
            const isSelected = idx === (switcherIndex % openAppIds.length);

            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  useWindowStore.getState().setSwitcherIndex(idx);
                  useWindowStore.getState().commitSwitcher();
                }}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-100 min-w-[84px] focus:outline-none",
                  isSelected
                    ? "bg-white/20 ring-2 ring-[var(--ubuntu-orange)] shadow-lg scale-105"
                    : "hover:bg-white/10 opacity-70 hover:opacity-100"
                )}
              >
                <AppIcon id={id} size={48} className="mb-2" />
                <span className="text-xs font-medium text-white truncate max-w-[80px]">
                  {app?.title || id}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected App Label */}
        {selectedApp && (
          <div className="text-center pt-1 border-t border-white/10 w-full">
            <span className="text-sm font-semibold text-white">
              {selectedApp.title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

