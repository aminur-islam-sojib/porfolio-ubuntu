"use client";

import * as React from "react";
import { Wifi, Battery, Signal } from "lucide-react";

function subscribeToClock(callback: () => void) {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}

function getMobileTime(): string {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getEmptySnapshot(): string {
  return "";
}

export function StatusBar() {
  const time = React.useSyncExternalStore(
    subscribeToClock,
    getMobileTime,
    getEmptySnapshot
  );

  return (
    <header
      role="banner"
      aria-label="Mobile Status Bar"
      className="h-7 w-full px-4 flex items-center justify-between text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-md select-none shrink-0 z-50 border-b border-white/5"
    >
      {/* Left: Carrier and Signal */}
      <div className="flex items-center gap-1.5">
        <Signal className="w-3 h-3 text-white/90" />
        <span className="font-semibold tracking-tight text-[10px]">Ubuntu</span>
      </div>

      {/* Center: Live Clock */}
      <div className="font-medium text-white tracking-wide">
        {time || "12:00"}
      </div>

      {/* Right: Connectivity & Battery */}
      <div className="flex items-center gap-2">
        <Wifi className="w-3 h-3 text-white/90" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-white/80">98%</span>
          <Battery className="w-3.5 h-3.5 text-white/90" />
        </div>
      </div>
    </header>
  );
}
