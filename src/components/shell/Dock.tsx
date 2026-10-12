"use client";

import * as React from "react";
import { APP_REGISTRY, AppMetadata } from "@/apps/registry";
import { AppIcon } from "@/components/shell/AppIcon";
import { Tooltip } from "@/components/ui/Tooltip";
import { useWindowStore } from "@/store/windows";
import { useSystemStore } from "@/store/system";
import { cn } from "@/lib/cn";

export interface DockProps {
  onShowApplicationsClick?: () => void;
}

export function Dock({ onShowApplicationsClick }: DockProps) {
  // Fine-grained subscriptions with stable array reference
  const activeAppIds = useWindowStore((state) => state.openWindowIds);
  const focusedAppId = useWindowStore((state) => state.activeId);

  const pinnedApps = Object.values(APP_REGISTRY).filter(
    (app) => app.isPinned && app.id !== "trash"
  );
  const trashApp = APP_REGISTRY.trash;

  const handleAppClick = (appId: string) => {
    useWindowStore.getState().toggleWindow(appId);
  };

  return (
    <aside
      role="toolbar"
      aria-label="Ubuntu Dock"
      className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-[9990] flex items-center gap-1.5 bg-[#101010]/85 backdrop-blur-2xl border border-white/10 rounded-2xl px-2.5 py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.65)] select-none"
    >
      {/* Pinned Applications */}
      <div className="flex items-center gap-1.5">
        {pinnedApps.map((app: AppMetadata) => {
          const isRunning = activeAppIds.includes(app.id);
          const isFocused = focusedAppId === app.id;

          return (
            <Tooltip key={app.id} content={app.title} position="top">
              <button
                type="button"
                onClick={() => handleAppClick(app.id)}
                aria-label={`Launch ${app.title}`}
                className={cn(
                  "relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] group",
                  isFocused
                    ? "bg-white/15 shadow-inner"
                    : "hover:bg-white/10 active:bg-white/20"
                )}
              >
                {/* Ubuntu Running Indicator (Orange dot / pill beneath icon) */}
                {isRunning && (
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--ubuntu-orange)] shadow-[0_0_8px_var(--ubuntu-orange)] transition-all",
                      isFocused ? "w-3 h-1.5" : ""
                    )}
                  />
                )}

                <AppIcon
                  id={app.id}
                  size={38}
                  className="group-hover:scale-105 group-active:scale-95 transition-transform"
                />
              </button>
            </Tooltip>
          );
        })}
      </div>

      {/* Subtle Divider */}
      <div className="w-[1px] h-7 bg-white/15 mx-1 shrink-0" />

      {/* Utilities: Trash & Show Applications */}
      <div className="flex items-center gap-1.5">
        {trashApp && (
          <Tooltip content={trashApp.title} position="top">
            <button
              type="button"
              onClick={() => handleAppClick(trashApp.id)}
              aria-label="Open Trash"
              className={cn(
                "relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] group",
                focusedAppId === "trash"
                  ? "bg-white/15 shadow-inner"
                  : "hover:bg-white/10 active:bg-white/20"
              )}
            >
              {activeAppIds.includes("trash") && (
                <span
                  className={cn(
                    "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--ubuntu-orange)] shadow-[0_0_8px_var(--ubuntu-orange)] transition-all",
                    focusedAppId === "trash" ? "w-3 h-1.5" : ""
                  )}
                />
              )}
              <AppIcon
                id="trash"
                size={38}
                className="group-hover:scale-105 group-active:scale-95 transition-transform"
              />
            </button>
          </Tooltip>
        )}

        <Tooltip content="Show Applications" position="top">
          <button
            type="button"
            onClick={() => {
              if (onShowApplicationsClick) {
                onShowApplicationsClick();
              } else {
                useSystemStore.getState().toggleAppGrid();
              }
            }}
            aria-label="Show Applications"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] group"
          >
            <AppIcon
              id="apps"
              size={38}
              className="group-hover:scale-105 group-active:scale-95 transition-transform"
            />
          </button>
        </Tooltip>
      </div>
    </aside>
  );
}
