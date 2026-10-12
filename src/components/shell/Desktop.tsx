"use client";

import * as React from "react";
import { Wallpaper } from "@/components/shell/Wallpaper";
import { TopBar } from "@/components/shell/TopBar";
import { Dock } from "@/components/shell/Dock";
import { AppIcon } from "@/components/shell/AppIcon";
import { profileData } from "@/data/profile";
import { Sparkles, Terminal, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Desktop() {
  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null);

  const desktopIcons = [
    { id: "files", label: "Home", sub: "/home/sojib" },
    { id: "projects", label: "Projects", sub: "Showcase" },
    { id: "terminal", label: "Terminal", sub: "bash" },
    { id: "resume", label: "Resume.pdf", sub: "CV" },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none bg-[#111111] text-white font-sans">
      {/* 1. Wallpaper */}
      <Wallpaper />

      {/* 2. Top Bar */}
      <TopBar />

      {/* 3. Ubuntu Dock */}
      <Dock />

      {/* 4. Desktop Workspace Canvas */}
      <main
        className="relative h-full w-full pl-[var(--dock-width)] pt-[var(--topbar-height)] p-6 flex flex-col justify-between pointer-events-auto"
        onClick={() => setSelectedIcon(null)}
      >
        {/* Desktop Icons Grid (Top-Left of workspace) */}
        <div className="grid grid-flow-col grid-rows-4 gap-4 w-fit pt-2">
          {desktopIcons.map((icon) => {
            const isSelected = selectedIcon === icon.id;
            return (
              <button
                key={icon.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIcon(icon.id);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-lg w-24 text-center transition-all duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ubuntu-orange)] ${
                  isSelected
                    ? "bg-white/20 shadow-sm backdrop-blur-xs"
                    : "hover:bg-white/10"
                }`}
              >
                <AppIcon id={icon.id} size={44} className="mb-1.5" />
                <span className="text-xs font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight line-clamp-1">
                  {icon.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center/Bottom Ambient Portfolio Card */}
        <div className="max-w-lg mx-auto mb-8 bg-[#1E1E1E]/80 backdrop-blur-md rounded-[var(--window-radius)] border border-white/10 shadow-[var(--shadow-window)] p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--ubuntu-orange)] inline-block" />
                <h1 className="text-lg font-bold tracking-tight">
                  {profileData.name}
                </h1>
              </div>
              <p className="text-xs text-zinc-300">
                {profileData.title} • {profileData.systemInfo.osVersion}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#444444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#444444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#444444]" />
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Welcome to the Ubuntu 24.04 desktop environment. Phase 1 (Static Shell) provides the live TopBar, left Dock, Aubergine wallpaper, and desktop surface.
          </p>

          <div className="flex items-center gap-3 pt-1 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/30 border border-white/5 font-mono text-[11px] text-emerald-400">
              <Terminal className="w-3.5 h-3.5 text-[var(--ubuntu-orange)]" />
              <span>bash 5.2</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/30 border border-white/5 font-mono text-[11px] text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Noble 24.04</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <span className="text-zinc-400 text-[11px]">Next: Phase 2 Window Manager</span>
            <Link
              href="/dev/tokens"
              className="inline-flex items-center gap-1 text-[var(--ubuntu-orange)] hover:underline font-medium text-[11px]"
            >
              <span>Token Showcase</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

