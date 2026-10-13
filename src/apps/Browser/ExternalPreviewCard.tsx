"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink, GitBranch, Shield, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";

interface ExternalPreviewCardProps {
  url: string;
}

export function ExternalPreviewCard({ url }: ExternalPreviewCardProps) {
  const isGitHub = url.includes("github.com");
  const isLinkedIn = url.includes("linkedin.com");

  if (isGitHub) {
    return (
      <div className="w-full h-full bg-[#0d1117] text-white p-6 sm:p-10 flex flex-col items-center justify-center overflow-y-auto font-sans select-text">
        <div className="w-full max-w-xl bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                <GitBranch className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm font-semibold text-zinc-200">GitHub Profile Preview</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Verified User
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#30363d] shrink-0">
              <Image
                src={profileData.avatarUrl}
                alt={profileData.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-lg font-bold text-white leading-tight">
                {profileData.fullName}
              </h1>
              <p className="text-xs font-mono text-zinc-400">@{profileData.handle}</p>
              <p className="text-xs text-zinc-300">{profileData.subtitle}</p>
            </div>
          </div>

          {/* Featured Repositories */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
              Pinned Repositories
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {projectsData.slice(0, 4).map((proj) => (
                <div
                  key={proj.id}
                  className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1.5"
                >
                  <span className="font-semibold text-[#58a6ff] truncate block">
                    {proj.title}
                  </span>
                  <p className="text-[11px] text-zinc-400 line-clamp-2">{proj.tagline}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#30363d]">
            <span className="text-xs text-zinc-400">
              GitHub blocks iframe embedding via strict CSP headers.
            </span>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" className="gap-2 shrink-0">
                <span>Open in GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (isLinkedIn) {
    return (
      <div className="w-full h-full bg-[#000000] text-white p-6 sm:p-10 flex flex-col items-center justify-center overflow-y-auto font-sans select-text">
        <div className="w-full max-w-lg bg-[#1b1f23] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-sm font-semibold text-sky-400">LinkedIn Profile Preview</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Professional
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20 shrink-0">
              <Image
                src={profileData.avatarUrl}
                alt={profileData.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">{profileData.fullName}</h2>
              <p className="text-xs text-[var(--ubuntu-orange)] font-medium">{profileData.title}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Building2 className="w-3.5 h-3.5" />
                <span>Softvence</span>
                <span>•</span>
                <MapPin className="w-3.5 h-3.5" />
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed p-3 rounded-xl bg-black/40 border border-white/5">
            {profileData.bio}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
            <span className="text-xs text-zinc-400">
              LinkedIn restricts iframe embedding for authentication security.
            </span>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" className="gap-2 shrink-0">
                <span>View Full LinkedIn</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#1e1e1e] text-white p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-4 font-sans">
      <Shield className="w-12 h-12 text-amber-400" />
      <div className="space-y-1 max-w-md">
        <h2 className="text-base font-bold">External Site Frame Restriction</h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          This website (<code>{url}</code>) sets <code>X-Frame-Options: SAMEORIGIN</code> to prevent embedding inside iframes.
        </p>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button variant="primary" size="md" className="gap-2">
          <span>Open in New Browser Window</span>
          <ExternalLink className="w-4 h-4" />
        </Button>
      </a>
    </div>
  );
}
