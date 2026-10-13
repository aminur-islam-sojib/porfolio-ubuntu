"use client";

import * as React from "react";
import { Minus, Square, Copy, X } from "lucide-react";

export interface TitleBarContextMenuProps {
  x: number;
  y: number;
  isMaximized: boolean;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  onDismiss: () => void;
}

export function TitleBarContextMenu({
  x,
  y,
  isMaximized,
  onMinimize,
  onToggleMaximize,
  onClose,
  onDismiss,
}: TitleBarContextMenuProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onDismiss();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };

    window.addEventListener("pointerdown", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onDismiss]);

  return (
    <div
      ref={menuRef}
      role="menu"
      style={{ left: x, top: y }}
      className="fixed z-[99999] min-w-[170px] rounded-[var(--control-radius)] bg-[var(--color-popover-bg)]/95 backdrop-blur-md border border-[var(--color-border-subtle)] shadow-[var(--shadow-popover)] py-1.5 text-xs text-[var(--color-text-primary)] select-none animate-in fade-in zoom-in-95 duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onMinimize();
          onDismiss();
        }}
        className="w-full px-3 py-1.5 flex items-center justify-between text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2">
          <Minus className="w-3.5 h-3.5" />
          <span>Minimize</span>
        </span>
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onToggleMaximize();
          onDismiss();
        }}
        className="w-full px-3 py-1.5 flex items-center justify-between text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2">
          {isMaximized ? (
            <Copy className="w-3.5 h-3.5" />
          ) : (
            <Square className="w-3.5 h-3.5" />
          )}
          <span>{isMaximized ? "Restore" : "Maximize"}</span>
        </span>
      </button>

      <div className="my-1 border-t border-[var(--color-border-subtle)]" />

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onClose();
          onDismiss();
        }}
        className="w-full px-3 py-1.5 flex items-center justify-between text-left hover:bg-[var(--ubuntu-orange)] hover:text-white transition-colors text-red-500 hover:text-white"
      >
        <span className="flex items-center gap-2">
          <X className="w-3.5 h-3.5" />
          <span>Close</span>
        </span>
        <span className="text-[10px] text-[var(--color-text-muted)]">Alt+F4</span>
      </button>
    </div>
  );
}

