"use client";

import * as React from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { ExternalLink, GitBranch, X, Layers, CheckCircle } from "lucide-react";

export interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  return (
    <div
      role="dialog"
      aria-label={`${project.title} Details`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#242424] border border-white/10 rounded-[var(--window-radius)] shadow-[var(--shadow-window)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="h-[var(--titlebar-height)] px-4 bg-[#2E2E2E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--ubuntu-orange)]" />
            <span className="text-xs font-semibold text-white truncate">
              {project.title} — Project Details
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-white text-xs sm:text-sm">
          {/* Project Image Banner */}
          {project.thumbnailUrl && (
            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-black/40 border border-white/5">
              <Image
                src={project.thumbnailUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className="object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--ubuntu-orange)]/20 text-[var(--ubuntu-orange)] border border-[var(--ubuntu-orange)]/30">
                {project.category}
              </span>
              {project.featured && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Featured
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-xs text-zinc-300">{project.tagline}</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Overview & Architecture
            </h3>
            <div className="p-4 rounded-xl bg-black/30 border border-white/5 leading-relaxed text-zinc-200">
              {project.description}
            </div>
          </div>

          {/* Key Metrics / Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Key Performance Metrics & Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-zinc-200"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Stack */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[var(--control-radius)] bg-white/10 text-white font-medium text-xs border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-[#1E1E1E] border-t border-white/10 flex items-center justify-end gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm" className="gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </Button>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" className="gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Application</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
