import { ComponentType } from "react";

export interface AppMetadata {
  id: string;
  title: string;
  icon: string; // Icon identifier or path
  category: "system" | "portfolio" | "tools";
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  minHeight: number;
  isPinned: boolean; // Pinned to the Ubuntu Dock
  component?: ComponentType<unknown>;
}

export const APP_REGISTRY: Record<string, AppMetadata> = {
  about: {
    id: "about",
    title: "About Me",
    icon: "info",
    category: "portfolio",
    defaultWidth: 720,
    defaultHeight: 520,
    minWidth: 480,
    minHeight: 380,
    isPinned: true,
  },
  projects: {
    id: "projects",
    title: "Projects",
    icon: "folder-git",
    category: "portfolio",
    defaultWidth: 840,
    defaultHeight: 600,
    minWidth: 520,
    minHeight: 400,
    isPinned: true,
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    icon: "terminal",
    category: "tools",
    defaultWidth: 760,
    defaultHeight: 480,
    minWidth: 420,
    minHeight: 300,
    isPinned: true,
  },
  files: {
    id: "files",
    title: "Files",
    icon: "folder",
    category: "system",
    defaultWidth: 780,
    defaultHeight: 540,
    minWidth: 480,
    minHeight: 360,
    isPinned: true,
  },
  skills: {
    id: "skills",
    title: "Skills & Tech",
    icon: "cpu",
    category: "portfolio",
    defaultWidth: 720,
    defaultHeight: 520,
    minWidth: 460,
    minHeight: 380,
    isPinned: true,
  },
  resume: {
    id: "resume",
    title: "Resume",
    icon: "file-text",
    category: "portfolio",
    defaultWidth: 760,
    defaultHeight: 640,
    minWidth: 500,
    minHeight: 420,
    isPinned: true,
  },
  mail: {
    id: "mail",
    title: "Contact / Mail",
    icon: "mail",
    category: "tools",
    defaultWidth: 680,
    defaultHeight: 500,
    minWidth: 440,
    minHeight: 360,
    isPinned: true,
  },
  settings: {
    id: "settings",
    title: "Settings",
    icon: "settings",
    category: "system",
    defaultWidth: 680,
    defaultHeight: 480,
    minWidth: 440,
    minHeight: 360,
    isPinned: false,
  },
  trash: {
    id: "trash",
    title: "Trash",
    icon: "trash",
    category: "system",
    defaultWidth: 560,
    defaultHeight: 400,
    minWidth: 380,
    minHeight: 280,
    isPinned: true,
  },
};

