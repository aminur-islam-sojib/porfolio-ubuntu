"use client";

import * as React from "react";
import { profileData } from "@/data/profile";
import { experienceData, educationData } from "@/data/experience";
import { Download, FileText, GraduationCap, Briefcase, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ResumeApp() {
  const [viewMode, setViewMode] = React.useState<"interactive" | "pdf">("interactive");

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto font-sans text-white select-text">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--ubuntu-orange)]/20 border border-[var(--ubuntu-orange)]/30 flex items-center justify-center text-[var(--ubuntu-orange)]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Curriculum Vitae</h1>
            <p className="text-xs text-zinc-400">{profileData.name} — Fullstack Developer</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("interactive")}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === "interactive"
                  ? "bg-white/15 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Interactive View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("pdf")}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === "pdf"
                  ? "bg-white/15 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>PDF Document</span>
            </button>
          </div>

          <a
            href={profileData.resumeUrl}
            download="Sojib_Ahmed_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm" className="flex items-center gap-1.5 h-8">
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </Button>
          </a>
        </div>
      </div>

      {viewMode === "pdf" ? (
        <div className="space-y-3">
          <div className="w-full h-[650px] rounded-[var(--window-radius)] overflow-hidden border border-white/10 bg-[#1e1e1e]">
            <iframe
              src={profileData.resumeUrl}
              title={`${profileData.name} Resume`}
              className="w-full h-full border-none"
            />
          </div>
          <div className="text-center text-xs text-zinc-400">
            <span>Having trouble viewing the embedded PDF? </span>
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ubuntu-orange)] hover:underline inline-flex items-center gap-0.5"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ) : (
        /* Interactive Resume Layout */
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="p-6 rounded-[var(--window-radius)] bg-white/5 border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold">{profileData.name}</h2>
                <p className="text-xs font-medium text-[var(--ubuntu-orange)]">{profileData.title}</p>
              </div>
              <div className="text-xs text-zinc-400 sm:text-right">
                <p>{profileData.email}</p>
                <p>{profileData.phone} • {profileData.location}</p>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-white/5">
              {profileData.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="p-6 rounded-[var(--window-radius)] bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-white/10 pb-2">
              <Briefcase className="w-4 h-4 text-[var(--ubuntu-orange)]" />
              <span>Professional Experience</span>
            </div>

            <div className="space-y-6">
              {experienceData.map((exp) => (
                <div key={exp.id} className="space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-white text-sm">{exp.role}</span>
                    <span className="text-zinc-400 font-mono text-[11px]">{exp.period}</span>
                  </div>
                  <p className="text-[var(--ubuntu-orange)] font-medium">{exp.company} — {exp.location}</p>
                  <p className="text-zinc-300 leading-relaxed">{exp.summary}</p>

                  <ul className="space-y-1 pl-4 list-disc text-zinc-400 pt-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-black/40 text-zinc-300 font-mono text-[10px] border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education History */}
          <div className="p-6 rounded-[var(--window-radius)] bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-white/10 pb-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Education</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1.5 text-xs"
                >
                  <span className="text-[10px] font-mono text-zinc-400 block">{edu.period}</span>
                  <h3 className="font-semibold text-white text-sm">{edu.degree}</h3>
                  <p className="text-[var(--ubuntu-orange)] font-medium">{edu.institution}</p>
                  <p className="text-zinc-400 text-[11px]">{edu.location} • {edu.field}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
