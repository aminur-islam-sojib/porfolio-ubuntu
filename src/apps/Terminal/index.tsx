"use client";

import * as React from "react";
import { executeCommand, autoCompleteCommand } from "@/apps/Terminal/commands";

interface HistoryEntry {
  cmd: string;
  output: string;
}

export default function TerminalApp() {
  const [inputVal, setInputVal] = React.useState("");
  const [entries, setEntries] = React.useState<HistoryEntry[]>([
    {
      cmd: "neofetch",
      output: executeCommand("neofetch").output,
    },
  ]);

  const [commandHistory, setCommandHistory] = React.useState<string[]>(["neofetch"]);
  const [historyPointer, setHistoryPointer] = React.useState<number>(-1);

  const bottomRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-scroll on new entries
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 1. Tab auto-completion
    if (e.key === "Tab") {
      e.preventDefault();
      const completed = autoCompleteCommand(inputVal);
      if (completed) {
        setInputVal(completed);
      }
      return;
    }

    // 2. Up Arrow (previous history)
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer =
        historyPointer === -1
          ? commandHistory.length - 1
          : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputVal(commandHistory[nextPointer]);
      return;
    }

    // 3. Down Arrow (next history)
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === -1) return;
      if (historyPointer < commandHistory.length - 1) {
        const nextPointer = historyPointer + 1;
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer]);
      } else {
        setHistoryPointer(-1);
        setInputVal("");
      }
      return;
    }

    // 4. Enter key (execute command)
    if (e.key === "Enter") {
      const trimmed = inputVal.trim();
      if (!trimmed) {
        setEntries((prev) => [...prev, { cmd: "", output: "" }]);
        return;
      }

      const res = executeCommand(trimmed);

      // Append to command history
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryPointer(-1);

      if (res.shouldClear) {
        setEntries([]);
      } else {
        setEntries((prev) => [...prev, { cmd: trimmed, output: res.output }]);
      }

      setInputVal("");
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full w-full bg-[#300A24] text-[#47D472] font-mono text-xs sm:text-sm p-4 overflow-y-auto select-text cursor-text leading-relaxed"
    >
      <div className="space-y-3 min-h-full flex flex-col justify-between">
        <div className="space-y-3">
          <p className="text-white/60 text-xs select-none">
            Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic x86_64).
            <br />
            Type <span className="text-[var(--ubuntu-orange)] font-bold">&apos;help&apos;</span> to explore portfolio commands or press <span className="text-amber-400 font-bold">&apos;Tab&apos;</span> to auto-complete.
          </p>

          {entries.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.cmd && (
                <div className="flex items-center gap-2">
                  <span className="text-[var(--ubuntu-orange)] font-semibold select-none">
                    sojib@ubuntu:~$
                  </span>
                  <span className="text-white font-medium">{item.cmd}</span>
                </div>
              )}
              {item.output && (
                <pre className="text-[#47D472] whitespace-pre-wrap font-mono leading-relaxed pl-1">
                  {item.output}
                </pre>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[var(--ubuntu-orange)] font-semibold select-none">
              sojib@ubuntu:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Terminal prompt"
              className="flex-1 bg-transparent text-white outline-none border-none font-mono caret-[var(--ubuntu-orange)]"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
