"use client";

import * as React from "react";
import { AppIcon } from "@/components/shell/AppIcon";
import { useWindowStore } from "@/store/windows";
import { cn } from "@/lib/cn";

interface DesktopItem {
  id: string;
  label: string;
}

export function DesktopIcons() {
  const desktopItems: DesktopItem[] = [
    { id: "files", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "terminal", label: "Terminal" },
    { id: "resume", label: "Resume.pdf" },
  ];

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectionBox, setSelectionBox] = React.useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  } | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const iconRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only trigger if clicking on the canvas directly
    if (e.button !== 0) return;
    setSelectedIds([]);
    setSelectionBox({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!selectionBox) return;

    const updatedBox = {
      ...selectionBox,
      currentX: e.clientX,
      currentY: e.clientY,
    };
    setSelectionBox(updatedBox);

    // Compute bounding box
    const left = Math.min(updatedBox.startX, updatedBox.currentX);
    const top = Math.min(updatedBox.startY, updatedBox.currentY);
    const right = Math.max(updatedBox.startX, updatedBox.currentX);
    const bottom = Math.max(updatedBox.startY, updatedBox.currentY);

    // Check intersection with each icon
    const intersected: string[] = [];
    desktopItems.forEach((item) => {
      const el = iconRefs.current[item.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        const isOverlap = !(
          rect.right < left ||
          rect.left > right ||
          rect.bottom < top ||
          rect.top > bottom
        );
        if (isOverlap) {
          intersected.push(item.id);
        }
      }
    });

    setSelectedIds(intersected);
  };

  const handlePointerUp = () => {
    setSelectionBox(null);
  };

  const handleIconClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedIds([id]);
  };

  const handleIconDoubleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    useWindowStore.getState().openWindow(id);
  };

  // Render rubber-band selection box style
  const selectionStyle = selectionBox
    ? {
        left: Math.min(selectionBox.startX, selectionBox.currentX),
        top: Math.min(selectionBox.startY, selectionBox.currentY),
        width: Math.abs(selectionBox.currentX - selectionBox.startX),
        height: Math.abs(selectionBox.currentY - selectionBox.startY),
      }
    : null;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="absolute inset-0 pt-[calc(var(--topbar-height)+16px)] pb-24 px-6 select-none pointer-events-auto"
    >
      {/* Desktop Icons Grid */}
      <div className="grid grid-flow-col grid-rows-4 gap-4 w-fit pt-2 z-10 relative">
        {desktopItems.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <button
              key={item.id}
              ref={(el) => {
                iconRefs.current[item.id] = el;
              }}
              type="button"
              onClick={(e) => handleIconClick(e, item.id)}
              onDoubleClick={(e) => handleIconDoubleClick(e, item.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg w-24 text-center transition-all duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ubuntu-orange)]",
                isSelected
                  ? "bg-white/20 shadow-sm backdrop-blur-xs ring-1 ring-white/30"
                  : "hover:bg-white/10"
              )}
            >
              <AppIcon id={item.id} size={44} className="mb-1.5 pointer-events-none" />
              <span className="text-xs font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight line-clamp-1 pointer-events-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Marquee Rubber-Band Selection Rectangle */}
      {selectionStyle && selectionStyle.width > 2 && selectionStyle.height > 2 && (
        <div
          style={selectionStyle}
          className="fixed pointer-events-none z-[9000] bg-[var(--ubuntu-orange)]/15 border border-[var(--ubuntu-orange)]/70 rounded-xs"
        />
      )}
    </div>
  );
}

