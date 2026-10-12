"use client";

import * as React from "react";
import { Wallpaper } from "@/components/shell/Wallpaper";
import { TopBar } from "@/components/shell/TopBar";
import { Dock } from "@/components/shell/Dock";
import { AppIcon } from "@/components/shell/AppIcon";
import { WindowManager } from "@/components/window/WindowManager";
import { useWindowStore } from "@/store/windows";

export function Desktop() {
  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null);

  const desktopIcons = [
    { id: "files", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "terminal", label: "Terminal" },
    { id: "resume", label: "Resume.pdf" },
  ];

  const handleIconOpen = (appId: string) => {
    useWindowStore.getState().openWindow(appId);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none bg-[#111111] text-white font-sans">
      {/* 1. Wallpaper */}
      <Wallpaper />

      {/* 2. Top Bar */}
      <TopBar />

      {/* 3. Ubuntu Dock */}
      <Dock />

      {/* 4. Window Manager Surface */}
      <WindowManager />

      {/* 5. Desktop Workspace Canvas */}
      <main
        className="relative h-full w-full pl-[var(--dock-width)] pt-[var(--topbar-height)] p-6 pointer-events-auto"
        onClick={() => setSelectedIcon(null)}
      >
        {/* Desktop Icons Grid (Top-Left of workspace) */}
        <div className="grid grid-flow-col grid-rows-4 gap-4 w-fit pt-2 z-10 relative">
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
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleIconOpen(icon.id);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-lg w-24 text-center transition-all duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ubuntu-orange)] ${
                  isSelected
                    ? "bg-white/20 shadow-sm backdrop-blur-xs ring-1 ring-white/30"
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
      </main>
    </div>
  );
}
