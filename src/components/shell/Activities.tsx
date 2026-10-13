"use client";

import * as React from "react";
import { useSystemStore } from "@/store/system";
import { useWindowStore } from "@/store/windows";
import { APP_REGISTRY, AppMetadata } from "@/apps/registry";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { AppIcon } from "@/components/shell/AppIcon";
import { Search, Layers, Cpu, X } from "lucide-react";

export function Activities() {
  const isActivitiesOpen = useSystemStore((state) => state.isActivitiesOpen);
  const openWindowIds = useWindowStore((state) => state.openWindowIds);
  const windows = useWindowStore((state) => state.windows);

  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isActivitiesOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isActivitiesOpen]);

  React.useEffect(() => {
    if (!isActivitiesOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        useSystemStore.getState().setActivitiesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActivitiesOpen]);

  if (!isActivitiesOpen) return null;

  const handleOpenApp = (id: string) => {
    setQuery("");
    useWindowStore.getState().openWindow(id);
    useSystemStore.getState().setActivitiesOpen(false);
  };

  const handleClose = () => {
    setQuery("");
    useSystemStore.getState().setActivitiesOpen(false);
  };

  // Search filtering
  const matchingApps = Object.values(APP_REGISTRY).filter((app) =>
    app.title.toLowerCase().includes(query.toLowerCase())
  );

  const matchingProjects = query
    ? projectsData.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const matchingSkills = query
    ? skillsData.flatMap((cat) =>
        cat.skills.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div
      role="dialog"
      aria-label="Activities Overview"
      className="fixed inset-0 z-[9995] bg-black/70 backdrop-blur-2xl flex flex-col items-center pt-14 pb-8 px-6 select-none animate-in fade-in duration-150 overflow-y-auto text-white"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-4xl flex flex-col items-center space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Bar */}
        <div className="relative w-full max-w-lg">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search apps, projects, and skills..."
            aria-label="Search applications and projects"
            className="w-full h-12 pl-12 pr-10 rounded-full bg-white/10 border border-white/15 text-sm text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-[var(--ubuntu-orange)] focus:bg-white/15 transition-all shadow-xl"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Query Results View */}
        {query ? (
          <div className="w-full space-y-6 animate-in fade-in duration-100">
            {/* Apps section */}
            {matchingApps.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Applications
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {matchingApps.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => handleOpenApp(app.id)}
                      className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center gap-3 text-left"
                    >
                      <AppIcon id={app.id} size={36} />
                      <span className="text-xs font-semibold text-white truncate">
                        {app.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Projects section */}
            {matchingProjects.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Portfolio Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchingProjects.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => handleOpenApp("projects")}
                      className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-start gap-3 text-left group"
                    >
                      <Layers className="w-5 h-5 text-[var(--ubuntu-orange)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-white group-hover:text-[var(--ubuntu-orange)] transition-colors block">
                          {proj.title}
                        </span>
                        <span className="text-[11px] text-zinc-300 block line-clamp-1">
                          {proj.tagline}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Skills section */}
            {matchingSkills.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Technical Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {matchingSkills.map((skill, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOpenApp("skills")}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-zinc-200 flex items-center gap-2"
                    >
                      <Cpu className="w-3.5 h-3.5 text-teal-400" />
                      <span>{skill.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Default Workspace / Open Windows Overview */
          <div className="w-full space-y-8 flex flex-col items-center">
            {/* Open Windows Miniature Cards */}
            <div className="w-full space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center">
                Workspace ({openWindowIds.length} Active {openWindowIds.length === 1 ? "Window" : "Windows"})
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {openWindowIds.map((id) => {
                  const win = windows[id];
                  if (!win) return null;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleOpenApp(id)}
                      className="w-56 h-36 rounded-xl bg-[var(--color-popover-bg)]/90 border border-[var(--color-border-subtle)] hover:border-[var(--ubuntu-orange)] hover:scale-105 transition-all shadow-xl p-3 flex flex-col justify-between text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <AppIcon id={id} size={20} className="shadow-none rounded-[4px]" />
                        <span className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                          {win.title}
                        </span>
                      </div>
                      <div className="p-2 rounded bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] text-[10px] text-[var(--color-text-muted)] text-center">
                        Click to Focus Window
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pinned Applications Strip */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
              {Object.values(APP_REGISTRY)
                .filter((app) => app.isPinned)
                .map((app: AppMetadata) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => handleOpenApp(app.id)}
                    className="p-2 rounded-xl hover:bg-white/15 transition-all group flex flex-col items-center"
                    aria-label={`Open ${app.title}`}
                  >
                    <AppIcon id={app.id} size={44} className="group-hover:scale-110 transition-transform" />
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
