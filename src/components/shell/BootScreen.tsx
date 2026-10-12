"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    // If user prefers reduced motion, skip boot sequence immediately
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Auto-complete after 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete, prefersReducedMotion]);

  return (
    <div
      role="dialog"
      aria-label="Booting Ubuntu Desktop"
      onClick={onComplete}
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-between p-8 select-none cursor-pointer animate-in fade-in duration-300"
    >
      <div className="h-10" />

      {/* Center Plymouth Logo & Spinner */}
      <div className="flex flex-col items-center space-y-8 text-center">
        {/* Modern Stylized Ubuntu Emblem */}
        <div className="relative w-24 h-24 rounded-full flex items-center justify-center">
          {/* Subtle outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E95420] via-[#77216F] to-[#2C001E] blur-xl opacity-60 animate-pulse" />

          {/* Central Disk */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#E95420] to-[#C0392B] flex items-center justify-center shadow-2xl border border-white/20">
            <div className="w-8 h-8 rounded-full border-4 border-white/90 border-t-transparent animate-spin" />
          </div>
        </div>

        {/* Wordmark */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-1">
            <span>ubuntu</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--ubuntu-orange)] inline-block" />
          </h1>
          <p className="text-xs text-zinc-400 font-mono tracking-wider uppercase">
            24.04 LTS (Portfolio Edition)
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--ubuntu-orange)] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-[var(--ubuntu-orange)] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-[var(--ubuntu-orange)] animate-bounce" />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center space-y-2">
        <p className="text-[11px] text-zinc-500 font-mono">
          Loading hardware abstractions & interactive shell...
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-400">
          Press Esc, Space, or Click to Skip
        </span>
      </div>
    </div>
  );
}
