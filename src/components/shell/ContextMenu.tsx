"use client";

import * as React from "react";
import { useWindowStore } from "@/store/windows";
import { useSystemStore, SYSTEM_FONTS } from "@/store/system";
import {
  Terminal,
  Settings,
  ImageIcon,
  Info,
  Sun,
  Moon,
  FolderPlus,
  Maximize2,
  Minimize2,
  Type,
} from "lucide-react";
import { useIsFullscreen, toggleFullscreen } from "@/lib/fullscreen";

export interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const theme = useSystemStore((state) => state.theme);
  const font = useSystemStore((state) => state.font);
  const isFullscreen = useIsFullscreen();

  React.useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleAction = (callback: () => void) => {
    callback();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      role="menu"
      style={{ left: x, top: y }}
      className="fixed z-[99999] min-w-[210px] rounded-[var(--control-radius)] bg-[var(--color-popover-bg)]/95 backdrop-blur-md border border-[var(--color-border-subtle)] shadow-[var(--shadow-popover)] py-1.5 text-xs text-[var(--color-text-primary)] select-none animate-in fade-in zoom-in-95 duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        role="menuitem"
        onClick={() =>
          handleAction(() => {
            useSystemStore.getState().addNotification({
              title: "Desktop",
              message: "Created 'New Folder' on desktop workspace.",
            });
          })
        }
        className="w-full px-3.5 py-1.5 flex items-center gap-2.5 text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <FolderPlus className="w-4 h-4 text-amber-400" />
        <span>New Folder</span>
      </button>

      <div className="my-1 border-t border-[var(--color-border-subtle)]" />

      <button
        type="button"
        role="menuitem"
        onClick={() =>
          handleAction(() => useWindowStore.getState().openWindow("terminal"))
        }
        className="w-full px-3.5 py-1.5 flex items-center justify-between text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Open in Terminal</span>
        </span>
        <span className="text-[10px] text-[var(--color-text-muted)]">Ctrl+Alt+T</span>
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() =>
          handleAction(() => useWindowStore.getState().openWindow("settings"))
        }
        className="w-full px-3.5 py-1.5 flex items-center gap-2.5 text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <ImageIcon className="w-4 h-4 text-sky-400" />
        <span>Change Background...</span>
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() =>
          handleAction(() => useWindowStore.getState().openWindow("settings"))
        }
        className="w-full px-3.5 py-1.5 flex items-center gap-2.5 text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <Settings className="w-4 h-4 text-[var(--color-text-muted)]" />
        <span>Display Settings</span>
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() => handleAction(() => toggleFullscreen())}
        className="w-full px-3.5 py-1.5 flex items-center justify-between text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2.5">
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-amber-400" />
          ) : (
            <Maximize2 className="w-4 h-4 text-amber-400" />
          )}
          <span>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</span>
        </span>
        <span className="text-[10px] text-[var(--color-text-muted)]">F11</span>
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() => handleAction(() => useSystemStore.getState().toggleTheme())}
        className="w-full px-3.5 py-1.5 flex items-center justify-between text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2.5">
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400" />
          )}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </span>
        <span className="text-[10px] text-[var(--color-text-muted)] capitalize">{theme}</span>
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() =>
          handleAction(() => {
            const currentFont = useSystemStore.getState().font;
            const currentIndex = SYSTEM_FONTS.findIndex((f) => f.id === currentFont);
            const nextFont = SYSTEM_FONTS[(currentIndex + 1) % SYSTEM_FONTS.length];
            useSystemStore.getState().setFont(nextFont.id);
            useSystemStore.getState().addNotification({
              title: "System Font Changed",
              message: `Active font is now ${nextFont.name}`,
            });
          })
        }
        className="w-full px-3.5 py-1.5 flex items-center justify-between text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <Type className="w-4 h-4 text-violet-400" />
          <span>Switch Font</span>
        </span>
        <span className="text-[10px] text-[var(--color-text-muted)]">
          {SYSTEM_FONTS.find((f) => f.id === font)?.name ?? "Ubuntu"}
        </span>
      </button>

      <div className="my-1 border-t border-[var(--color-border-subtle)]" />

      <button
        type="button"
        role="menuitem"
        onClick={() =>
          handleAction(() => useWindowStore.getState().openWindow("about"))
        }
        className="w-full px-3.5 py-1.5 flex items-center gap-2.5 text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <Info className="w-4 h-4 text-cyan-400" />
        <span>About This System</span>
      </button>
    </div>
  );
}
