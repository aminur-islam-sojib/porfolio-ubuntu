"use client";

import * as React from "react";
import { useWindowStore } from "@/store/windows";
import {
  Folder,
  FileText,
  Home,
  ChevronRight,
  HardDrive,
  FileCode,
} from "lucide-react";

interface FileItem {
  name: string;
  type: "folder" | "file";
  size?: string;
  actionAppId?: string;
}

export default function FilesApp() {
  const [currentFolder, setCurrentFolder] = React.useState<"home" | "documents" | "projects">("home");

  const filesByFolder: Record<string, FileItem[]> = {
    home: [
      { name: "Documents", type: "folder" },
      { name: "Projects", type: "folder", actionAppId: "projects" },
      { name: "README.md", type: "file", size: "1.4 KB" },
      { name: "Resume.pdf", type: "file", size: "124 KB", actionAppId: "resume" },
    ],
    documents: [
      { name: "Resume.pdf", type: "file", size: "124 KB", actionAppId: "resume" },
      { name: "Developer_Bio.md", type: "file", size: "3.2 KB" },
      { name: "Certifications.txt", type: "file", size: "850 B" },
    ],
    projects: [
      { name: "ubuntu-portfolio", type: "file", size: "Next.js 16", actionAppId: "projects" },
      { name: "ecommerce-platform", type: "file", size: "Node.js", actionAppId: "projects" },
      { name: "ai-task-assistant", type: "file", size: "Python", actionAppId: "projects" },
    ],
  };

  const currentFiles = filesByFolder[currentFolder] || filesByFolder.home;

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder") {
      const lower = item.name.toLowerCase();
      if (lower in filesByFolder) {
        setCurrentFolder(lower as "home" | "documents" | "projects");
      }
    } else if (item.actionAppId) {
      useWindowStore.getState().openWindow(item.actionAppId);
    }
  };

  return (
    <div className="h-full w-full flex bg-[var(--color-window-bg)] text-[var(--color-text-primary)] font-sans text-xs select-none">
      {/* Left Sidebar */}
      <div className="w-36 sm:w-48 bg-[var(--color-window-header)] border-r border-[var(--color-border-subtle)] p-3 space-y-4 shrink-0">
        <div className="space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] px-2 block">
            Places
          </span>
          <button
            type="button"
            onClick={() => setCurrentFolder("home")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
              currentFolder === "home"
                ? "bg-[var(--ubuntu-orange)] text-white font-semibold"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-hover)]"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentFolder("documents")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
              currentFolder === "documents"
                ? "bg-[var(--ubuntu-orange)] text-white font-semibold"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-hover)]"
            }`}
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Documents</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentFolder("projects")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
              currentFolder === "projects"
                ? "bg-[var(--ubuntu-orange)] text-white font-semibold"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-hover)]"
            }`}
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Projects</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Breadcrumb Path Bar */}
        <div className="h-10 px-4 bg-[var(--color-window-header-inactive)] border-b border-[var(--color-border-subtle)] flex items-center gap-2 text-[var(--color-text-secondary)] text-xs">
          <HardDrive className="w-4 h-4 text-[var(--color-text-muted)]" />
          <button
            type="button"
            onClick={() => setCurrentFolder("home")}
            className="hover:text-[var(--color-text-primary)] transition-colors"
          >
            home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
          <span className="text-[var(--color-text-primary)] font-medium capitalize">{currentFolder}</span>
        </div>

        {/* Files Grid */}
        <div className="flex-1 p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 content-start overflow-y-auto">
          {currentFiles.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleItemClick(item)}
              className="p-4 rounded-xl hover:bg-[var(--color-card-hover)] active:bg-[var(--color-card-active)] transition-all flex flex-col items-center text-center gap-2 group"
            >
              {item.type === "folder" ? (
                <Folder className="w-12 h-12 text-amber-400 group-hover:scale-105 transition-transform" />
              ) : item.name.endsWith(".pdf") ? (
                <FileText className="w-12 h-12 text-red-400 group-hover:scale-105 transition-transform" />
              ) : (
                <FileCode className="w-12 h-12 text-sky-400 group-hover:scale-105 transition-transform" />
              )}
              <div>
                <span className="font-medium text-[var(--color-text-primary)] block truncate max-w-[120px]">
                  {item.name}
                </span>
                {item.size && (
                  <span className="text-[10px] text-[var(--color-text-muted)] block">{item.size}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
