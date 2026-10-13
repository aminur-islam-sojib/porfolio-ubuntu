"use client";

import * as React from "react";
import Image from "next/image";
import { useSystemStore } from "@/store/system";
import { UBUNTU_WALLPAPERS } from "@/data/wallpapers";

export function Wallpaper() {
  const wallpaper = useSystemStore((state) => state.wallpaper);
  const theme = useSystemStore((state) => state.theme);

  // Determine current wallpaper image URL
  const currentSrc = React.useMemo(() => {
    if (!wallpaper || typeof wallpaper !== "string") {
      return theme === "light"
        ? "/wallpapers/noble-light.webp"
        : "/wallpapers/noble-dark.webp";
    }

    // Check if it's a built-in wallpaper
    const found = UBUNTU_WALLPAPERS.find((w) => w.id === wallpaper);
    if (found) {
      if (found.isDynamic) {
        return theme === "light" ? found.lightSrc! : found.darkSrc!;
      }
      return found.src;
    }

    // Custom data URI, local path, or external URL
    if (
      wallpaper.startsWith("/") ||
      wallpaper.startsWith("data:") ||
      wallpaper.startsWith("http")
    ) {
      return wallpaper;
    }

    // Default fallback
    return theme === "light"
      ? "/wallpapers/noble-light.webp"
      : "/wallpapers/noble-dark.webp";
  }, [wallpaper, theme]);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* 1. Underlying fallback Ubuntu Noble Aubergine Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#77216F] via-[#5E2750] to-[#2C001E]" />

      {/* 2. Authentic Ubuntu Wallpaper Image with unoptimized flag for instant updates & data-url support */}
      {currentSrc && (
        <div
          key={currentSrc}
          className="absolute inset-0 transition-opacity duration-300 ease-in-out"
        >
          <Image
            src={currentSrc}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
        </div>
      )}

      {/* 3. Subtle ambient dark vignette for top bar and dock contrast */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35" />
    </div>
  );
}
