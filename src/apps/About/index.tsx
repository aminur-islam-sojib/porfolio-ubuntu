"use client";

import * as React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import { useWindowStore } from "@/store/windows";
import { Button } from "@/components/ui/Button";
import {
  Cpu,
  HardDrive,
  ShieldCheck,
  Monitor,
  Mail,
  FileText,
  ExternalLink,
  MapPin,
  Phone,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function AboutApp() {
  const { systemInfo } = profileData;

  const handleOpenMail = () => {
    useWindowStore.getState().openWindow("mail");
  };

  const handleOpenResume = () => {
    useWindowStore.getState().openWindow("resume");
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-3xl mx-auto font-sans text-white select-text">
      {/* Header Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-white/10 text-center sm:text-left">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15 shrink-0 bg-[#2C001E]">
          <Image
            src={profileData.avatarUrl}
            alt={profileData.name}
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{profileData.name}</h1>
              <p className="text-xs text-zinc-400 font-mono">({profileData.fullName})</p>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <Button variant="primary" size="sm" onClick={handleOpenMail} className="gap-1.5 h-8">
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </Button>
              <Button variant="default" size="sm" onClick={handleOpenResume} className="gap-1.5 h-8">
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </Button>
            </div>
          </div>
          <p className="text-sm font-semibold text-[var(--ubuntu-orange)]">
            {profileData.title}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 justify-center sm:justify-start pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              <span>{profileData.location}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-zinc-500" />
              <span>{profileData.phone}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              <span>{profileData.birthday}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
          <span className="text-[11px] text-zinc-400 block">Experience</span>
          <span className="text-sm font-bold text-white">{profileData.metrics.experience}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
          <span className="text-[11px] text-zinc-400 block">Projects</span>
          <span className="text-sm font-bold text-white">{profileData.metrics.projectsCompleted}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
          <span className="text-[11px] text-zinc-400 block">Contributions</span>
          <span className="text-sm font-bold text-white">{profileData.metrics.commits}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
          <span className="text-[11px] text-zinc-400 block">Availability</span>
          <span className="text-sm font-bold text-emerald-400">{profileData.metrics.support}</span>
        </div>
      </div>

      {/* Developer Bio */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-[var(--ubuntu-orange)]" />
          <h2>Developer Overview</h2>
        </div>
        <div className="p-4 rounded-[var(--window-radius)] bg-white/5 border border-white/5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {profileData.bio}
        </div>
      </div>

      {/* Hardware & System Specifications (Ubuntu Settings style) */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          System Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <Cpu className="w-4 h-4 text-[var(--ubuntu-orange)] shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-400 block text-[11px]">Primary Engine & Stack</span>
              <span className="font-medium text-white">{systemInfo.cpu}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <HardDrive className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-400 block text-[11px]">Architecture & State</span>
              <span className="font-medium text-white">{systemInfo.memory}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <Monitor className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-400 block text-[11px]">Operating System</span>
              <span className="font-medium text-white">
                {systemInfo.osName} {systemInfo.osVersion}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-400 block text-[11px]">Kernel & Runtime</span>
              <span className="font-medium text-white">{systemInfo.kernel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social / External Links */}
      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
        <span>Uptime: {systemInfo.uptime}</span>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-300 hover:text-[var(--ubuntu-orange)] transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-300 hover:text-[var(--ubuntu-orange)] transition-colors"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          {profileData.socials.codeforces && (
            <a
              href={profileData.socials.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-300 hover:text-[var(--ubuntu-orange)] transition-colors"
            >
              <span>Codeforces</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {profileData.socials.facebook && (
            <a
              href={profileData.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-300 hover:text-[var(--ubuntu-orange)] transition-colors"
            >
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
