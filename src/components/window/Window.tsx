"use client";

import * as React from "react";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { useWindowStore } from "@/store/windows";
import { TitleBar } from "@/components/window/TitleBar";
import { clampWindowPosition } from "@/lib/geometry";
import { getSnapZone } from "@/lib/snap";
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

  const getPointerCoords = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent | unknown) => {
    const mouse = e as MouseEvent;
    if (mouse.clientX !== undefined) return { x: mouse.clientX, y: mouse.clientY };
    const touch = e as TouchEvent;
    if (touch.touches && touch.touches[0]) {
      return { x: touch.touches[0].clientX, y: touch.touches[0].clientY };
    }
    return null;
  };

  const handleDragStart: RndDragCallback = (e, d) => {
    setIsDragging(true);
    useWindowStore.getState().focusWindow(id);

    // If dragging from snapped or maximized state, unstick and restore proportions
    if (win.snapZone !== "none" || win.isMaximized) {
      const coords = getPointerCoords(e);
      const restoredWidth = win.prevBounds.width;
      const restoredHeight = win.prevBounds.height;
      const cursorX = coords ? coords.x : d.x;
      const cursorY = coords ? coords.y : d.y;

      const newX = Math.max(56, cursorX - restoredWidth / 2);
      const newY = Math.max(30, cursorY - 20);

      useWindowStore.getState().updateBounds(
        id,
        { x: newX, y: newY },
        { width: restoredWidth, height: restoredHeight }
      );
      useWindowStore.setState((state) => ({
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isMaximized: false,
            snapZone: "none",
          },
        },
      }));
    }
  };

  const handleDrag: RndDragCallback = (e) => {
    const coords = getPointerCoords(e);
    if (coords) {
      const zone = getSnapZone(coords.x, coords.y);
      useWindowStore.getState().setPreviewSnapZone(zone);
    }
  };

  const handleDragStop: RndDragCallback = (_e, d) => {
    setIsDragging(false);
    const snapZone = useWindowStore.getState().previewSnapZone;

    if (snapZone !== "none") {
      useWindowStore.getState().applySnap(id, snapZone);
    } else {
      useWindowStore.getState().setPreviewSnapZone("none");
      const clamped = clampWindowPosition(d.x, d.y, win.size.width, win.size.height);
      useWindowStore.getState().updateBounds(id, { x: clamped.x, y: clamped.y }, win.size);
    }
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
      disableDragging={false}
      enableResizing={!win.isMaximized}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
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
            : win.snapZone !== "none"
            ? "rounded-[6px] border-white/10"
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
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden bg-[#1E1E1E] text-white">
          {children}
        </div>
      </div>
    </Rnd>
  );
});

Window.displayName = "Window";
