"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export interface AppIconProps {
  id: string;
  size?: number;
  className?: string;
}

const ICON_MAP: Record<string, string> = {
  terminal: "/icons/terminal.png",
  files: "/icons/files.png",
  about: "/icons/about.png",
  projects: "/icons/projects.png",
  skills: "/icons/skills.png",
  resume: "/icons/resume.png",
  mail: "/icons/mail.png",
  settings: "/icons/settings.png",
  trash: "/icons/trash.png",
  browser: "/icons/browser.png",
  vscode: "/icons/vscode.png",
  apps: "/icons/apps.png",
  welcome: "/icons/welcome.png",
};

export function AppIcon({ id, size = 40, className }: AppIconProps) {
  const iconSrc = ICON_MAP[id] || ICON_MAP.about;

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "relative flex items-center justify-center shrink-0 select-none",
        className
      )}
    >
      <Image
        src={iconSrc}
        alt=""
        width={size}
        height={size}
        priority={size >= 40}
        className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-150"
      />
    </div>
  );
}
