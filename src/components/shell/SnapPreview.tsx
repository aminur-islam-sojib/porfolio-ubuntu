"use client";

import * as React from "react";
import { useWindowStore } from "@/store/windows";
import { getSnapBounds } from "@/lib/snap";
import { cn } from "@/lib/cn";

export function SnapPreview() {
  const previewSnapZone = useWindowStore((state) => state.previewSnapZone);

  if (previewSnapZone === "none") {
    return null;
  }

  const snapBounds = getSnapBounds(previewSnapZone);
  if (!snapBounds) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        left: snapBounds.x,
        top: snapBounds.y,
        width: snapBounds.width,
        height: snapBounds.height,
      }}
      className={cn(
        "fixed pointer-events-none z-[9900] bg-[var(--ubuntu-orange)]/20 border-2 border-[var(--ubuntu-orange)]/70 backdrop-blur-xs shadow-[0_0_40px_rgba(233,84,32,0.3)] transition-all duration-150 animate-in fade-in zoom-in-[0.99]",
        previewSnapZone === "maximize"
          ? "rounded-none"
          : "rounded-[var(--window-radius)]"
      )}
    />
  );
}

