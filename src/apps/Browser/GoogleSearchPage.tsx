"use client";

import * as React from "react";
import { Search, ExternalLink, Globe, Sparkles } from "lucide-react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";

interface GoogleSearchPageProps {
  query: string;
  onNavigate: (url: string) => void;
}

export function GoogleSearchPage({ query, onNavigate }: GoogleSearchPageProps) {
  const [searchInput, setSearchInput] = React.useState(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onNavigate(`https://www.google.com/search?q=${encodeURIComponent(searchInput.trim())}`);
  };

  const results = [
    {
      title: `${profileData.name} — ${profileData.title} at Softvence`,
      url: profileData.website,
      displayUrl: "sojibahmed.vercel.app",
      snippet: profileData.bio,
      sitelinks: [
        { label: "Projects Showcase", url: `${profileData.website}/projects` },
        { label: "Resume & CV", url: `${profileData.website}/download-cv` },
        { label: "Contact Sojib", url: `${profileData.website}/contact` },
        { label: "Classic Recruiter View", url: "/classic" },
      ],
    },
    {
      title: `${profileData.handle} (${profileData.name}) · GitHub`,
      url: profileData.socials.github,
      displayUrl: "github.com › aminur-islam-sojib",
      snippet: `Explore repositories by ${profileData.name}: Shifa (Telemedicine), Mess-Manager, AabohawaX, and Ubuntu Web OS Portfolio. Specializing in Next.js, TypeScript, React, and MongoDB.`,
    },
    ...projectsData.map((project) => ({
      title: `${project.title} — Official Web Application`,
      url: project.liveUrl || project.githubUrl || profileData.website,
      displayUrl: project.liveUrl?.replace(/^https?:\/\//, "") || "sojibahmed.vercel.app",
      snippet: `${project.tagline}. ${project.description.slice(0, 160)}... Built with ${project.technologies.join(", ")}.`,
    })),
    {
      title: `${profileData.fullName} — Frontend Developer at Softvence | LinkedIn`,
      url: profileData.socials.linkedin,
      displayUrl: "linkedin.com › in › aminur-islam-sojib",
      snippet: `View ${profileData.name}'s professional profile on LinkedIn. Frontend Developer at Softvence, BSc in Computer Science at University of Scholars, based in Dhaka, Bangladesh.`,
    },
  ];

  return (
    <div className="w-full h-full bg-[var(--color-chrome-omnibox)] text-[var(--color-text-secondary)] font-sans overflow-y-auto select-text">
      {/* Top Google Search Header */}
      <div className="sticky top-0 bg-[var(--color-chrome-omnibox)] border-b border-[var(--color-chrome-border)] px-4 sm:px-8 py-3.5 z-10 space-y-3">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => onNavigate("chrome://newtab")}
            className="text-2xl font-bold tracking-tight select-none cursor-pointer shrink-0"
          >
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </button>

          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-10 pl-4 pr-10 rounded-full bg-[var(--color-chrome-input)] text-[var(--color-text-primary)] text-xs sm:text-sm border border-[var(--color-chrome-border)] hover:border-[#5f6368] focus:border-white/30 outline-none shadow-sm"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Search Filter Tabs */}
        <div className="flex items-center gap-6 text-xs text-[var(--color-text-muted)] pl-0 sm:pl-28">
          <span className="text-[var(--color-search-link)] font-medium border-b-2 border-[var(--color-search-link)] pb-1 cursor-pointer">
            All
          </span>
          <span className="hover:text-[var(--color-text-primary)] cursor-pointer">Images</span>
          <span className="hover:text-[var(--color-text-primary)] cursor-pointer">Videos</span>
          <span className="hover:text-[var(--color-text-primary)] cursor-pointer">News</span>
          <span className="hover:text-[var(--color-text-primary)] cursor-pointer">Maps</span>
        </div>
      </div>

      {/* Search Results Content */}
      <div className="max-w-3xl px-4 sm:px-8 py-4 space-y-6 sm:ml-28">
        <p className="text-xs text-[var(--color-text-muted)]">
          About 1,480,000 results for &quot;<strong className="text-[var(--color-text-primary)]">{query}</strong>&quot; (0.24 seconds)
        </p>

        {/* Knowledge Panel Banner */}
        <div className="p-4 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] flex items-start gap-4 text-xs shadow-sm">
          <Sparkles className="w-5 h-5 text-[var(--color-search-link)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[var(--color-text-primary)]">Featured Developer Profile</span>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {profileData.name} ({profileData.fullName}) is a {profileData.title} at Softvence specializing in Next.js, React, Node.js, and MongoDB based in Dhaka, Bangladesh.
            </p>
          </div>
        </div>

        {/* List of Search Results */}
        <div className="space-y-6">
          {results.map((res, idx) => (
            <article key={idx} className="space-y-1 text-xs">
              <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
                <Globe className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                <span className="truncate">{res.displayUrl}</span>
              </div>

              <h2 className="text-base font-medium">
                <button
                  type="button"
                  onClick={() => onNavigate(res.url)}
                  className="text-[var(--color-search-link)] hover:underline text-left cursor-pointer inline-flex items-center gap-1.5 font-medium"
                >
                  <span>{res.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
              </h2>

              <p className="text-[var(--color-text-secondary)] leading-relaxed text-xs">
                {res.snippet}
              </p>

              {res.sitelinks && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {res.sitelinks.map((sl) => (
                    <button
                      key={sl.label}
                      type="button"
                      onClick={() => onNavigate(sl.url)}
                      className="p-2 rounded-lg bg-[var(--color-card-bg)] hover:bg-[var(--color-card-hover)] text-left text-[11px] text-[var(--color-search-link)] hover:underline border border-[var(--color-border-subtle)] shadow-xs"
                    >
                      {sl.label}
                    </button>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

