"use client";

import * as React from "react";
import { Folder, FileText, HardDrive } from "lucide-react";

export default function FilesApp() {
  const folders = [
    { name: "Projects", items: "4 projects", icon: Folder, color: "text-amber-400" },
    { name: "Documents", items: "Resume.pdf, Bio.md", icon: Folder, color: "text-amber-400" },
    { name: "Skills", items: "Frontend, Backend", icon: Folder, color: "text-amber-400" },
    { name: "Certificates", items: "AWS, Node.js", icon: Folder, color: "text-amber-400" },
    { name: "README.md", items: "1.2 KB", icon: FileText, color: "text-zinc-300" },
  ];

  return (
    <div className="h-full flex flex-col font-sans text-white">
      {/* Top Location Bar */}
      <div className="h-10 px-4 bg-black/20 border-b border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-400">/home/sojib-ahmed</span>
        </div>
        <span className="text-zinc-400 text-[11px]">{folders.length} items</span>
      </div>

      {/* Grid of folders & files */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {folders.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              type="button"
              className="p-4 rounded-xl hover:bg-white/10 active:bg-white/15 transition-colors flex flex-col items-center text-center gap-2 group"
            >
              <Icon className={`w-12 h-12 ${item.color} group-hover:scale-105 transition-transform`} />
              <div>
                <span className="text-xs font-medium block truncate max-w-[120px]">
                  {item.name}
                </span>
                <span className="text-[10px] text-zinc-400 block">{item.items}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

