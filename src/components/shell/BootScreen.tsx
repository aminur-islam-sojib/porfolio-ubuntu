"use client";

import * as React from "react";
import { Maximize2, Monitor } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { enterFullscreen } from "@/lib/fullscreen";
import { playUbuntuStartupChime } from "@/lib/audio";

export interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [bootingPhase, setBootingPhase] = React.useState<"ready" | "booting">("ready");
  const [bootStep, setBootStep] = React.useState("Initializing system...");

  const handleStartBoot = React.useCallback(
    async (requestFs: boolean) => {
      if (bootingPhase === "booting") return;
      setBootingPhase("booting");

      if (requestFs) {
        await enterFullscreen();
      }

      playUbuntuStartupChime();

      if (prefersReducedMotion) {
        onComplete();
        return;
      }

      setBootStep("Loading Wayland display server & GNOME shell...");
      setTimeout(() => {
        setBootStep("Applying Yaru theme & personal workspace...");
      }, 600);

      setTimeout(() => {
        setBootStep("Ubuntu 24.04 LTS ready.");
        setTimeout(() => {
          onComplete();
        }, 400);
      }, 1200);
    },
    [bootingPhase, onComplete, prefersReducedMotion]
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (bootingPhase === "booting") return;

      if (e.key === "Enter" || e.key === " " || e.key === "F11") {
        e.preventDefault();
        handleStartBoot(true);
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleStartBoot(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bootingPhase, handleStartBoot]);

  return (
    <div
      role="dialog"
      aria-label="Ubuntu Plymouth Boot Screen"
      onClick={() => handleStartBoot(true)}
      className="fixed inset-0 z-[999999] bg-[#0a0a0a] flex flex-col items-center justify-between p-8 select-none cursor-pointer animate-in fade-in duration-300"
    >
      <div className="h-10" />

      {/* Center Plymouth Logo & Spinner */}
      <div
        className="flex flex-col items-center space-y-8 text-center max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modern Stylized Ubuntu Emblem */}
        <div className="relative w-28 h-28 rounded-full flex items-center justify-center">
          {/* Outer energetic glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E95420] via-[#77216F] to-[#2C001E] blur-2xl opacity-70 animate-pulse" />

          {/* Central Disk */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E95420] to-[#A02808] flex items-center justify-center shadow-[0_0_30px_rgba(233,84,32,0.4)] border border-white/20">
            {bootingPhase === "booting" ? (
              <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin" />
            ) : (
              <div className="w-10 h-10 rounded-full border-4 border-white/40 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white" />
              </div>
            )}
          </div>
        </div>

        {/* Wordmark */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
            <span>ubuntu</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--ubuntu-orange)] inline-block shadow-[0_0_8px_var(--ubuntu-orange)]" />
          </h1>
          <p className="text-xs text-zinc-400 font-mono tracking-wider uppercase">
            24.04 LTS (Portfolio Edition)
          </p>
        </div>

        {/* Dynamic State: Ready to Boot vs Booting Sequence */}
        {bootingPhase === "ready" ? (
          <div className="space-y-4 pt-2 w-full">
            <button
              type="button"
              onClick={() => handleStartBoot(true)}
              className="w-full px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E95420] to-[#77216F] hover:from-[#ff6d3b] hover:to-[#962e8c] text-white font-medium text-sm shadow-[0_0_25px_rgba(233,84,32,0.5)] hover:shadow-[0_0_35px_rgba(233,84,32,0.8)] transition-all flex items-center justify-center gap-2.5 scale-100 hover:scale-105 active:scale-95 group focus:outline-none"
            >
              <Maximize2 className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
              <span>Boot Fullscreen OS</span>
            </button>

            <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-400">
              <button
                type="button"
                onClick={() => handleStartBoot(false)}
                className="hover:text-white transition-colors flex items-center gap-1 underline underline-offset-4"
              >
                <Monitor className="w-3 h-3" />
                <span>Windowed Mode</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--ubuntu-orange)] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--ubuntu-orange)] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--ubuntu-orange)] animate-bounce" />
            </div>
            <p className="text-xs text-zinc-300 font-mono tracking-wide animate-pulse">
              {bootStep}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Footer Hint */}
      <div className="text-center space-y-1.5 pb-2">
        <p className="text-[11px] text-zinc-500 font-mono">
          Interactive Web Desktop Experience by Sojib Ahmed
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-400">
          Click anywhere or press Enter to launch
        </span>
      </div>
    </div>
  );
}
