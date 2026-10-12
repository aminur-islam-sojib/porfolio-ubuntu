"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Lock,
  ExternalLink,
  Globe,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function BrowserApp() {
  const [url, setUrl] = React.useState("https://en.wikipedia.org/wiki/Ubuntu");
  const [inputUrl, setInputUrl] = React.useState(url);
  const [iframeKey, setIframeKey] = React.useState(0);
  const [hasFrameError, setHasFrameError] = React.useState(false);

  const bookmarks = [
    { label: "Ubuntu", url: "https://en.wikipedia.org/wiki/Ubuntu" },
    { label: "React", url: "https://react.dev" },
    { label: "Next.js", url: "https://nextjs.org" },
    { label: "GitHub", url: "https://github.com" },
  ];

  const handleNavigate = (targetUrl: string) => {
    let formatted = targetUrl.trim();
    if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
      formatted = `https://${formatted}`;
    }
    setUrl(formatted);
    setInputUrl(formatted);
    setIframeKey((prev) => prev + 1);
    setHasFrameError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNavigate(inputUrl);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* 1. Browser Navigation Bar */}
      <div className="h-10 px-3 bg-[#2E2E2E] border-b border-white/10 flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1 text-zinc-400">
          <button
            type="button"
            aria-label="Back"
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Forward"
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIframeKey((prev) => prev + 1)}
            aria-label="Reload"
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleNavigate("https://en.wikipedia.org/wiki/Ubuntu")}
            aria-label="Home"
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* URL Input Bar */}
        <div className="flex-1 flex items-center gap-2 h-7 px-3 rounded-full bg-black/40 border border-white/10 text-xs">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Address bar"
            className="w-full bg-transparent text-white outline-none border-none text-xs font-mono"
          />
        </div>

        {/* Open in external tab action */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded hover:bg-white/10 text-zinc-300 hover:text-[var(--ubuntu-orange)] transition-colors flex items-center gap-1 text-xs"
          title="Open in external browser tab"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* 2. Bookmarks Bar */}
      <div className="h-7 px-4 bg-[#242424] border-b border-white/5 flex items-center gap-4 text-[11px] text-zinc-400">
        {bookmarks.map((bm) => (
          <button
            key={bm.label}
            type="button"
            onClick={() => handleNavigate(bm.url)}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Globe className="w-3 h-3 text-[var(--ubuntu-orange)]" />
            <span>{bm.label}</span>
          </button>
        ))}
      </div>

      {/* 3. Browser Viewport Area with Blocked Frame Fallback */}
      <div className="flex-1 relative w-full h-full bg-white">
        {hasFrameError ? (
          <div className="absolute inset-0 bg-[#1E1E1E] flex flex-col items-center justify-center p-8 text-center text-white space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-400" />
            <div className="space-y-1">
              <h2 className="text-base font-bold">Content Blocked by External Security Policy</h2>
              <p className="text-xs text-zinc-400 max-w-md">
                This website prevents display in browser iframes via <code>X-Frame-Options</code> or CSP.
              </p>
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" className="gap-2">
                <span>Open in New Browser Tab</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        ) : (
          <iframe
            key={iframeKey}
            src={url}
            title="Embedded Web Browser"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onError={() => setHasFrameError(true)}
            className="w-full h-full border-none bg-white"
          />
        )}
      </div>
    </div>
  );
}
