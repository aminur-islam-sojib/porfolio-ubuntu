"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { enterFullscreen } from "@/lib/fullscreen";
import { playUbuntuStartupChime } from "@/lib/audio";
import { cn } from "@/lib/cn";
import { BrandLogo } from "@/components/ui/BrandLogo";

export interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isFadingOut, setIsFadingOut] = React.useState(false);
  const hasFinishedRef = React.useRef(false);

  const completeBoot = React.useCallback(
    (requestFullscreen: boolean) => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;

      if (typeof window !== "undefined") {
        sessionStorage.setItem("ubuntu_fs_dismissed", "true");
        sessionStorage.setItem("ubuntu_booted", "true");
      }

      if (requestFullscreen) {
        enterFullscreen().catch(() => {});
      }

      playUbuntuStartupChime();

      if (prefersReducedMotion) {
        onComplete();
        return;
      }

      // Smooth display handoff transition (fade out Plymouth screen into GDM Lock Screen / Desktop)
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 450);
    },
    [onComplete, prefersReducedMotion]
  );

  // Automatic boot sequence (simulating real NVMe SSD startup: 2.2 seconds)
  React.useEffect(() => {
    const delay = prefersReducedMotion ? 50 : 2400;
    const timer = setTimeout(() => {
      completeBoot(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [completeBoot, prefersReducedMotion]);

  // Keyboard controls: Enter / Space / F11 boots with fullscreen, Escape boots windowed
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasFinishedRef.current) return;

      if (e.key === "Enter" || e.key === " " || e.key === "F11") {
        e.preventDefault();
        completeBoot(true);
      } else if (e.key === "Escape") {
        e.preventDefault();
        completeBoot(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [completeBoot]);

  return (
    <div
      role="dialog"
      aria-label="Ubuntu Plymouth Boot Screen"
      onClick={() => completeBoot(true)}
      className={cn(
        "fixed inset-0 z-[999999] bg-black select-none cursor-pointer flex flex-col items-center justify-between transition-opacity duration-500 ease-out will-change-transform",
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* 1. Personal Brand Logo Section (Top Center / Upper Third) */}
      <div className="flex-1 flex flex-col items-center justify-center pt-10 sm:pt-14">
        <div className="flex flex-col items-center select-none text-center">
          {/* Personal Brand Logo Monogram */}
          <div className="relative flex items-center justify-center h-16 sm:h-20 w-auto mb-1">
            <BrandLogo
              glow
              className="h-14 sm:h-16 w-auto text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            />
          </div>

          {/* User Brand Wordmark */}
          <span className="text-white text-[13px] sm:text-[14px] font-medium tracking-[0.35em] uppercase mt-3 pl-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] font-sans">
            SOJIB
          </span>

          {/* Security / Subsystem Badge */}
          <div className="flex flex-col items-center mt-3 sm:mt-4 space-y-1">
            <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-white/55 uppercase">
              PROTECTED BY
            </span>

            {/* Circular Shield Emblem */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/40 flex items-center justify-center my-0.5 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              <svg
                className="w-3.5 h-3.5 text-white/90 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>

            <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-white/75 uppercase">
              SOJIB SURE START
            </span>
          </div>
        </div>
      </div>

      {/* 2. Plymouth Spinner (Center) */}
      <div className="py-6 sm:py-8 flex flex-col items-center justify-center">
        <div className="relative w-6 h-6 sm:w-7 sm:h-7">
          <div className="w-full h-full rounded-full border-[2.5px] border-white/20 border-t-white animate-spin [animation-duration:900ms] shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
        </div>
      </div>

      {/* 3. Ubuntu BGRT Watermark (Bottom Center) */}
      <div className="flex-1 flex flex-col items-center justify-end pb-10 sm:pb-14">
        <div className="flex items-center gap-3 select-none">
          {/* Orange Square with Circle of Friends */}
          <div className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] rounded-[3px] bg-[var(--ubuntu-orange)] shadow-[0_0_24px_rgba(233,84,32,0.6)] flex items-center justify-center shrink-0 overflow-hidden">
            <svg className="w-full h-full p-1" viewBox="0 0 32 32" aria-hidden="true">
              <circle fill="#fff" cx="7.18" cy="15.82" r="3.35" />
              <circle fill="#fff" cx="21.1" cy="8.48" r="3.35" />
              <path
                fill="#fff"
                d="M14.73,24.42a8.08,8.08,0,0,1-5.55-4.25,4.83,4.83,0,0,1-2.85.35,10.87,10.87,0,0,0,7.85,6.58,11,11,0,0,0,2.37.25,4.71,4.71,0,0,1-1-2.8A2.89,2.89,0,0,1,14.73,24.42Z"
              />
              <circle fill="#fff" cx="20.35" cy="24.45" r="3.35" />
              <path
                fill="#fff"
                d="M25,23.23a11,11,0,0,0,.55-12.83,4.85,4.85,0,0,1-1.88,2.2,8.22,8.22,0,0,1,.78,5.55,8.08,8.08,0,0,1-1.05,2.6A4.58,4.58,0,0,1,25,23.23Z"
              />
              <path
                fill="#fff"
                d="M6.9,11h.25a4.65,4.65,0,0,1,1,.1,4.84,4.84,0,0,1,1.52.63,8.12,8.12,0,0,1,6.58-3.52,6.42,6.42,0,0,1,.1-.75,4.63,4.63,0,0,1,.92-1.95A11,11,0,0,0,6.9,11Z"
              />
            </svg>
          </div>

          {/* Ubuntu Wordmark */}
          <span className="text-[25px] sm:text-[27px] font-medium tracking-tight text-white font-sans drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            ubuntu
          </span>
        </div>

        {/* Subtle, unobtrusive BIOS hint at the very bottom */}
        <span className="text-[10px] font-mono tracking-wider text-zinc-500 mt-4 opacity-40 hover:opacity-90 transition-opacity">
          Click or press Enter to launch • Esc for windowed
        </span>
      </div>
    </div>
  );
}
