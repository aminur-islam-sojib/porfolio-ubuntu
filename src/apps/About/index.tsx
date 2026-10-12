"use client";

import * as React from "react";
import { profileData } from "@/data/profile";
import { Cpu, HardDrive, ShieldCheck, User } from "lucide-react";

export default function AboutApp() {
  const { systemInfo } = profileData;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-2xl mx-auto font-sans text-white">
      {/* Header Info */}
      <div className="flex items-center gap-4 pb-6 border-b border-white/10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E95420] to-[#77216F] flex items-center justify-center shadow-lg border border-white/10 shrink-0">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{profileData.name}</h1>
          <p className="text-xs text-[var(--ubuntu-orange)] font-medium mt-0.5">
            {profileData.title}
          </p>
          <p className="text-xs text-zinc-400 mt-1">{profileData.location}</p>
        </div>
      </div>

      {/* Bio Summary */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          About Developer
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
          {profileData.bio}
        </p>
      </div>

      {/* System Hardware Specs (Ubuntu Settings style) */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          System Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3">
            <Cpu className="w-4 h-4 text-[var(--ubuntu-orange)] shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-400 block text-[11px]">Processor / Engine</span>
              <span className="font-medium text-white">{systemInfo.cpu}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3">
            <HardDrive className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-400 block text-[11px]">Memory & Capacity</span>
              <span className="font-medium text-white">{systemInfo.memory}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-400 block text-[11px]">OS & Architecture</span>
              <span className="font-medium text-white">
                {systemInfo.osName} {systemInfo.osVersion}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3">
            <User className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-400 block text-[11px]">Availability</span>
              <span className="font-medium text-white">{systemInfo.uptime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

