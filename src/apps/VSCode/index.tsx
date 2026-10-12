"use client";

import * as React from "react";
import { Folder, FileCode, GitBranch, ChevronRight, ChevronDown, Check } from "lucide-react";

interface CodeFile {
  name: string;
  path: string;
  language: string;
  content: string;
}

const SAMPLE_FILES: CodeFile[] = [
  {
    name: "windows.ts",
    path: "src/store/windows.ts",
    language: "typescript",
    content: `// Zustand Window Manager — 60fps Single Source of Truth
export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  snapZone: SnapZone;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export const useWindowStore = create<WindowStoreState>((set, get) => ({
  windows: initialWindows,
  openWindowIds: ["about"],
  activeId: "about",

  openWindow: (id: string) => {
    // Hardware-accelerated window spawn & cascade calculation
    const nextZ = get().highestZIndex + 1;
    set({ activeId: id, highestZIndex: nextZ });
  },
}));`,
  },
  {
    name: "snap.ts",
    path: "src/lib/snap.ts",
    language: "typescript",
    content: `// Aero Snap & Tiling Geometry Calculations
export function getSnapZone(clientX: number, clientY: number, bounds: DesktopBounds): SnapZone {
  const isNearLeft = clientX <= bounds.x + EDGE_THRESHOLD;
  const isNearRight = clientX >= bounds.x + bounds.width - EDGE_THRESHOLD;
  const isNearTop = clientY <= bounds.y + EDGE_THRESHOLD;

  if (isNearTop) return "maximize";
  if (isNearLeft) return "left";
  if (isNearRight) return "right";
  return "none";
}`,
  },
  {
    name: "projects.ts",
    path: "src/data/projects.ts",
    language: "typescript",
    content: `// Decoupled Portfolio Projects Content
export const projectsData: Project[] = [
  {
    id: "project-1",
    slug: "ubuntu-portfolio",
    title: "Ubuntu Web OS Portfolio",
    category: "full-stack",
    technologies: ["Next.js 16", "TypeScript", "Zustand", "Tailwind CSS"],
    metrics: ["60fps window manager", "Zero layout shift", "Mobile touch shell"],
  },
];`,
  },
];

export default function VSCodeApp() {
  const [activeFile, setActiveFile] = React.useState<CodeFile>(SAMPLE_FILES[0]);
  const [isFolderOpen, setIsFolderOpen] = React.useState(true);

  return (
    <div className="h-full w-full flex flex-col bg-[#1E1E1E] text-white font-mono text-xs select-none">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Explorer */}
        <div className="w-52 bg-[#181818] border-r border-white/10 flex flex-col shrink-0">
          <div className="h-9 px-3 border-b border-white/5 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-zinc-400">
            <span>Explorer</span>
          </div>

          <div className="p-2 space-y-1">
            <button
              type="button"
              onClick={() => setIsFolderOpen(!isFolderOpen)}
              className="flex items-center gap-1.5 w-full text-left py-1 text-zinc-300 hover:text-white"
            >
              {isFolderOpen ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
              <Folder className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-xs">portfolio-ubuntu</span>
            </button>

            {isFolderOpen && (
              <div className="pl-4 space-y-0.5">
                {SAMPLE_FILES.map((file) => {
                  const isActive = activeFile.name === file.name;
                  return (
                    <button
                      key={file.name}
                      type="button"
                      onClick={() => setActiveFile(file)}
                      className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded transition-colors text-xs ${
                        isActive
                          ? "bg-white/15 text-white font-medium"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Code Editor View */}
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden">
          {/* Active File Tab Bar */}
          <div className="h-9 bg-[#252526] border-b border-white/5 flex items-center px-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E1E1E] border-t-2 border-[var(--ubuntu-orange)] text-white text-xs">
              <FileCode className="w-3.5 h-3.5 text-sky-400" />
              <span>{activeFile.name}</span>
            </div>
          </div>

          {/* Code Content with Line Numbers */}
          <div className="flex-1 p-4 overflow-auto flex text-xs leading-relaxed select-text font-mono">
            {/* Line Numbers */}
            <div className="pr-4 border-r border-white/10 text-zinc-600 select-none text-right">
              {activeFile.content.split("\n").map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>

            {/* Code Lines */}
            <pre className="pl-4 text-zinc-200 whitespace-pre font-mono flex-1">
              {activeFile.content}
            </pre>
          </div>
        </div>
      </div>

      {/* VS Code Bottom Status Bar */}
      <div className="h-6 bg-[#007ACC] text-white px-3 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            <span>main</span>
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>0 Errors</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>TypeScript</span>
        </div>
      </div>
    </div>
  );
}

