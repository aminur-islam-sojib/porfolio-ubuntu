"use client";

import * as React from "react";
import { useSystemStore } from "@/store/system";
import { useWindowStore } from "@/store/windows";
import { Slider } from "@/components/ui/Slider";
import {
  Wifi,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Bluetooth,
  Settings,
  Lock,
  Power,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/cn";

export function QuickSettings() {
  const isQuickSettingsOpen = useSystemStore((state) => state.isQuickSettingsOpen);
  const theme = useSystemStore((state) => state.theme);
  const volume = useSystemStore((state) => state.volume);
  const [brightness, setBrightness] = React.useState(85);
  const [nightLight, setNightLight] = React.useState(false);

  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isQuickSettingsOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        useSystemStore.getState().setQuickSettingsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        useSystemStore.getState().setQuickSettingsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQuickSettingsOpen]);

  if (!isQuickSettingsOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Quick Settings"
      className="fixed top-[34px] right-2 z-[99990] w-80 rounded-2xl bg-[#1E1E1E]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-4 space-y-4 select-none animate-in fade-in zoom-in-95 duration-150 text-white"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Quick Toggles Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Dark/Light Mode Pill */}
        <button
          type="button"
          onClick={() => useSystemStore.getState().toggleTheme()}
          className={cn(
            "h-12 px-3 rounded-xl flex items-center gap-3 transition-colors text-left",
            theme === "light"
              ? "bg-[var(--ubuntu-orange)] text-white shadow-sm"
              : "bg-white/10 hover:bg-white/15 text-zinc-200"
          )}
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5 shrink-0 text-white" />
          ) : (
            <Moon className="w-5 h-5 shrink-0 text-zinc-300" />
          )}
          <div className="truncate">
            <span className="text-xs font-semibold block leading-tight">Theme</span>
            <span className="text-[10px] text-zinc-300 block capitalize">
              {theme === "light" ? "Light" : "Dark"}
            </span>
          </div>
        </button>

        {/* Wi-Fi Pill */}
        <button
          type="button"
          onClick={() => {
            useSystemStore.getState().addNotification({
              title: "Network",
              message: "Connected to Wi-Fi: Ubuntu-HighSpeed-Mesh (5 GHz)",
            });
          }}
          className="h-12 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 flex items-center gap-3 transition-colors text-left"
        >
          <Wifi className="w-5 h-5 shrink-0 text-[var(--ubuntu-orange)]" />
          <div className="truncate">
            <span className="text-xs font-semibold block leading-tight">Wi-Fi</span>
            <span className="text-[10px] text-zinc-400 block truncate">Connected</span>
          </div>
        </button>

        {/* Bluetooth Pill */}
        <button
          type="button"
          onClick={() => {
            useSystemStore.getState().addNotification({
              title: "Bluetooth",
              message: "Bluetooth active (Ready for wireless accessories)",
            });
          }}
          className="h-12 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 flex items-center gap-3 transition-colors text-left"
        >
          <Bluetooth className="w-5 h-5 shrink-0 text-sky-400" />
          <div className="truncate">
            <span className="text-xs font-semibold block leading-tight">Bluetooth</span>
            <span className="text-[10px] text-zinc-400 block truncate">Active</span>
          </div>
        </button>

        {/* Night Light Pill */}
        <button
          type="button"
          onClick={() => setNightLight(!nightLight)}
          className={cn(
            "h-12 px-3 rounded-xl flex items-center gap-3 transition-colors text-left",
            nightLight
              ? "bg-amber-600/40 text-amber-300 border border-amber-500/30"
              : "bg-white/10 hover:bg-white/15 text-zinc-200"
          )}
        >
          <Eye className="w-5 h-5 shrink-0" />
          <div className="truncate">
            <span className="text-xs font-semibold block leading-tight">Night Light</span>
            <span className="text-[10px] text-zinc-400 block truncate">
              {nightLight ? "On" : "Off"}
            </span>
          </div>
        </button>
      </div>

      {/* 2. Sliders */}
      <div className="space-y-3 pt-2 border-t border-white/10">
        {/* Volume */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => useSystemStore.getState().setVolume(volume > 0 ? 0 : 75)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            {volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <Slider
            value={volume}
            onChange={(val) => useSystemStore.getState().setVolume(val)}
            aria-label="Volume slider"
          />
        </div>

        {/* Brightness */}
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-zinc-400" />
          <Slider
            value={brightness}
            onChange={setBrightness}
            aria-label="Screen brightness slider"
          />
        </div>
      </div>

      {/* 3. Bottom Utility Bar */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-zinc-400">
        <button
          type="button"
          onClick={() => {
            useWindowStore.getState().openWindow("settings");
            useSystemStore.getState().setQuickSettingsOpen(false);
          }}
          aria-label="Open Settings"
          className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            useSystemStore.getState().addNotification({
              title: "Security",
              message: "Desktop locked. Press any key to return.",
            });
            useSystemStore.getState().setQuickSettingsOpen(false);
          }}
          aria-label="Lock screen"
          className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
        >
          <Lock className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            useSystemStore.getState().addNotification({
              title: "Power",
              message: "Power options: Suspend, Restart, or Shut Down.",
            });
            useSystemStore.getState().setQuickSettingsOpen(false);
          }}
          aria-label="Power options"
          className="p-2 rounded-lg hover:bg-white/10 hover:text-red-400 transition-colors"
        >
          <Power className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
