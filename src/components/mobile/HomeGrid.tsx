"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ExternalLink, ShieldCheck } from "lucide-react";
import { APP_REGISTRY, AppMetadata } from "@/apps/registry";
import { AppIcon } from "@/components/shell/AppIcon";
import { profileData } from "@/data/profile";

export interface HomeGridProps {
  onOpenApp: (appId: string) => void;
  openAppIds: string[];
}

export function HomeGrid({ onOpenApp, openAppIds }: HomeGridProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const allApps = Object.values(APP_REGISTRY);

  const filteredApps = searchQuery
    ? allApps.filter((app) =>
        app.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allApps;

  const pinnedDockAppIds = ["projects", "resume", "mail", "terminal"];
  const pinnedApps = pinnedDockAppIds
    .map((id) => APP_REGISTRY[id])
    .filter(Boolean) as AppMetadata[];

  return (
    <div
      role="region"
      aria-label="Mobile Home Screen"
      className="flex-1 w-full flex flex-col justify-between p-4 overflow-y-auto select-none font-sans"
    >
      {/* Top Header & Search Bar */}
      <div className="space-y-4 pt-2">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-white tracking-tight">
            {profileData.name}
          </h1>
          <p className="text-xs text-[var(--ubuntu-orange)] font-medium">
            {profileData.title}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-sm mx-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps and portfolio..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
          />
        </div>

        {/* Recruiter Badge */}
        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 max-w-sm mx-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px]">Recruiter Quick Access</span>
          </div>
          <Link
            href="/classic"
            className="text-[11px] text-[var(--ubuntu-orange)] hover:underline flex items-center gap-1"
          >
            <span>Classic View</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main App Grid */}
      <div className="py-6">
        <div className="grid grid-cols-4 gap-4 justify-items-center max-w-sm mx-auto">
          {filteredApps.map((app) => {
            const isOpen = openAppIds.includes(app.id);
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onOpenApp(app.id)}
                className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] w-18"
              >
                <div className="relative mb-1.5">
                  <AppIcon
                    id={app.id}
                    size={48}
                    className="shadow-md group-hover:scale-105 transition-transform"
                  />
                  {isOpen && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--ubuntu-orange)] shadow" />
                  )}
                </div>
                <span className="text-[10px] font-medium text-white/90 truncate max-w-[64px] text-center leading-tight">
                  {app.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Pinned Glass Dock */}
      <div className="pt-2 pb-4">
        <div className="max-w-xs mx-auto rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 p-2 flex items-center justify-around shadow-2xl">
          {pinnedApps.map((app) => {
            const isOpen = openAppIds.includes(app.id);
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onOpenApp(app.id)}
                className="flex flex-col items-center justify-center p-1.5 rounded-xl hover:bg-white/10 active:scale-90 transition-transform relative group"
                aria-label={app.title}
              >
                <AppIcon id={app.id} size={42} />
                {isOpen && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--ubuntu-orange)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
