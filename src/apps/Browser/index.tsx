"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Lock,
  Plus,
  X,
  ExternalLink,
  Star,
  MoreVertical,
  Globe,
  FileText,
  Monitor,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { ChromeNewTab } from "@/apps/Browser/ChromeNewTab";
import { GoogleSearchPage } from "@/apps/Browser/GoogleSearchPage";
import { ExternalPreviewCard } from "@/apps/Browser/ExternalPreviewCard";

export interface ChromeTab {
  id: string;
  title: string;
  url: string;
  history: string[];
  historyIndex: number;
}

function getTabTitle(url: string): string {
  if (url === "chrome://newtab" || url === "about:blank") return "New Tab";
  if (url.includes("google.com/search")) {
    try {
      const u = new URL(url);
      const q = u.searchParams.get("q");
      return q ? `${q} - Google Search` : "Google Search";
    } catch {
      return "Google Search";
    }
  }
  if (url.includes("sojibahmed.vercel.app")) return "Sojib Ahmed — Portfolio";
  if (url.includes("shifa-medi.vercel.app")) return "Shifa — Telemedicine";
  if (url.includes("mess-manager")) return "Mess Manager";
  if (url.includes("aabohawax")) return "AabohawaX — Weather";
  if (url.includes("github.com")) return "GitHub · aminur-islam-sojib";
  if (url.includes("linkedin.com")) return "LinkedIn · Aminur Islam Sojib";
  if (url.includes("Sojib_Ahmed_Resume.pdf")) return "Resume — Sojib Ahmed";
  if (url.includes("/classic")) return "Classic Portfolio";
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host;
  } catch {
    return url;
  }
}

export default function BrowserApp() {
  const [tabs, setTabs] = React.useState<ChromeTab[]>([
    {
      id: "tab-1",
      title: "New Tab",
      url: "chrome://newtab",
      history: ["chrome://newtab"],
      historyIndex: 0,
    },
    {
      id: "tab-2",
      title: "Sojib Ahmed — Portfolio",
      url: "https://sojibahmed.vercel.app",
      history: ["https://sojibahmed.vercel.app"],
      historyIndex: 0,
    },
  ]);

  const [activeTabId, setActiveTabId] = React.useState<string>("tab-1");
  const [editingUrl, setEditingUrl] = React.useState<string | null>(null);
  const [iframeKey, setIframeKey] = React.useState(0);
  const [iframeFailed, setIframeFailed] = React.useState<Record<string, boolean>>({});
  const tabCounterRef = React.useRef(3);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const inputUrl = editingUrl ?? (activeTab?.url || "chrome://newtab");

  const handleNavigate = (targetUrl: string) => {
    let formatted = targetUrl.trim();
    if (!formatted) return;

    if (
      !formatted.startsWith("http://") &&
      !formatted.startsWith("https://") &&
      !formatted.startsWith("chrome://") &&
      !formatted.startsWith("/")
    ) {
      if (formatted.includes(".") && !formatted.includes(" ")) {
        formatted = `https://${formatted}`;
      } else {
        formatted = `https://www.google.com/search?q=${encodeURIComponent(formatted)}`;
      }
    }

    const title = getTabTitle(formatted);

    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTabId) return tab;
        const newHistory = tab.history.slice(0, tab.historyIndex + 1);
        newHistory.push(formatted);
        return {
          ...tab,
          title,
          url: formatted,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      })
    );

    setEditingUrl(null);
    setIframeKey((k) => k + 1);
  };

  const handleAddTab = (initialUrl = "chrome://newtab") => {
    const newId = `tab-${tabCounterRef.current++}`;
    const newTab: ChromeTab = {
      id: newId,
      title: getTabTitle(initialUrl),
      url: initialUrl,
      history: [initialUrl],
      historyIndex: 0,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    setEditingUrl(null);
  };

  const handleCloseTab = (idToClose: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (tabs.length === 1) {
      const resetId = `tab-${tabCounterRef.current++}`;
      // If closing the only tab, reset it to New Tab
      setTabs([
        {
          id: resetId,
          title: "New Tab",
          url: "chrome://newtab",
          history: ["chrome://newtab"],
          historyIndex: 0,
        },
      ]);
      setActiveTabId(resetId);
      setEditingUrl(null);
      return;
    }

    const indexToClose = tabs.findIndex((t) => t.id === idToClose);
    const newTabs = tabs.filter((t) => t.id !== idToClose);
    setTabs(newTabs);

    if (activeTabId === idToClose) {
      const nextActive = newTabs[Math.max(0, indexToClose - 1)] || newTabs[0];
      setActiveTabId(nextActive.id);
      setEditingUrl(null);
    }
  };

  const handleGoBack = () => {
    if (!activeTab || activeTab.historyIndex <= 0) return;
    const newIndex = activeTab.historyIndex - 1;
    const prevUrl = activeTab.history[newIndex];
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTab.id
          ? { ...t, historyIndex: newIndex, url: prevUrl, title: getTabTitle(prevUrl) }
          : t
      )
    );
    setEditingUrl(null);
  };

  const handleGoForward = () => {
    if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;
    const newIndex = activeTab.historyIndex + 1;
    const nextUrl = activeTab.history[newIndex];
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTab.id
          ? { ...t, historyIndex: newIndex, url: nextUrl, title: getTabTitle(nextUrl) }
          : t
      )
    );
    setEditingUrl(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNavigate(inputUrl);
    }
  };

  const bookmarks = [
    { label: "Sojib Ahmed", url: "https://sojibahmed.vercel.app", icon: Globe },
    { label: "Shifa", url: "https://shifa-medi.vercel.app", icon: Globe },
    { label: "Mess Manager", url: "https://mess-manager-prod.vercel.app/", icon: Globe },
    { label: "AabohawaX", url: "https://aabohawax.netlify.app", icon: Globe },
    { label: "GitHub", url: "https://github.com/aminur-islam-sojib", icon: Globe },
    { label: "LinkedIn", url: "https://linkedin.com/in/aminur-islam-sojib/", icon: Globe },
    { label: "Resume PDF", url: profileData.resumeUrl, icon: FileText },
    { label: "Classic View", url: "/classic", icon: Monitor },
  ];

  const isSearchQuery =
    activeTab &&
    (activeTab.url.includes("google.com/search") || activeTab.url.startsWith("https://www.google.com/search"));

  const parsedQuery = React.useMemo(() => {
    if (!isSearchQuery) return "";
    try {
      const u = new URL(activeTab.url);
      return u.searchParams.get("q") || "";
    } catch {
      return "";
    }
  }, [isSearchQuery, activeTab]);

  const isExternalRestricted =
    activeTab &&
    (activeTab.url.includes("github.com") ||
      activeTab.url.includes("linkedin.com") ||
      Boolean(iframeFailed[activeTab.id]));

  return (
    <div className="h-full w-full flex flex-col bg-[var(--color-chrome-tabstrip)] text-[var(--color-text-primary)] select-none font-sans overflow-hidden">
      {/* 1. Chrome Tab Strip */}
      <div className="h-10 bg-[var(--color-chrome-tabstrip)] px-2 pt-1 flex items-end gap-1 overflow-x-auto border-b border-[var(--color-chrome-border)] scrollbar-none">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`group relative flex items-center justify-between gap-2 max-w-[210px] min-w-[120px] h-9 px-3 rounded-t-lg transition-colors cursor-pointer select-none text-xs border-t border-x ${
                isActive
                  ? "bg-[var(--color-chrome-toolbar)] text-[var(--color-text-primary)] font-medium border-[var(--color-chrome-border)] shadow-sm"
                  : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text-primary)] border-transparent"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Globe className="w-3.5 h-3.5 text-[var(--ubuntu-orange)] shrink-0" />
                <span className="truncate text-xs">{tab.title}</span>
              </div>

              <button
                type="button"
                onClick={(e) => handleCloseTab(tab.id, e)}
                aria-label={`Close tab ${tab.title}`}
                className="p-1 rounded-full opacity-60 group-hover:opacity-100 hover:bg-[var(--color-control-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {/* Add Tab Button */}
        <button
          type="button"
          onClick={() => handleAddTab()}
          aria-label="New tab"
          className="p-2 mb-1 rounded-full hover:bg-[var(--color-card-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          title="New tab"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Chrome Navigation Toolbar */}
      <div className="h-11 px-3 bg-[var(--color-chrome-toolbar)] flex items-center gap-2 text-xs border-b border-[var(--color-chrome-border)]">
        <div className="flex items-center gap-0.5 text-[var(--color-text-secondary)]">
          <button
            type="button"
            onClick={handleGoBack}
            disabled={!activeTab || activeTab.historyIndex <= 0}
            aria-label="Back"
            className="p-1.5 rounded-full hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text-primary)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Click to go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleGoForward}
            disabled={!activeTab || activeTab.historyIndex >= activeTab.history.length - 1}
            aria-label="Forward"
            className="p-1.5 rounded-full hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text-primary)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Click to go forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIframeKey((prev) => prev + 1)}
            aria-label="Reload"
            className="p-1.5 rounded-full hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text-primary)] transition-colors"
            title="Reload this page"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleNavigate("chrome://newtab")}
            aria-label="Home"
            className="p-1.5 rounded-full hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text-primary)] transition-colors"
            title="Open the homepage"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Omnibox (Search / URL Bar) */}
        <div className="flex-1 flex items-center gap-2 h-8 px-3.5 rounded-full bg-[var(--color-chrome-omnibox)] border border-[var(--color-chrome-border)] focus-within:border-[var(--ubuntu-orange)] text-xs shadow-inner">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setEditingUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search or enter URL"
            placeholder="Search Google or type a URL"
            className="w-full bg-transparent text-[var(--color-text-primary)] outline-none border-none text-xs font-mono placeholder-[var(--color-text-muted)]"
          />
          <Star className="w-3.5 h-3.5 text-[var(--color-text-muted)] hover:text-amber-400 cursor-pointer shrink-0 transition-colors" />
        </div>

        {/* Right Chrome Actions */}
        <div className="flex items-center gap-1.5 pl-1">
          {/* External browser open link */}
          {activeTab.url !== "chrome://newtab" && (
            <a
              href={activeTab.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-[var(--color-card-hover)] text-[var(--color-text-secondary)] hover:text-[var(--ubuntu-orange)] transition-colors"
              title="Open current page in system browser"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {/* Profile Avatar */}
          <div
            className="relative w-6 h-6 rounded-full overflow-hidden border border-[var(--color-border-subtle)] shrink-0 cursor-pointer"
            title={`Signed in as ${profileData.name} (${profileData.email})`}
          >
            <Image
              src={profileData.avatarUrl}
              alt={profileData.name}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>

          <button
            type="button"
            aria-label="Customize and control Google Chrome"
            className="p-1 rounded-full hover:bg-[var(--color-card-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Bookmarks Bar */}
      <div className="h-7 px-3 bg-[var(--color-chrome-toolbar)] border-b border-[var(--color-chrome-border)] flex items-center gap-3 text-[11px] text-[var(--color-text-secondary)] overflow-x-auto scrollbar-none">
        {bookmarks.map((bm) => (
          <button
            key={bm.label}
            type="button"
            onClick={() => handleNavigate(bm.url)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text-primary)] transition-colors shrink-0"
          >
            <bm.icon className="w-3 h-3 text-[var(--ubuntu-orange)]" />
            <span>{bm.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Active Tab Content Viewport */}
      <div className="flex-1 relative w-full h-full bg-[var(--color-chrome-omnibox)]">
        {activeTab.url === "chrome://newtab" || activeTab.url === "about:blank" ? (
          <ChromeNewTab onNavigate={handleNavigate} />
        ) : isSearchQuery ? (
          <GoogleSearchPage query={parsedQuery} onNavigate={handleNavigate} />
        ) : isExternalRestricted ? (
          <ExternalPreviewCard url={activeTab.url} />
        ) : (
          <iframe
            key={`${activeTab.id}-${iframeKey}`}
            src={activeTab.url}
            title={activeTab.title}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onError={() => {
              setIframeFailed((prev) => ({ ...prev, [activeTab.id]: true }));
            }}
            className="w-full h-full border-none bg-white"
          />
        )}
      </div>
    </div>
  );
}
