"use client";

import * as React from "react";
import Image from "next/image";
import { Search, Globe, FileText, Monitor, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

interface ChromeNewTabProps {
  onNavigate: (url: string) => void;
}

export function ChromeNewTab({ onNavigate }: ChromeNewTabProps) {
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (!query) return;

    if (query.startsWith("http://") || query.startsWith("https://") || query.includes(".")) {
      onNavigate(query);
    } else {
      onNavigate(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    }
  };

  const shortcuts = [
    {
      title: "Sojib Ahmed",
      subtitle: "Live Portfolio",
      url: "https://sojibahmed.vercel.app",
      image: profileData.avatarUrl,
      badge: "Portfolio",
    },
    {
      title: "Shifa",
      subtitle: "Telemedicine Platform",
      url: "https://shifa-medi.vercel.app",
      image: "/projects/shifa.png",
      badge: "Team Lead",
    },
    {
      title: "Mess Manager",
      subtitle: "Cost Management",
      url: "https://mess-manager-prod.vercel.app/",
      image: "/projects/mess_manager.png",
      badge: "Full-Stack",
    },
    {
      title: "AabohawaX",
      subtitle: "Weather Tracker",
      url: "https://aabohawax.netlify.app",
      image: "/projects/aabohawax.png",
      badge: "Weather App",
    },
    {
      title: "GitHub",
      subtitle: "@aminur-islam-sojib",
      url: "https://github.com/aminur-islam-sojib",
      icon: Globe,
      badge: "Source Code",
    },
    {
      title: "LinkedIn",
      subtitle: "Aminur Islam Sojib",
      url: "https://linkedin.com/in/aminur-islam-sojib/",
      icon: Globe,
      badge: "Profile",
    },
    {
      title: "Resume",
      subtitle: "Official CV PDF",
      url: profileData.resumeUrl,
      icon: FileText,
      badge: "Document",
    },
    {
      title: "Classic View",
      subtitle: "Recruiter Portfolio",
      url: "/classic",
      icon: Monitor,
      badge: "HTML View",
    },
  ];

  return (
    <div className="w-full h-full bg-[var(--color-chrome-omnibox)] text-[var(--color-text-primary)] flex flex-col items-center justify-between p-6 sm:p-10 overflow-y-auto select-none font-sans">
      <div className="w-full max-w-2xl flex flex-col items-center space-y-7 my-auto py-6">
        {/* Google Stylized Logo */}
        <div className="flex items-center select-none text-5xl sm:text-6xl font-bold tracking-tight">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </div>

        {/* Search Omnibox */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-xl">
          <div className="relative group">
            <Search className="w-5 h-5 text-[var(--color-text-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[var(--ubuntu-orange)] transition-colors" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Google or type a URL"
              className="w-full h-12 pl-12 pr-12 rounded-full bg-[var(--color-chrome-toolbar)] hover:border-[var(--ubuntu-orange)]/40 focus:border-[var(--ubuntu-orange)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-sm shadow-md border border-[var(--color-chrome-border)] outline-none transition-all"
            />
            {searchInput && (
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-[var(--color-card-hover)] text-[var(--color-text-secondary)]"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Shortcuts Grid */}
        <div className="w-full max-w-xl grid grid-cols-4 gap-3 sm:gap-4 pt-2">
          {shortcuts.map((sc) => (
            <button
              key={sc.title}
              type="button"
              onClick={() => onNavigate(sc.url)}
              className="flex flex-col items-center p-3 rounded-2xl hover:bg-[var(--color-card-hover)] transition-all group cursor-pointer"
            >
              <div className="relative w-12 h-12 rounded-full bg-[var(--color-chrome-toolbar)] group-hover:scale-105 border border-[var(--color-chrome-border)] flex items-center justify-center overflow-hidden shadow-sm transition-transform mb-2">
                {sc.image ? (
                  <Image
                    src={sc.image}
                    alt={sc.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                ) : sc.icon ? (
                  <sc.icon className="w-5 h-5 text-[var(--ubuntu-orange)]" />
                ) : (
                  <Globe className="w-5 h-5 text-[var(--color-text-muted)]" />
                )}
              </div>
              <span className="text-xs font-medium text-[var(--color-text-primary)] truncate max-w-[80px]">
                {sc.title}
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)] truncate max-w-[80px]">
                {sc.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chrome Footer with User Status */}
      <div className="w-full max-w-2xl pt-4 border-t border-[var(--color-chrome-border)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-text-muted)] gap-2">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[var(--color-border-subtle)]">
            <Image
              src={profileData.avatarUrl}
              alt={profileData.name}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span>
            Signed in as <strong className="text-[var(--color-text-primary)]">{profileData.name}</strong> ({profileData.email})
          </span>
        </div>
        <span className="text-[var(--color-text-muted)] font-mono text-[11px]">Google Chrome • Ubuntu 24.04</span>
      </div>
    </div>
  );
}

