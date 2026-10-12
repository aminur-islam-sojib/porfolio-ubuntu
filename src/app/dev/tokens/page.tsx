"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Slider } from "@/components/ui/Slider";
import { Tooltip } from "@/components/ui/Tooltip";
import Link from "next/link";
import {
  Palette,
  Type,
  Sliders,
  Layers,
  Sparkles,
  ArrowLeft,
  Sun,
  Moon,
  Terminal,
} from "lucide-react";

export default function DevTokensPage() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [switchState, setSwitchState] = React.useState(true);
  const [sliderVal, setSliderVal] = React.useState(65);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-window-bg)] text-[var(--color-text-primary)] p-6 md:p-12 font-sans overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[var(--color-border-subtle)] gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-3.5 w-3.5 rounded-full bg-[var(--ubuntu-orange)] inline-block shadow-sm" />
              <h1 className="text-2xl font-bold tracking-tight">
                Ubuntu 24.04 Yaru — Design Tokens Showcase
              </h1>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Phase 0 Foundation verification for typography, color tokens, elevation, and UI primitives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="default"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center gap-2"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
              <span>Mode: {theme.toUpperCase()}</span>
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
        </header>

        {/* 1. Color Palette */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-[var(--ubuntu-orange)]">
            <Palette className="w-5 h-5" />
            <h2>Color Tokens</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-12 rounded bg-[var(--ubuntu-orange)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Ubuntu Orange</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#E95420</p>
            </div>
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-12 rounded bg-[var(--ubuntu-orange-hover)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Orange Hover</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#FF6D3B</p>
            </div>
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-12 rounded bg-[var(--ubuntu-orange-active)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Orange Active</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#D03F0D</p>
            </div>
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-12 rounded bg-[var(--ubuntu-aubergine-dark)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Aubergine Dark</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#77216F</p>
            </div>
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-12 rounded bg-[var(--ubuntu-aubergine-mid)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Aubergine Mid</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#5E2750</p>
            </div>
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-12 rounded bg-[var(--ubuntu-aubergine-deep)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Aubergine Deep</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#2C001E</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-10 rounded bg-[var(--color-status-success)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Status Success</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#38B44A</p>
            </div>
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-10 rounded bg-[var(--color-status-warning)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Status Warning</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#EFB73E</p>
            </div>
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-10 rounded bg-[var(--color-status-danger)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Status Danger</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#DF382C</p>
            </div>
            <div className="p-3 rounded-[var(--control-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)]">
              <div className="h-10 rounded bg-[var(--color-status-info)] shadow-sm mb-2" />
              <p className="text-xs font-semibold">Status Info</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono">#19B6EE</p>
            </div>
          </div>
        </section>

        {/* 2. Typography */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-[var(--ubuntu-orange)]">
            <Type className="w-5 h-5" />
            <h2>Typography (Ubuntu & Ubuntu Mono)</h2>
          </div>

          <div className="p-6 rounded-[var(--window-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] space-y-6">
            <div>
              <p className="text-xs font-mono text-[var(--color-text-muted)] mb-1">
                Ubuntu Bold 24px (Title)
              </p>
              <h1 className="text-2xl font-bold tracking-tight">
                Sojib Ahmed — Full-Stack Engineer & Linux Enthusiast
              </h1>
            </div>

            <div>
              <p className="text-xs font-mono text-[var(--color-text-muted)] mb-1">
                Ubuntu Medium 18px (Subheading)
              </p>
              <h2 className="text-lg font-medium text-[var(--color-text-secondary)]">
                Building accessible, high-performance distributed systems & pixel-perfect interfaces.
              </h2>
            </div>

            <div>
              <p className="text-xs font-mono text-[var(--color-text-muted)] mb-1">
                Ubuntu Regular 14px (Body Default)
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">
                This desktop environment operates with strict 60fps hardware-accelerated animations, zero layout shift, and an authentic Yaru visual identity. All personal project metrics and code demos load on demand via isolated application containers.
              </p>
            </div>

            <div className="p-4 rounded-[var(--control-radius)] bg-[var(--color-terminal-bg)] border border-purple-900/40 text-[var(--color-terminal-text)] font-mono text-sm space-y-1">
              <div className="flex items-center gap-2 text-white/50 text-xs border-b border-purple-900/40 pb-2 mb-2">
                <Terminal className="w-4 h-4 text-[var(--ubuntu-orange)]" />
                <span>sojib@ubuntu-desktop: ~ (Ubuntu Mono 14px)</span>
              </div>
              <p className="text-white">$ neofetch</p>
              <p className="text-[var(--ubuntu-orange)]">OS: Ubuntu 24.04 LTS x86_64</p>
              <p>Host: Full-Stack Portfolio Engine</p>
              <p>Kernel: 6.8.0-generic</p>
              <p>Shell: bash 5.2.21</p>
              <p className="text-emerald-400">Status: Open for senior & lead full-stack roles</p>
            </div>
          </div>
        </section>

        {/* 3. Interactive UI Primitives */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-[var(--ubuntu-orange)]">
            <Sliders className="w-5 h-5" />
            <h2>UI Primitives (Buttons, Switch, Slider, Tooltip)</h2>
          </div>

          <div className="p-6 rounded-[var(--window-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] space-y-6">
            {/* Buttons */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-[var(--color-text-secondary)]">
                Button Variants & Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md">
                  Primary Action
                </Button>
                <Button variant="default" size="md">
                  Standard Button
                </Button>
                <Button variant="danger" size="md">
                  Destructive
                </Button>
                <Button variant="ghost" size="md">
                  Ghost Button
                </Button>
                <Button variant="link" size="md">
                  Link Style
                </Button>
                <Button variant="primary" size="sm">
                  Small Button
                </Button>
                <Button variant="default" size="lg">
                  Large Button
                </Button>
              </div>
            </div>

            {/* Switch & Slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--color-border-subtle)]">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-[var(--color-text-secondary)]">
                  Yaru Switch
                </h3>
                <div className="flex items-center gap-4">
                  <Switch
                    checked={switchState}
                    onCheckedChange={setSwitchState}
                    aria-label="Toggle demo state"
                  />
                  <span className="text-sm">
                    Status: <strong className="text-[var(--ubuntu-orange)]">{switchState ? "Enabled" : "Disabled"}</strong>
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2 text-[var(--color-text-secondary)]">
                  Yaru Slider ({sliderVal}%)
                </h3>
                <Slider
                  value={sliderVal}
                  onChange={setSliderVal}
                  aria-label="Volume slider demo"
                />
              </div>
            </div>

            {/* Tooltip */}
            <div className="pt-4 border-t border-[var(--color-border-subtle)]">
              <h3 className="text-sm font-semibold mb-3 text-[var(--color-text-secondary)]">
                Ubuntu Dock Tooltip
              </h3>
              <div className="flex items-center gap-4">
                <Tooltip content="Launch Terminal (Ctrl+Alt+T)" position="right">
                  <Button variant="default" size="sm">
                    Hover me (Right tooltip)
                  </Button>
                </Tooltip>

                <Tooltip content="Files (Nautilus)" position="top">
                  <Button variant="primary" size="sm">
                    Hover me (Top tooltip)
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Window Chrome & Elevation Preview */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-[var(--ubuntu-orange)]">
            <Layers className="w-5 h-5" />
            <h2>Window Chrome & Elevation (12px Radius, 40px Header)</h2>
          </div>

          <div
            className="rounded-[var(--window-radius)] border border-[var(--color-border-subtle)] overflow-hidden shadow-[var(--shadow-window)] bg-[var(--color-window-bg)]"
          >
            {/* Title Bar Mock */}
            <div className="h-[var(--titlebar-height)] bg-[var(--color-window-header)] px-4 flex items-center justify-between border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--ubuntu-orange)]" />
                <span className="text-xs font-medium text-[var(--color-text-primary)]">
                  Settings — System Overview
                </span>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Minimize"
                  className="w-3.5 h-3.5 rounded-full bg-[#444444] hover:bg-[#555555] transition-colors"
                />
                <button
                  type="button"
                  aria-label="Maximize"
                  className="w-3.5 h-3.5 rounded-full bg-[#444444] hover:bg-[#555555] transition-colors"
                />
                <button
                  type="button"
                  aria-label="Close"
                  className="w-3.5 h-3.5 rounded-full bg-[#444444] hover:bg-[var(--ubuntu-orange)] transition-colors"
                />
              </div>
            </div>

            {/* Window Content Mock */}
            <div className="p-6 space-y-3">
              <h4 className="text-base font-semibold">Ubuntu 24.04 LTS (Portfolio Edition)</h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Hardware: AMD Ryzen / 60fps GPU acceleration enabled.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] text-xs">
                  <span className="text-[var(--color-text-muted)] block">Kernel</span>
                  <span className="font-mono">Next.js 16 App Router</span>
                </div>
                <div className="p-3 rounded bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] text-xs">
                  <span className="text-[var(--color-text-muted)] block">Window Engine</span>
                  <span className="font-mono">Zustand + React RND</span>
                </div>
                <div className="p-3 rounded bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] text-xs">
                  <span className="text-[var(--color-text-muted)] block">Animations</span>
                  <span className="font-mono">Motion (GPU-only)</span>
                </div>
                <div className="p-3 rounded bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] text-xs">
                  <span className="text-[var(--color-text-muted)] block">Status</span>
                  <span className="text-[var(--color-status-success)] font-medium">Phase 0 Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-[var(--color-text-muted)] pt-8 pb-12">
          Ubuntu Desktop Portfolio • Designed with GNOME 46 & Yaru tokens • Built for recruiters & developers
        </footer>
      </div>
    </div>
  );
}

