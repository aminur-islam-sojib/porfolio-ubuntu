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
        className="w-full max-w-2xl bg-[var(--color-window-bg)] border border-[var(--color-border-subtle)] rounded-[var(--window-radius)] shadow-[var(--shadow-window)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="h-[var(--titlebar-height)] px-4 bg-[var(--color-window-header)] border-b border-[var(--color-border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--ubuntu-orange)]" />
            <span className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
              {project.title} — Project Details
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-6 h-6 rounded-full hover:bg-[var(--color-card-hover)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-[var(--color-text-primary)] text-xs sm:text-sm">
          {/* Project Image Banner */}
          {project.thumbnailUrl && (
            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)]">
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
            <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {project.title}
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)]">{project.tagline}</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Overview & Architecture
            </h3>
            <div className="p-4 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] leading-relaxed text-[var(--color-text-secondary)]">
              {project.description}
            </div>
          </div>

          {/* Key Metrics / Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Key Performance Metrics & Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] flex items-center gap-2.5 text-xs text-[var(--color-text-primary)]"
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] text-[var(--color-text-primary)] font-medium text-xs border border-[var(--color-border-subtle)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-[var(--color-window-bg)] border-t border-[var(--color-border-subtle)] flex items-center justify-end gap-3">
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
