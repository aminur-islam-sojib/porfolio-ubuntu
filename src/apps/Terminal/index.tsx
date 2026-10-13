"use client";

import * as React from "react";
import { executeCommand, autoCompleteCommand } from "@/apps/Terminal/commands";
import { formatAnsiToReact } from "@/apps/Terminal/ansi";
import { TerminalShooter } from "@/apps/Terminal/TerminalShooter";

interface HistoryEntry {
  cmd: string;
  output: string;
}

export default function TerminalApp() {
  const [isGameActive, setIsGameActive] = React.useState(false);
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

      if (res.action === "game") {
        setEntries((prev) => [...prev, { cmd: trimmed, output: res.output }]);
        setIsGameActive(true);
        setInputVal("");
        return;
      }

      if (res.shouldClear) {
        setEntries([]);
      } else {
        setEntries((prev) => [...prev, { cmd: trimmed, output: res.output }]);
      }

      setInputVal("");
    }
  };

  const handleExitGame = (score: number) => {
    setIsGameActive(false);
    setEntries((prev) => [
      ...prev,
      {
        cmd: "exit game",
        output: `[SESSION: Arcade Stopped]\nMission finished! Final Score: ${score} pts.\nType 'game' or 'shooter' to start another round anytime.`,
      },
    ]);
  };

  if (isGameActive) {
    return <TerminalShooter onExit={handleExitGame} />;
  }

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
            Type <span className="text-[var(--ubuntu-orange)] font-bold">&apos;game&apos;</span> to play Space Invaders or <span className="text-amber-400 font-bold">&apos;help&apos;</span> to view all commands.
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
                  {formatAnsiToReact(item.output)}
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

          {/* Quick Command Pills for Touch & Mobile Devices (5-6 suggestions) */}
          <div className="pt-3 border-t border-white/5 flex items-center gap-2 overflow-x-auto select-none w-full">
            {[
              "game 🚀",
              "petsay",
              "neofetch",
              "skills",
              "projects",
              "clear",
            ].map((qCmd) => (
              <button
                key={qCmd}
                type="button"
                onClick={() => {
                  const cmdToRun = qCmd.startsWith("game") ? "game" : qCmd;
                  if (cmdToRun === "game") {
                    const res = executeCommand("game");
                    setEntries((prev) => [...prev, { cmd: "game", output: res.output }]);
                    setCommandHistory((prev) => [...prev, "game"]);
                    setIsGameActive(true);
                    return;
                  }
                  if (cmdToRun === "clear") {
                    setEntries([]);
                    return;
                  }
                  const res = executeCommand(cmdToRun);
                  setEntries((prev) => [...prev, { cmd: cmdToRun, output: res.output }]);
                  setCommandHistory((prev) => [...prev, cmdToRun]);
                }}
                className={`inline-flex items-center justify-center text-center leading-none px-3 py-1.5 rounded-md text-[11px] font-mono border transition-colors whitespace-nowrap shadow-xs ${
                  qCmd.startsWith("game")
                    ? "bg-[var(--ubuntu-orange)]/20 hover:bg-[var(--ubuntu-orange)]/35 text-[var(--ubuntu-orange)] font-bold border-[var(--ubuntu-orange)]/40"
                    : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border-white/10"
                }`}
              >
                <span className="inline-flex items-center justify-center text-center leading-none">
                  {qCmd}
                </span>
              </button>
            ))}
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
