"use client";

import * as React from "react";
import Image from "next/image";
import { Wifi, Volume2, Battery, Fingerprint } from "lucide-react";
import { useSystemStore } from "@/store/system";
import { UBUNTU_WALLPAPERS } from "@/data/wallpapers";
import { profileData } from "@/data/profile";
import { playUbuntuStartupChime } from "@/lib/audio";
import { enterFullscreen } from "@/lib/fullscreen";

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
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const day = now.getDate();
  return `${weekday} ${month} ${day}`;
}

export function LockScreen() {
  const isLocked = useSystemStore((state) => state.isLocked);
  const unlockScreen = useSystemStore((state) => state.unlockScreen);
  const wallpaper = useSystemStore((state) => state.wallpaper);
  const theme = useSystemStore((state) => state.theme);

  const [mode, setMode] = React.useState<"shield" | "auth">("shield");
  const [password, setPassword] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const currentTime = React.useSyncExternalStore(
    subscribeToClock,
    getLockTime,
    () => "06:32"
  );

  const currentDate = React.useSyncExternalStore(
    subscribeToClock,
    getLockDate,
    () => "Tuesday October 13"
  );

  // Resolve current wallpaper URL for blurred background reflection
  const currentSrc = React.useMemo(() => {
    if (!wallpaper || typeof wallpaper !== "string") {
      return theme === "light"
        ? "/wallpapers/noble-light.webp"
        : "/wallpapers/noble-dark.webp";
    }

    const found = UBUNTU_WALLPAPERS.find((w) => w.id === wallpaper);
    if (found) {
      if (found.isDynamic) {
        return theme === "light" ? found.lightSrc! : found.darkSrc!;
      }
      return found.src;
    }

    if (
      wallpaper.startsWith("/") ||
      wallpaper.startsWith("data:") ||
      wallpaper.startsWith("http")
    ) {
      return wallpaper;
    }

    return theme === "light"
      ? "/wallpapers/noble-light.webp"
      : "/wallpapers/noble-dark.webp";
  }, [wallpaper, theme]);

  // Focus input when entering auth mode
  React.useEffect(() => {
    if (isLocked && mode === "auth") {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isLocked, mode]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!isLocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle to auth screen on any key press from shield mode
      if (mode === "shield") {
        if (e.key === "F11") return;
        e.preventDefault();
        setMode("auth");
        return;
      }

      // If in auth screen, Escape returns to shield
      if (mode === "auth" && e.key === "Escape") {
        e.preventDefault();
        setMode("shield");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLocked, mode]);

  if (!isLocked) return null;

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ubuntu_unlocked", "true");
    }
    unlockScreen();
    playUbuntuStartupChime();
    enterFullscreen();

    if (typeof window !== "undefined") {
      const welcomeDismissed = localStorage.getItem("ubuntu_welcome_dismissed");
      if (!welcomeDismissed) {
        setTimeout(() => {
          useSystemStore.getState().setWelcomeOpen(true);
        }, 600);
      }
    }
  };

  const handleScreenClick = () => {
    if (mode === "shield") {
      setMode("auth");
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Ubuntu Lock Screen"
      onClick={handleScreenClick}
      className="fixed inset-0 z-[99999] flex flex-col justify-between text-white select-none overflow-hidden"
    >
      {/* 1. Underlying Blurred Wallpaper Background Reflection */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10 bg-[#2C001E]">
        {/* Base Fallback Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#77216F] via-[#5E2750] to-[#2C001E]" />

        {/* Wallpaper Image heavily blurred like Ubuntu GDM reflection */}
        {currentSrc && (
          <Image
            src={currentSrc}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="w-full h-full object-cover object-center scale-110 filter blur-3xl brightness-75 contrast-125 select-none"
          />
        )}

        {/* Frosted dark vignette & glass overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl" />
      </div>

      {/* 2. Top Status Bar (Minimal Right Glyphs) */}
      <header className="fixed top-0 right-0 h-8 px-4 flex items-center gap-3 z-10 text-white/90 select-none">
        <Wifi className="w-3.5 h-3.5" />
        <Volume2 className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4" />
      </header>

      {/* 3. Center Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        {mode === "shield" ? (
          /* ========================================================
             Phase 1: Initial Lock Screen (Clock & Date Shield)
             ======================================================== */
          <div className="text-center space-y-2 cursor-pointer animate-in fade-in duration-300 select-none">
            {/* Clock */}
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-light tracking-tight text-white font-sans select-none drop-shadow-md">
              {currentTime}
            </h1>

            {/* Date */}
            <p className="text-sm sm:text-base text-zinc-200 font-normal select-none pt-1">
              {currentDate}
            </p>

            {/* Unlock Hint */}
            <p className="text-xs text-[#ff8080] tracking-wide pt-8 select-none animate-pulse">
              Click or press a key to unlock
            </p>
          </div>
        ) : (
          /* ========================================================
             Phase 2: Password Authentication Screen
             ======================================================== */
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center text-center space-y-3.5 animate-in fade-in zoom-in-95 duration-200 select-none"
          >
            {/* Circular Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl relative select-none">
              <Image
                src={profileData.avatarUrl || "/avatars/profile.png"}
                alt={profileData.name}
                fill
                unoptimized
                sizes="112px"
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* User Name */}
            <h2 className="text-base font-semibold text-white tracking-wide select-none pt-1">
              {profileData.name}
            </h2>

            {/* Password Input Pill */}
            <form onSubmit={handleUnlock} className="w-64 sm:w-72 space-y-2 pt-1">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-9 pl-4 pr-9 rounded-full bg-[#3c2a38]/85 hover:bg-[#483344]/90 focus:bg-[#4c3547] border border-white/10 focus:border-[var(--ubuntu-orange)] text-xs text-white placeholder-zinc-400 outline-none transition-all shadow-inner"
                />
                <button
                  type="submit"
                  aria-label="Unlock"
                  className="absolute right-2.5 text-zinc-400 hover:text-white transition-colors focus:outline-none"
                >
                  <Fingerprint className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

              {/* Reader Subtitle */}
              <p className="text-[11px] text-[#ff8080] font-mono tracking-tight select-none">
                (or place finger on reader)
              </p>
            </form>

            {/* Recruiter / Quick Tip */}
            <p className="text-[10px] text-zinc-400 select-none pt-2">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Enter</kbd> to unlock • <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Esc</kbd> to return
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
