import * as React from "react";
import { Minus, Square, Copy, X } from "lucide-react";

export interface WindowControlsProps {
  isMaximized: boolean;
  onMinimize: (e: React.MouseEvent) => void;
  onMaximize: (e: React.MouseEvent) => void;
  onClose: (e: React.MouseEvent) => void;
}

export function WindowControls({
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
}: WindowControlsProps) {
  return (
    <div
      className="flex items-center gap-3 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Minimize */}
      <button
        type="button"
        onClick={onMinimize}
        aria-label="Minimize Window"
        className="group relative w-3.5 h-3.5 rounded-full bg-[var(--color-control-bg)] hover:bg-[var(--color-control-hover)] active:bg-[var(--color-control-active)] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ubuntu-orange)]"
      >
        <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-[var(--color-control-glyph)] transition-opacity" />
      </button>

      {/* Maximize / Restore */}
      <button
        type="button"
        onClick={onMaximize}
        aria-label={isMaximized ? "Restore Window" : "Maximize Window"}
        className="group relative w-3.5 h-3.5 rounded-full bg-[var(--color-control-bg)] hover:bg-[var(--color-control-hover)] active:bg-[var(--color-control-active)] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ubuntu-orange)]"
      >
        {isMaximized ? (
          <Copy className="w-2 h-2 opacity-0 group-hover:opacity-100 text-[var(--color-control-glyph)] transition-opacity" />
        ) : (
          <Square className="w-2 h-2 opacity-0 group-hover:opacity-100 text-[var(--color-control-glyph)] transition-opacity" />
        )}
      </button>

      {/* Close (Turns Ubuntu Orange on hover) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Window"
        className="group relative w-3.5 h-3.5 rounded-full bg-[var(--color-control-bg)] hover:bg-[var(--ubuntu-orange)] active:bg-[var(--ubuntu-orange-active)] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
      >
        <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-white transition-opacity" />
      </button>
    </div>
  );
}

