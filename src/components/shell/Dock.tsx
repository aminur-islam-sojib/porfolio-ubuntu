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
      className="fixed top-[var(--topbar-height)] left-0 bottom-0 w-[var(--dock-width)] bg-[#101010]/90 backdrop-blur-lg border-r border-white/5 z-[9990] flex flex-col items-center justify-between py-2 select-none"
    >
      {/* Top / Pinned Apps */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        {pinnedApps.map((app: AppMetadata) => {
          const isRunning = activeAppIds.includes(app.id);
          const isFocused = focusedAppId === app.id;

          return (
            <Tooltip key={app.id} content={app.title} position="right">
              <button
                type="button"
                onClick={() => handleAppClick(app.id)}
                aria-label={`Launch ${app.title}`}
                className={cn(
                  "relative w-12 h-12 rounded-[10px] flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] group",
                  isFocused
                    ? "bg-white/15 shadow-inner"
                    : "hover:bg-white/10 active:bg-white/20"
                )}
              >
                {/* Ubuntu Running Indicator (Orange dot / pill on the left) */}
                {isRunning && (
                  <span
                    className={cn(
                      "absolute -left-1 w-1.5 h-1.5 rounded-full bg-[var(--ubuntu-orange)] transition-all",
                      isFocused ? "h-3 -left-1 rounded-r-full" : ""
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

      {/* Bottom: Trash & Show Applications */}
      <div className="flex flex-col items-center gap-1.5 w-full pt-2 border-t border-white/10">
        {trashApp && (
          <Tooltip content={trashApp.title} position="right">
            <button
              type="button"
              onClick={() => handleAppClick(trashApp.id)}
              aria-label="Open Trash"
              className={cn(
                "relative w-12 h-12 rounded-[10px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] group",
                focusedAppId === "trash"
                  ? "bg-white/15 shadow-inner"
                  : "hover:bg-white/10 active:bg-white/20"
              )}
            >
              {activeAppIds.includes("trash") && (
                <span
                  className={cn(
                    "absolute -left-1 w-1.5 h-1.5 rounded-full bg-[var(--ubuntu-orange)] transition-all",
                    focusedAppId === "trash" ? "h-3 -left-1 rounded-r-full" : ""
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

        <Tooltip content="Show Applications" position="right">
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
            className="w-12 h-12 rounded-[10px] flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] group"
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
