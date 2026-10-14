"use client";

import * as React from "react";
import { Maximize2, Monitor, Sparkles, X } from "lucide-react";
import { enterFullscreen, useIsFullscreen } from "@/lib/fullscreen";
import { playUbuntuStartupChime } from "@/lib/audio";
import { useSystemStore } from "@/store/system";

export function FullscreenPrompt() {
  const isFullscreen = useIsFullscreen();
  const isBooting = useSystemStore((state) => state.isBooting);
  const isLocked = useSystemStore((state) => state.isLocked);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isBooting || isLocked) {
      return;
    }

    // Check if user already dismissed or accepted in this session
    const hasDismissed = sessionStorage.getItem("ubuntu_fs_dismissed");
    if (!hasDismissed && !isFullscreen) {
      // Show prompt after a short initial render delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen, isBooting, isLocked]);

  const handleAccept = async () => {
    sessionStorage.setItem("ubuntu_fs_dismissed", "true");
    setIsOpen(false);
    const success = await enterFullscreen();
    playUbuntuStartupChime();

    if (success) {
      useSystemStore.getState().addNotification({
        title: "Display Mode",
        message: "Entered Fullscreen Desktop. Press F11 or Esc anytime to exit.",
      });
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem("ubuntu_fs_dismissed", "true");
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleAccept();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen || isFullscreen) return null;

  return (
    <div
      role="dialog"
      aria-label="Fullscreen Permission Prompt"
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={handleDismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-[#1E1E1E] border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-white flex flex-col space-y-6 relative overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[radial-gradient(circle,rgba(233,84,32,0.25)_0%,transparent_70%)] blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[radial-gradient(circle,rgba(119,33,111,0.35)_0%,transparent_70%)] blur-2xl pointer-events-none" />

        {/* Close "X" button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close prompt"
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Emblem */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E95420] via-[#C0392B] to-[#77216F] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(233,84,32,0.4)] border border-white/20">
            <Maximize2 className="w-6 h-6 text-white" />
          </div>

          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--ubuntu-orange)] font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Ubuntu 24.04 LTS
              </span>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-white leading-tight">
              Run in Fullscreen Mode?
            </h2>
          </div>
        </div>

        {/* Explanation Message */}
        <div className="space-y-2 text-xs text-zinc-300 leading-relaxed bg-white/5 border border-white/5 rounded-xl p-3.5">
          <p>
            Experience this developer portfolio as an authentic operating system. Entering
            fullscreen will <strong className="text-white font-medium">hide your browser tabs, URL address bar, and bookmarks</strong>.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Interactive window manager • 60 FPS • Full desktop immersion</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={handleAccept}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E95420] to-[#77216F] hover:from-[#ff6d3b] hover:to-[#912a87] text-white font-semibold text-xs shadow-[0_0_25px_rgba(233,84,32,0.45)] hover:shadow-[0_0_35px_rgba(233,84,32,0.7)] transition-all flex items-center justify-center gap-2 group active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ubuntu-orange)]"
          >
            <Maximize2 className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Allow & Enter Fullscreen</span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-zinc-300 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 focus:outline-none"
          >
            <Monitor className="w-3.5 h-3.5 text-zinc-400" />
            <span>Continue in Browser Window</span>
          </button>
        </div>

        {/* Shortcut Hint */}
        <div className="text-center text-[10px] text-zinc-500 font-mono">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Enter</kbd> to allow •{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Esc</kbd> to skip • Press{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">F11</kbd> anytime
        </div>
      </div>
    </div>
  );
}
