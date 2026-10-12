"use client";

import * as React from "react";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { useWindowStore } from "@/store/windows";
import { TitleBar } from "@/components/window/TitleBar";
import { clampWindowPosition } from "@/lib/geometry";
import { cn } from "@/lib/cn";

export interface WindowProps {
  id: string;
  children?: React.ReactNode;
}

export const Window = React.memo(function Window({ id, children }: WindowProps) {
  const win = useWindowStore((state) => state.windows[id]);
  const isFocused = useWindowStore((state) => state.activeId === id);

  const [isDragging, setIsDragging] = React.useState(false);

  // If window doesn't exist, is closed, or is minimized, do not render
  if (!win || !win.isOpen || win.isMinimized) {
    return null;
  }

  const handleDragStart: RndDragCallback = () => {
    setIsDragging(true);
    useWindowStore.getState().focusWindow(id);
  };

  const handleDragStop: RndDragCallback = (_e, d) => {
    setIsDragging(false);
    const clamped = clampWindowPosition(d.x, d.y, win.size.width, win.size.height);
    useWindowStore.getState().updateBounds(id, { x: clamped.x, y: clamped.y }, win.size);
  };

  const handleResizeStop: RndResizeCallback = (_e, _dir, elementRef, _delta, position) => {
    const width = parseInt(elementRef.style.width, 10);
    const height = parseInt(elementRef.style.height, 10);
    const clamped = clampWindowPosition(position.x, position.y, width, height);

    useWindowStore.getState().updateBounds(
      id,
      { x: clamped.x, y: clamped.y },
      { width, height }
    );
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    useWindowStore.getState().minimizeWindow(id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    useWindowStore.getState().toggleMaximize(id);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    useWindowStore.getState().closeWindow(id);
  };

  const handleTitleDoubleClick = () => {
    useWindowStore.getState().toggleMaximize(id);
  };

  const handlePointerDown = () => {
    if (!isFocused) {
      useWindowStore.getState().focusWindow(id);
    }
  };

  return (
    <Rnd
      position={{ x: win.position.x, y: win.position.y }}
      size={{ width: win.size.width, height: win.size.height }}
      minWidth={win.minWidth}
      minHeight={win.minHeight}
      dragHandleClassName="window-drag-handle"
      disableDragging={win.isMaximized}
      enableResizing={!win.isMaximized}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      style={{
        zIndex: win.zIndex,
        position: "fixed",
        willChange: isDragging ? "transform" : "auto",
      }}
      className="outline-none"
    >
      <div
        role="dialog"
        aria-label={win.title}
        onPointerDown={handlePointerDown}
        className={cn(
          "h-full w-full flex flex-col overflow-hidden bg-[var(--color-window-bg)] border transition-shadow duration-200 select-auto animate-in fade-in zoom-in-[0.98] duration-150",
          win.isMaximized
            ? "rounded-none border-none shadow-none"
            : "rounded-[var(--window-radius)] border-white/10",
          isFocused
            ? "shadow-[var(--shadow-window)] ring-1 ring-white/10"
            : "shadow-[var(--shadow-window-inactive)] opacity-95"
        )}
      >
        {/* Title Bar */}
        <TitleBar
          appId={id}
          title={win.title}
          isFocused={isFocused}
          isMaximized={win.isMaximized}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleClose}
          onDoubleClick={handleTitleDoubleClick}
        />

        {/* Window Content Container */}
        <div className="flex-1 w-full overflow-auto bg-[#1E1E1E] text-white">
          {children}
        </div>
      </div>
    </Rnd>
  );
});

Window.displayName = "Window";

