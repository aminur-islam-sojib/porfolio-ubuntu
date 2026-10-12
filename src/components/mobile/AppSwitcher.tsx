"use client";

import * as React from "react";
import { X, Trash2, ArrowLeft } from "lucide-react";
import { APP_REGISTRY } from "@/apps/registry";
import { AppIcon } from "@/components/shell/AppIcon";

export interface AppSwitcherProps {
  openAppIds: string[];
  activeAppId: string | null;
  onSelectApp: (appId: string) => void;
  onCloseApp: (appId: string) => void;
  onCloseAll: () => void;
  onCloseSwitcher: () => void;
}

export function AppSwitcher({
  openAppIds,
  activeAppId,
  onSelectApp,
  onCloseApp,
  onCloseAll,
  onCloseSwitcher,
}: AppSwitcherProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseSwitcher();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCloseSwitcher]);

  return (
    <div
      role="dialog"
      aria-label="Application Switcher"
      className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl flex flex-col justify-between p-4 select-none animate-in fade-in duration-200"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 text-white border-b border-white/10">
        <button
          type="button"
          onClick={onCloseSwitcher}
          className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <span className="text-xs font-semibold">Active Applications ({openAppIds.length})</span>

        {openAppIds.length > 0 ? (
          <button
            type="button"
            onClick={onCloseAll}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        ) : (
          <div className="w-12" />
        )}
      </div>

      {/* Main Card Carousel */}
      <div className="flex-1 flex items-center justify-center overflow-x-auto py-6">
        {openAppIds.length === 0 ? (
          <div className="text-center space-y-2 text-zinc-400">
            <p className="text-sm">No running applications</p>
            <button
              type="button"
              onClick={onCloseSwitcher}
              className="px-4 py-2 rounded-xl bg-[var(--ubuntu-orange)] text-xs text-white font-medium hover:bg-[#ff6d38] transition-colors"
            >
              Open an App from Home
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 px-4 overflow-x-auto max-w-full snap-x snap-mandatory py-4">
            {openAppIds.map((id) => {
              const meta = APP_REGISTRY[id];
              if (!meta) return null;
              const isCurrent = id === activeAppId;

              return (
                <div
                  key={id}
                  className={`w-60 sm:w-64 h-84 shrink-0 rounded-2xl bg-[#1E1E1E] border flex flex-col overflow-hidden shadow-2xl snap-center transition-all ${
                    isCurrent
                      ? "border-[var(--ubuntu-orange)] ring-2 ring-[var(--ubuntu-orange)]/40 scale-105"
                      : "border-white/15 hover:border-white/30"
                  }`}
                >
                  {/* Card Title Bar */}
                  <div className="h-10 px-3 bg-[#2C2C2C] border-b border-white/10 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2 truncate">
                      <AppIcon id={id} size={20} />
                      <span className="text-xs font-semibold truncate">{meta.title}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseApp(id);
                      }}
                      aria-label={`Close ${meta.title}`}
                      className="w-6 h-6 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Body / Tap to activate */}
                  <button
                    type="button"
                    onClick={() => onSelectApp(id)}
                    className="flex-1 p-4 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#1E1E1E] to-[#141414] hover:bg-white/5 transition-colors cursor-pointer text-center w-full"
                  >
                    <AppIcon id={id} size={56} className="shadow-lg" />
                    <span className="text-xs text-zinc-300">Tap to resume</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="text-center py-2 text-[11px] text-zinc-500">
        Tap a card to switch apps • Swipe or tap X to close
      </div>
    </div>
  );
}
