"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface BrandLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  glow?: boolean;
}

/**
 * Personal Brand Logo for Sojib Ahmed
 * Scalable SVG monogram with optional luminous glow
 */
export function BrandLogo({ className, glow = false, ...props }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 723 627"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-auto h-auto transition-transform duration-300",
        glow && "drop-shadow-[0_0_18px_rgba(255,255,255,0.55)]",
        className
      )}
      aria-label="Sojib Ahmed Brand Logo"
      role="img"
      {...props}
    >
      <path d="M64.5 518L0 627H558.5L398 354H284L431 115L365 0L91 461H333L367.5 518H64.5Z" />
      <path d="M723 627H595L418 322H341.5L448.5 145L723 627Z" />
    </svg>
  );
}

