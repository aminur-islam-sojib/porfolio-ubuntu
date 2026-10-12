"use client";

import * as React from "react";
import Link from "next/link";
import { Terminal, FolderKanban, FileText, Sparkles, Layout, ExternalLink, ShieldCheck } from "lucide-react";
import { useWindowStore } from "@/store/windows";
import { profileData } from "@/data/profile";

export default function WelcomeApp() {
  const openWindow = useWindowStore((state) => state.openWindow);

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none overflow-y-auto">
      {/* Banner */}
      <div className="relative h-28 bg-gradient-to-r from-[#2C001E] via-[#77216F] to-[#E95420] p-6 flex flex-col justify-end shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--ubuntu-orange)] inline-block ring-2 ring-white/50" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/80">
            Ubuntu 24.04 LTS
          </span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Welcome to {profileData.name}&apos;s Portfolio
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-5 flex-1">
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Explore this full-stack developer portfolio built to look, feel, and function like Ubuntu 24.04 Desktop.
          Every component follows authentic GNOME and Yaru design specs.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--ubuntu-orange)]/20 text-[var(--ubuntu-orange)] flex items-center justify-center">
              <Layout className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-semibold text-white">Window Manager</h3>
            <p className="text-[11px] text-zinc-400">
              Drag, resize, minimize, maximize, and snap windows to edges.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-semibold text-white">Linux Terminal</h3>
            <p className="text-[11px] text-zinc-400">
              Run commands like <code className="text-emerald-300">help</code>, <code className="text-emerald-300">skills</code>, and <code className="text-emerald-300">projects</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-semibold text-white">Activities Search</h3>
            <p className="text-[11px] text-zinc-400">
              Press the <kbd className="px-1 py-0.5 rounded bg-black/40 text-[10px]">Super</kbd> key to search apps and skills.
            </p>
          </div>
        </div>

        {/* Recruiter Fast Access */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-semibold text-white">Recruiter Direct Actions</h4>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => openWindow("projects")}
              className="px-3 py-1.5 rounded-lg bg-[var(--ubuntu-orange)] hover:bg-[#ff6d38] text-xs font-medium text-white flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Browse Projects</span>
            </button>

            <button
              type="button"
              onClick={() => openWindow("resume")}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume</span>
            </button>

            <button
              type="button"
              onClick={() => openWindow("mail")}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Contact Sojib</span>
            </button>

            <Link
              href="/classic"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors ml-auto"
            >
              <span>Classic View</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

