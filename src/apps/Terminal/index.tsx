"use client";

import * as React from "react";
import { profileData } from "@/data/profile";

export default function TerminalApp() {
  const [inputVal, setInputVal] = React.useState("");
  const [history, setHistory] = React.useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: "neofetch",
      output: `OS: ${profileData.systemInfo.osName} ${profileData.systemInfo.osVersion}\nHost: Full-Stack Portfolio\nKernel: ${profileData.systemInfo.kernel}\nUptime: ${profileData.systemInfo.uptime}\nPackages: Next.js 16, TypeScript, Tailwind, Zustand\nShell: bash 5.2.21`,
    },
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = inputVal.trim();
      if (!trimmed) return;

      if (trimmed === "clear") {
        setHistory([]);
        setInputVal("");
        return;
      }

      let response = `bash: command not found: ${trimmed}. Type 'help' for available commands.`;
      if (trimmed === "help") {
        response = "Available commands: help, neofetch, clear, whoami, skills, projects, contact";
      } else if (trimmed === "whoami") {
        response = `${profileData.name} — ${profileData.title}`;
      } else if (trimmed === "contact") {
        response = `Email: ${profileData.email}`;
      }

      setHistory((prev) => [...prev, { cmd: trimmed, output: response }]);
      setInputVal("");
    }
  };

  return (
    <div className="h-full w-full bg-[#300A24] text-[#47D472] font-mono text-xs sm:text-sm p-4 overflow-y-auto select-text">
      <div className="space-y-3">
        <p className="text-white/60 text-xs">
          Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic x86_64). Type &apos;help&apos; for commands.
        </p>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[var(--ubuntu-orange)]">sojib@ubuntu:~$</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            <pre className="text-[#47D472] whitespace-pre-wrap leading-relaxed font-mono">
              {item.output}
            </pre>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="text-[var(--ubuntu-orange)]">sojib@ubuntu:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal input"
            className="flex-1 bg-transparent text-white outline-none border-none font-mono caret-[var(--ubuntu-orange)]"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

