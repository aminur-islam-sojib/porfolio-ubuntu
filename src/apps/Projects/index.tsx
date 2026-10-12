"use client";

import * as React from "react";
import { projectsData } from "@/data/projects";
import { ExternalLink, GitBranch, Layers } from "lucide-react";

export default function ProjectsApp() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto font-sans text-white">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Featured Projects</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Full-stack systems, scalable web apps, and open-source software
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
          <Layers className="w-3.5 h-3.5 text-[var(--ubuntu-orange)]" />
          <span>{projectsData.length} Projects</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="p-5 rounded-[var(--window-radius)] bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--ubuntu-orange)]/20 text-[var(--ubuntu-orange)] border border-[var(--ubuntu-orange)]/30">
                  {project.category}
                </span>
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <GitBranch className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <h2 className="text-base font-bold text-white">{project.title}</h2>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/30 text-zinc-300 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
