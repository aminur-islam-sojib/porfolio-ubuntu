"use client";

import * as React from "react";
import { Wifi, Volume2, Power } from "lucide-react";
import Link from "next/link";
import { useSystemStore } from "@/store/system";

function subscribeToClock(callback: () => void) {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}

function getClockSnapshot(): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${dateStr}  ${timeStr}`;
}

function getServerSnapshot(): string {
  return "";
}

export interface TopBarProps {
  onActivitiesClick?: () => void;
  onQuickSettingsClick?: () => void;
}

export function TopBar({
  onActivitiesClick,
  onQuickSettingsClick,
}: TopBarProps) {
  const currentTime = React.useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getServerSnapshot
  );

  const handleActivities = () => {
    if (onActivitiesClick) {
      onActivitiesClick();
    } else {
      useSystemStore.getState().toggleActivities();
    }
  };

  const handleQuickSettings = () => {
    if (onQuickSettingsClick) {
      onQuickSettingsClick();
    } else {
      useSystemStore.getState().toggleQuickSettings();
    }
  };

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 h-[var(--topbar-height)] bg-[#111111]/95 backdrop-blur-md border-b border-white/5 z-[9998] flex items-center justify-between px-2 text-xs font-medium select-none text-white/90"
    >
      {/* Left: Activities */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleActivities}
          aria-label="Activities Overview"
          className="h-[22px] px-2.5 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ubuntu-orange)] flex items-center"
        >
          <span>Activities</span>
        </button>
      </div>

      {/* Center: Live Clock */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Notification Center and Calendar"
          className="h-[22px] px-3 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ubuntu-orange)] flex items-center text-center font-medium tabular-nums"
        >
          <span>{currentTime || "Loading..."}</span>
        </button>
      </div>

      {/* Right: Quick Settings Pill & Dev Link */}
      <div className="flex items-center gap-1.5">
        <Link
          href="/dev/tokens"
          aria-label="Design Tokens"
          className="hidden sm:inline-flex h-[20px] items-center px-2 rounded-full bg-white/5 hover:bg-white/15 text-[10px] text-white/70 transition-colors mr-1"
        >
          Tokens
        </Link>

        <button
          type="button"
          onClick={handleQuickSettings}
          aria-label="Quick Settings menu"
          className="h-[22px] px-2 rounded-full bg-white/5 hover:bg-white/15 active:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ubuntu-orange)] flex items-center gap-2"
        >
          <Wifi className="w-3.5 h-3.5 text-white/90" />
          <Volume2 className="w-3.5 h-3.5 text-white/90" />
          <Power className="w-3.5 h-3.5 text-white/90" />
        </button>
      </div>
    </header>
  );
}
