"use client";

import * as React from "react";
import Link from "next/link";
import { X, Terminal, FolderKanban, FileText, Sparkles, Layout, ExternalLink } from "lucide-react";
import { useSystemStore } from "@/store/system";
import { useWindowStore } from "@/store/windows";
import { profileData } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { enterFullscreen } from "@/lib/fullscreen";

export function WelcomeModal() {
  const isWelcomeOpen = useSystemStore((state) => state.isWelcomeOpen);
  const setWelcomeOpen = useSystemStore((state) => state.setWelcomeOpen);
  const prefersReducedMotion = useReducedMotion();
  const [dontShowAgain, setDontShowAgain] = React.useState(true);

  const handleClose = React.useCallback(() => {
    enterFullscreen();
    if (dontShowAgain && typeof window !== "undefined") {
      localStorage.setItem("ubuntu_welcome_dismissed", "true");
    }
    setWelcomeOpen(false);
  }, [dontShowAgain, setWelcomeOpen]);

  React.useEffect(() => {
    if (!isWelcomeOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWelcomeOpen, handleClose]);

  if (!isWelcomeOpen) return null;

  const handleOpenApp = (appId: string) => {
    useWindowStore.getState().openWindow(appId);
    handleClose();
  };

  return (
    <div
      role="dialog"
      aria-label="Welcome to Ubuntu Portfolio"
      className="fixed inset-0 z-[99990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-xl rounded-2xl bg-[#1E1E1E] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden text-white flex flex-col ${
          prefersReducedMotion ? "" : "animate-in fade-in zoom-in-95 duration-200"
        }`}
      >
        {/* Header Bar */}
        <div className="relative h-28 bg-gradient-to-r from-[#2C001E] via-[#77216F] to-[#E95420] p-6 flex flex-col justify-end">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close welcome dialog"
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-[var(--ubuntu-orange)] inline-block ring-2 ring-white/50" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">
              Ubuntu 24.04 LTS
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Welcome to {profileData.name}&apos;s Portfolio
          </h2>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-zinc-300 leading-relaxed">
            This portfolio is built as an interactive Linux desktop in your browser. Every window,
            icon, and terminal command is live and functional.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--ubuntu-orange)]/20 text-[var(--ubuntu-orange)] flex items-center justify-center">
                <Layout className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-white">Full Window OS</h3>
              <p className="text-[11px] text-zinc-400">
                Drag, resize, and snap windows to screen edges or corners.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-white">Interactive CLI</h3>
              <p className="text-[11px] text-zinc-400">
                Press <kbd className="px-1 py-0.5 rounded bg-black/40 text-[10px]">Ctrl+Alt+T</kbd> for the terminal.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-white">Activities View</h3>
              <p className="text-[11px] text-zinc-400">
                Press <kbd className="px-1 py-0.5 rounded bg-black/40 text-[10px]">Super</kbd> or click Activities to search.
              </p>
            </div>
          </div>

          {/* Quick Recruiter Actions */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-xs font-semibold text-zinc-300 block">
              Recruiter Quick Access:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenApp("projects")}
                className="px-3 py-1.5 rounded-lg bg-[var(--ubuntu-orange)] hover:bg-[#ff6d38] text-xs font-medium text-white flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>View Projects</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenApp("resume")}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </button>

              <Link
                href="/classic"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors ml-auto"
              >
                <span>Classic HTML Portfolio</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-black/20 border-t border-white/10 flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-zinc-300">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded bg-white/10 border-white/20 text-[var(--ubuntu-orange)] focus:ring-[var(--ubuntu-orange)]"
            />
            <span>Don&apos;t show on startup</span>
          </label>

          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 rounded-xl bg-[var(--ubuntu-orange)] hover:bg-[#ff6d38] text-white font-medium transition-all shadow-md active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
