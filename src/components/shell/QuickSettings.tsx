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
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useIsFullscreen, toggleFullscreen } from "@/lib/fullscreen";

export function QuickSettings() {
  const isFullscreen = useIsFullscreen();
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
      className="fixed top-[34px] right-2 z-[99990] w-80 rounded-2xl bg-[var(--color-card-bg)]/95 backdrop-blur-xl border border-[var(--color-border-subtle)] shadow-[var(--shadow-popover)] p-4 space-y-4 select-none animate-in fade-in zoom-in-95 duration-150 text-[var(--color-text-primary)]"
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
              : "bg-[var(--color-input-bg)] hover:bg-[var(--color-card-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)]"
          )}
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5 shrink-0 text-white" />
          ) : (
            <Moon className="w-5 h-5 shrink-0 text-[var(--color-text-secondary)]" />
          )}
          <div className="truncate">
            <span className="text-xs font-semibold block leading-tight">Theme</span>
            <span className="text-[10px] text-[var(--color-text-muted)] block capitalize">
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
          className="h-12 px-3 rounded-xl bg-[var(--color-input-bg)] hover:bg-[var(--color-card-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] flex items-center gap-3 transition-colors text-left"
        >
          <Wifi className="w-5 h-5 shrink-0 text-[var(--ubuntu-orange)]" />
          <div className="truncate">
            <span className="text-xs font-semibold block leading-tight">Wi-Fi</span>
            <span className="text-[10px] text-[var(--color-text-muted)] block truncate">Connected</span>
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
          className="h-12 px-3 rounded-xl bg-[var(--color-input-bg)] hover:bg-[var(--color-card-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] flex items-center gap-3 transition-colors text-left"
        >
          <Bluetooth className="w-5 h-5 shrink-0 text-sky-400" />
          <div className="truncate">
            <span className="text-xs font-semibold block leading-tight">Bluetooth</span>
            <span className="text-[10px] text-[var(--color-text-muted)] block truncate">Active</span>
          </div>
        </button>

        {/* Night Light Pill */}
        <button
          type="button"
          onClick={() => setNightLight(!nightLight)}
          className={cn(
            "h-12 px-3 rounded-xl flex items-center gap-3 transition-colors text-left",
            nightLight
              ? "bg-amber-600/30 text-amber-500 border border-amber-500/40"
              : "bg-[var(--color-input-bg)] hover:bg-[var(--color-card-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)]"
          )}
        >
          <Eye className="w-5 h-5 shrink-0" />
          <div className="truncate">
            <span className="text-xs font-semibold block leading-tight">Night Light</span>
            <span className="text-[10px] text-[var(--color-text-muted)] block truncate">
              {nightLight ? "On" : "Off"}
            </span>
          </div>
        </button>

        {/* Fullscreen Pill */}
        <button
          type="button"
          onClick={() => toggleFullscreen()}
          className={cn(
            "h-12 px-3 rounded-xl flex items-center gap-3 transition-colors text-left",
            isFullscreen
              ? "bg-[var(--ubuntu-orange)] text-white shadow-sm"
              : "bg-[var(--color-input-bg)] hover:bg-[var(--color-card-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)]"
          )}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 shrink-0 text-white" />
          ) : (
            <Maximize2 className="w-5 h-5 shrink-0 text-amber-400" />
          )}
          <div className="truncate">
            <span className="text-xs font-semibold block leading-tight">Fullscreen</span>
            <span className="text-[10px] text-[var(--color-text-muted)] block truncate">
              {isFullscreen ? "On (F11)" : "Off (F11)"}
            </span>
          </div>
        </button>
      </div>

      {/* 2. Sliders */}
      <div className="space-y-3 pt-2 border-t border-[var(--color-border-subtle)]">
        {/* Volume */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => useSystemStore.getState().setVolume(volume > 0 ? 0 : 75)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
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
          <Sun className="w-4 h-4 text-[var(--color-text-muted)]" />
          <Slider
            value={brightness}
            onChange={setBrightness}
            aria-label="Screen brightness slider"
          />
        </div>
      </div>

      {/* 3. Bottom Utility Bar */}
      <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[var(--color-text-muted)]">
        <button
          type="button"
          onClick={() => {
            useWindowStore.getState().openWindow("settings");
            useSystemStore.getState().setQuickSettingsOpen(false);
          }}
          aria-label="Open Settings"
          className="p-2 rounded-lg hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            useSystemStore.getState().lockScreen();
          }}
          aria-label="Lock screen"
          className="p-2 rounded-lg hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <Lock className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            useSystemStore.getState().reboot();
          }}
          aria-label="Restart system"
          className="p-2 rounded-lg hover:bg-[var(--color-card-hover)] hover:text-red-400 transition-colors"
        >
          <Power className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

