"use client";

import * as React from "react";
import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ResumeApp() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-3xl mx-auto font-sans text-white">
      {/* Action Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-[var(--ubuntu-orange)]" />
          <div>
            <h1 className="text-lg font-bold tracking-tight">Curriculum Vitae</h1>
            <p className="text-xs text-zinc-400">{profileData.name} — PDF Document Preview</p>
          </div>
        </div>
        <Button variant="primary" size="sm" className="flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" />
          <span>Download PDF</span>
        </Button>
      </div>

      {/* Embedded Resume Preview */}
      <div className="p-6 rounded-[var(--window-radius)] bg-white/5 border border-white/10 space-y-6">
        <div>
          <h2 className="text-xl font-bold">{profileData.name}</h2>
          <p className="text-xs text-[var(--ubuntu-orange)]">{profileData.title}</p>
          <p className="text-xs text-zinc-400 mt-1">{profileData.email} • {profileData.location}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-white/10 pb-1">
            Experience History
          </h3>
          {experienceData.map((exp) => (
            <div key={exp.id} className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{exp.role}</span>
                <span className="text-zinc-400 text-[11px]">{exp.period}</span>
              </div>
              <p className="text-[var(--ubuntu-orange)] font-medium text-[11px]">{exp.company}</p>
              <p className="text-zinc-300 leading-relaxed text-[11px]">{exp.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

