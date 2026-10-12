"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Wifi, Volume2, Power, UserCheck, Shield } from "lucide-react";
import { useSystemStore } from "@/store/system";
import { profileData } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function subscribeToClock(callback: () => void) {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}

function getLockTime(): string {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getLockDate(): string {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getEmptySnapshot(): string {
  return "";
}

export function LockScreen() {
  const isLocked = useSystemStore((state) => state.isLocked);
  const unlockScreen = useSystemStore((state) => state.unlockScreen);
  const prefersReducedMotion = useReducedMotion();

  const currentTime = React.useSyncExternalStore(
    subscribeToClock,
    getLockTime,
    getEmptySnapshot
  );

  const currentDate = React.useSyncExternalStore(
    subscribeToClock,
    getLockDate,
    getEmptySnapshot
  );

  const [password, setPassword] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isLocked) return;

    // Focus input on lock
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Any Enter or Escape unlocks instantly
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        unlockScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLocked, unlockScreen]);

  if (!isLocked) return null;

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    unlockScreen();
  };

  return (
    <div
      role="dialog"
      aria-label="Ubuntu Lock Screen"
      className={`fixed inset-0 z-[99995] flex flex-col justify-between bg-black/75 backdrop-blur-3xl text-white select-none ${
        prefersReducedMotion ? "" : "animate-in fade-in duration-300"
      }`}
    >
      {/* Top Status Bar */}
      <div className="h-8 px-4 flex items-center justify-between text-xs text-zinc-300 bg-black/20">
        <span className="font-medium tracking-wide">Ubuntu 24.04 LTS</span>
        <div className="flex items-center gap-3">
          <Wifi className="w-3.5 h-3.5 text-zinc-300" />
          <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
          <Power className="w-3.5 h-3.5 text-zinc-300" />
        </div>
      </div>

      {/* Main Lock Area */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-8 px-4">
        {/* Clock & Date */}
        <div className="text-center mb-8 space-y-1">
          <div className="text-6xl sm:text-7xl font-light tracking-tight text-white/95 font-sans">
            {currentTime || "20:00"}
          </div>
          <div className="text-sm sm:text-base text-zinc-300 font-medium">
            {currentDate || "Monday, October 12"}
          </div>
        </div>

        {/* User Card */}
        <div className="w-full max-w-sm flex flex-col items-center space-y-5">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E95420] via-[#77216F] to-[#2C001E] p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#2C001E] flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                {profileData.name.charAt(0)}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[var(--ubuntu-orange)] border-2 border-black flex items-center justify-center shadow">
              <UserCheck className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* User Name & Role */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white">{profileData.name}</h2>
            <p className="text-xs text-zinc-400">{profileData.title}</p>
          </div>

          {/* Passwordless Unlock Form */}
          <form
            onSubmit={handleUnlock}
            className="w-full relative flex items-center"
          >
            <input
              ref={inputRef}
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Press Enter or click Unlock..."
              className="w-full h-11 pl-4 pr-12 rounded-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-[var(--ubuntu-orange)] text-sm text-white placeholder-zinc-400 outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              aria-label="Unlock Desktop"
              className="absolute right-1.5 w-8 h-8 rounded-full bg-[var(--ubuntu-orange)] hover:bg-[#ff6d38] active:scale-95 text-white flex items-center justify-center transition-transform shadow-md"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Recruiter notice */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
            <Shield className="w-3 h-3" />
            <span>Recruiter mode enabled • Passwordless instant access</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Action Bar */}
      <div className="py-4 px-6 flex items-center justify-between text-xs text-zinc-400 border-t border-white/5">
        <button
          type="button"
          onClick={() => unlockScreen()}
          className="hover:text-white transition-colors underline-offset-4 hover:underline"
        >
          Press Esc or Enter to unlock
        </button>

        <div className="flex items-center gap-4">
          <Link
            href="/classic"
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Classic View
          </Link>
          <button
            type="button"
            onClick={() => useSystemStore.getState().reboot()}
            className="hover:text-red-400 transition-colors"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
