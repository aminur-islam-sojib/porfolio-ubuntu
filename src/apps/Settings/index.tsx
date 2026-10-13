"use client";

import * as React from "react";
import Image from "next/image";
import { useSystemStore, SYSTEM_FONTS } from "@/store/system";
import { UBUNTU_WALLPAPERS } from "@/data/wallpapers";
import {
  Palette,
  Wifi,
  Globe,
  Bluetooth,
  Monitor,
  Volume2,
  Zap,
  Layers,
  Layout,
  Grid,
  Bell,
  Search,
  UserCheck,
  Share2,
  Mouse,
  Keyboard,
  Droplet,
  Printer,
  Accessibility,
  ShieldCheck,
  Info,
  Check,
  Plus,
  Type,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/cn";

const UBUNTU_ACCENTS = [
  { id: "orange", name: "Ubuntu Orange", color: "#E95420" },
  { id: "bark", name: "Bark", color: "#887968" },
  { id: "sage", name: "Sage", color: "#4B8500" },
  { id: "emerald", name: "Emerald", color: "#1B8255" },
  { id: "teal", name: "Teal", color: "#0E8588" },
  { id: "blue", name: "Blue", color: "#1973CF" },
  { id: "indigo", name: "Indigo", color: "#4F59A7" },
  { id: "purple", name: "Purple", color: "#77216F" },
  { id: "magenta", name: "Magenta", color: "#B12260" },
  { id: "red", name: "Red", color: "#C7162B" },
];

type SettingsSection =
  | "appearance"
  | "fonts"
  | "desktop"
  | "displays"
  | "sound"
  | "power"
  | "about";

export default function SettingsApp() {
  const [activeSection, setActiveSection] = React.useState<SettingsSection>("appearance");
  const [searchQuery, setSearchQuery] = React.useState("");

  const theme = useSystemStore((state) => state.theme);
  const wallpaper = useSystemStore((state) => state.wallpaper);
  const accentColor = useSystemStore((state) => state.accentColor);
  const font = useSystemStore((state) => state.font);
  const customWallpapers = useSystemStore((state) => state.customWallpapers);

  const setWallpaper = useSystemStore((state) => state.setWallpaper);
  const setAccentColor = useSystemStore((state) => state.setAccentColor);
  const setTheme = useSystemStore((state) => state.setTheme);
  const setFont = useSystemStore((state) => state.setFont);
  const addCustomWallpaper = useSystemStore((state) => state.addCustomWallpaper);

  // Typography test sandbox state
  const [testText, setTestText] = React.useState(
    "The quick brown fox jumps over the lazy dog 0123456789"
  );
  const [testFontSize, setTestFontSize] = React.useState<number>(18);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        addCustomWallpaper(reader.result);
      }
    };
    reader.readAsDataURL(file);
    // Reset input
    e.target.value = "";
  };

  return (
    <div className="flex h-full w-full bg-[var(--color-window-bg)] text-[var(--color-text-primary)] font-sans select-none overflow-hidden">
      {/* 1. Left Sidebar */}
      <aside className="w-56 shrink-0 bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border-subtle)] flex flex-col h-full">
        {/* Search header */}
        <div className="p-3 border-b border-[var(--color-border-subtle)]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Settings"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 text-xs rounded-md bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
            />
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5 text-xs">
          {/* Group 1: Connectivity */}
          <SidebarItem
            icon={Wifi}
            label="Wi-Fi"
            active={activeSection === "desktop" && false}
            onClick={() => {}}
          />
          <SidebarItem
            icon={Globe}
            label="Network"
            active={false}
            onClick={() => {}}
          />
          <SidebarItem
            icon={Bluetooth}
            label="Bluetooth"
            active={false}
            onClick={() => {}}
          />

          <div className="my-2 border-t border-[var(--color-border-subtle)]" />

          {/* Group 2: System Personalization */}
          <SidebarItem
            icon={Monitor}
            label="Displays"
            active={activeSection === "displays"}
            onClick={() => setActiveSection("displays")}
          />
          <SidebarItem
            icon={Volume2}
            label="Sound"
            active={activeSection === "sound"}
            onClick={() => setActiveSection("sound")}
          />
          <SidebarItem
            icon={Zap}
            label="Power"
            active={activeSection === "power"}
            onClick={() => setActiveSection("power")}
          />
          <SidebarItem
            icon={Layers}
            label="Multitasking"
            active={false}
            onClick={() => {}}
          />
          <SidebarItem
            icon={Palette}
            label="Appearance"
            active={activeSection === "appearance"}
            onClick={() => setActiveSection("appearance")}
          />
          <SidebarItem
            icon={Type}
            label="Fonts & Typography"
            active={activeSection === "fonts"}
            onClick={() => setActiveSection("fonts")}
          />
          <SidebarItem
            icon={Layout}
            label="Ubuntu Desktop"
            active={activeSection === "desktop"}
            onClick={() => setActiveSection("desktop")}
          />

          <div className="my-2 border-t border-[var(--color-border-subtle)]" />

          {/* Group 3: Apps & System */}
          <SidebarItem icon={Grid} label="Apps" active={false} onClick={() => {}} />
          <SidebarItem icon={Bell} label="Notifications" active={false} onClick={() => {}} />
          <SidebarItem icon={Search} label="Search" active={false} onClick={() => {}} />
          <SidebarItem icon={UserCheck} label="Online Accounts" active={false} onClick={() => {}} />
          <SidebarItem icon={Share2} label="Sharing" active={false} onClick={() => {}} />

          <div className="my-2 border-t border-[var(--color-border-subtle)]" />

          {/* Group 4: Hardware & Info */}
          <SidebarItem icon={Mouse} label="Mouse & Touchpad" active={false} onClick={() => {}} />
          <SidebarItem icon={Keyboard} label="Keyboard" active={false} onClick={() => {}} />
          <SidebarItem icon={Droplet} label="Color" active={false} onClick={() => {}} />
          <SidebarItem icon={Printer} label="Printers" active={false} onClick={() => {}} />
          <SidebarItem icon={Accessibility} label="Accessibility" active={false} onClick={() => {}} />
          <SidebarItem icon={ShieldCheck} label="Privacy & Security" active={false} onClick={() => {}} />
          <SidebarItem
            icon={Info}
            label="About"
            active={activeSection === "about"}
            onClick={() => setActiveSection("about")}
          />
        </div>
      </aside>

      {/* 2. Main Settings Panel */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
        {activeSection === "appearance" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="text-center pb-2">
              <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Appearance</h1>
            </div>

            {/* Section 1: Style (Default vs Dark) */}
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">Style</h2>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {/* Default (Light) Style Option */}
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className="flex flex-col items-center gap-2 group focus:outline-none"
                >
                  <div
                    className={cn(
                      "w-full aspect-[16/10] rounded-xl overflow-hidden p-2 transition-all flex flex-col justify-between shadow-md",
                      theme === "light"
                        ? "ring-2 ring-[var(--ubuntu-orange)] bg-gradient-to-br from-[#77216F] to-[#2C001E]"
                        : "border border-[var(--color-border-subtle)] bg-[var(--color-control-bg)] opacity-80 group-hover:opacity-100"
                    )}
                  >
                    {/* Simulated Light Window */}
                    <div className="w-full h-full bg-[#FAFAFA] rounded-md shadow-sm border border-zinc-200 p-1.5 flex flex-col gap-1">
                      <div className="flex items-center gap-1 border-b border-zinc-200 pb-1">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="h-2 w-12 bg-zinc-200 rounded" />
                      <div className="h-2 w-20 bg-zinc-100 rounded" />
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      theme === "light" ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                    )}
                  >
                    Default (Light)
                  </span>
                </button>

                {/* Dark Style Option */}
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className="flex flex-col items-center gap-2 group focus:outline-none"
                >
                  <div
                    className={cn(
                      "w-full aspect-[16/10] rounded-xl overflow-hidden p-2 transition-all flex flex-col justify-between shadow-md",
                      theme === "dark"
                        ? "ring-2 ring-[var(--ubuntu-orange)] bg-[#111111]"
                        : "border border-[var(--color-border-subtle)] bg-[var(--color-control-bg)] opacity-80 group-hover:opacity-100"
                    )}
                  >
                    {/* Simulated Dark Window */}
                    <div className="w-full h-full bg-[#242424] rounded-md shadow-sm border border-white/10 p-1.5 flex flex-col gap-1">
                      <div className="flex items-center gap-1 border-b border-white/10 pb-1">
                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                      </div>
                      <div className="h-2 w-12 bg-zinc-700 rounded" />
                      <div className="h-2 w-20 bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      theme === "dark" ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                    )}
                  >
                    Dark
                  </span>
                </button>
              </div>

              {/* Accent Color Palette */}
              <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">Color</span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {UBUNTU_ACCENTS.map((acc) => {
                    const isSelected = accentColor.toLowerCase() === acc.color.toLowerCase();
                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => setAccentColor(acc.color)}
                        title={acc.name}
                        className={cn(
                          "w-6 h-6 rounded-full transition-transform flex items-center justify-center relative hover:scale-110 focus:outline-none",
                          isSelected ? "ring-2 ring-[var(--color-text-primary)] ring-offset-2 ring-offset-[var(--color-card-bg)]" : ""
                        )}
                        style={{ backgroundColor: acc.color }}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 1.5: System Font */}
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">System Font</h2>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    Select the interface typeface for windows, menus, and desktop components.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection("fonts")}
                  className="text-xs text-[var(--ubuntu-orange)] hover:underline font-medium flex items-center gap-1 group"
                >
                  <span>Typography Studio</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SYSTEM_FONTS.map((fontOpt) => {
                  const isSelected = font === fontOpt.id;
                  return (
                    <button
                      key={fontOpt.id}
                      type="button"
                      onClick={() => setFont(fontOpt.id)}
                      style={{ fontFamily: fontOpt.fontFamily }}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between group relative",
                        isSelected
                          ? "ring-2 ring-[var(--ubuntu-orange)] bg-[var(--color-card-active)] border-transparent shadow-sm"
                          : "border-[var(--color-border-subtle)] bg-[var(--color-control-bg)] hover:bg-[var(--color-control-hover)]"
                      )}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                          {fontOpt.name}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[var(--ubuntu-orange)] text-white flex items-center justify-center shadow">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--color-text-muted)] line-clamp-1 mb-2 font-normal">
                        {fontOpt.category}
                      </p>
                      <div className="text-xs text-[var(--color-text-secondary)] font-normal tracking-wide">
                        Aa Bb Gg 123
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Background Wallpapers Grid */}
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">Background</h2>

                {/* Add Picture button */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-[var(--color-control-bg)] hover:bg-[var(--color-control-hover)] text-xs font-medium text-[var(--color-text-primary)] flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Picture...</span>
                  </button>
                </div>
              </div>

              {/* Wallpapers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {/* Custom uploaded pictures (if any) */}
                {customWallpapers.map((customSrc, idx) => {
                  const isSelected = wallpaper === customSrc;
                  return (
                    <button
                      key={`custom-${idx}`}
                      type="button"
                      onClick={() => setWallpaper(customSrc)}
                      className={cn(
                        "group relative aspect-[16/10] rounded-xl overflow-hidden focus:outline-none transition-all duration-150 shadow-md",
                        isSelected
                          ? "ring-4 ring-[var(--ubuntu-orange)] ring-offset-2 ring-offset-[var(--color-card-bg)] scale-[0.98]"
                          : "hover:scale-[1.02] border border-[var(--color-border-subtle)]"
                      )}
                    >
                      <Image
                        src={customSrc}
                        alt="Custom Wallpaper"
                        fill
                        unoptimized
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-[10px] text-white font-medium bg-black/60 px-1.5 py-0.5 rounded">
                          Custom Image
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--ubuntu-orange)] flex items-center justify-center shadow">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Official Ubuntu Wallpapers */}
                {UBUNTU_WALLPAPERS.map((item) => {
                  const isSelected = wallpaper === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setWallpaper(item.id)}
                      title={`${item.name} by ${item.author}`}
                      className={cn(
                        "group relative aspect-[16/10] rounded-xl overflow-hidden focus:outline-none transition-all duration-150 shadow-md bg-[var(--color-input-bg)]",
                        isSelected
                          ? "ring-4 ring-[var(--ubuntu-orange)] ring-offset-2 ring-offset-[var(--color-card-bg)] scale-[0.98]"
                          : "hover:scale-[1.02] border border-[var(--color-border-subtle)] hover:border-[var(--ubuntu-orange)]/40"
                      )}
                    >
                      <Image
                        src={item.thumbnail}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover w-full h-full"
                      />

                      {/* Title overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <div className="text-left leading-tight truncate">
                          <div className="text-[11px] text-white font-medium truncate">
                            {item.name}
                          </div>
                          <div className="text-[9px] text-zinc-300 truncate">
                            {item.author}
                          </div>
                        </div>
                      </div>

                      {/* Active Checkmark Badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--ubuntu-orange)] flex items-center justify-center shadow">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Fonts & Typography Section */}
        {activeSection === "fonts" && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[var(--color-border-subtle)]">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                  Fonts & Typography
                </h1>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  Configure desktop typefaces, inspect typographic specimens, and test readability.
                </p>
              </div>
              {font !== "ubuntu" && (
                <button
                  type="button"
                  onClick={() => setFont("ubuntu")}
                  className="self-start sm:self-auto px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-control-bg)] hover:bg-[var(--color-control-hover)] text-xs font-medium text-[var(--color-text-primary)] flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[var(--ubuntu-orange)]" />
                  <span>Restore Ubuntu Default</span>
                </button>
              )}
            </div>

            {/* Current Active Font Summary Banner */}
            {(() => {
              const activeFontObj = SYSTEM_FONTS.find((f) => f.id === font) ?? SYSTEM_FONTS[0];
              return (
                <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ubuntu-orange)]">
                      Current Desktop Font
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--ubuntu-orange)]/15 text-[var(--ubuntu-orange)] font-medium">
                      Active System-Wide
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    <h2
                      style={{ fontFamily: activeFontObj.fontFamily }}
                      className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight"
                    >
                      {activeFontObj.name}
                    </h2>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {activeFontObj.category} — {activeFontObj.description}
                    </span>
                  </div>

                  <p
                    style={{ fontFamily: activeFontObj.fontFamily }}
                    className="text-sm text-[var(--color-text-secondary)] italic pt-1 border-t border-[var(--color-border-subtle)]"
                  >
                    &ldquo;{activeFontObj.sample}&rdquo;
                  </p>
                </div>
              );
            })()}

            {/* Font Family Catalog Cards */}
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
                Available System Fonts
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {SYSTEM_FONTS.map((fontOpt) => {
                  const isSelected = font === fontOpt.id;
                  return (
                    <div
                      key={fontOpt.id}
                      onClick={() => setFont(fontOpt.id)}
                      className={cn(
                        "p-4 rounded-xl border text-left cursor-pointer transition-all duration-150 flex flex-col md:flex-row md:items-center justify-between gap-4 group",
                        isSelected
                          ? "ring-2 ring-[var(--ubuntu-orange)] bg-[var(--color-card-active)] border-transparent shadow-sm"
                          : "border-[var(--color-border-subtle)] bg-[var(--color-control-bg)] hover:bg-[var(--color-control-hover)]"
                      )}
                    >
                      {/* Left: Info & Specimen */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            style={{ fontFamily: fontOpt.fontFamily }}
                            className="text-base font-bold text-[var(--color-text-primary)]"
                          >
                            {fontOpt.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-card-bg)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
                            {fontOpt.category}
                          </span>
                          {fontOpt.id === "ubuntu" && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-[var(--ubuntu-orange)] font-medium">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[var(--color-text-muted)]">
                          {fontOpt.description}
                        </p>

                        <div
                          style={{ fontFamily: fontOpt.fontFamily }}
                          className="text-sm text-[var(--color-text-primary)] pt-1 select-text"
                        >
                          {fontOpt.sample}
                        </div>

                        <div
                          style={{ fontFamily: fontOpt.fontFamily }}
                          className="text-xs text-[var(--color-text-muted)] tracking-wider"
                        >
                          ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                        </div>
                      </div>

                      {/* Right: Selection Action */}
                      <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                        {isSelected ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ubuntu-orange)] px-3 py-1.5 rounded-lg bg-[var(--ubuntu-orange)]/10">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Selected</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFont(fontOpt.id);
                            }}
                            className="px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] hover:bg-[var(--color-control-hover)] text-xs font-medium text-[var(--color-text-primary)] transition-colors"
                          >
                            Apply Font
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Type Tester & Sandbox */}
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Interactive Type Tester
                  </h2>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Test live rendering, font size scaling, and weights in the active font.
                  </p>
                </div>

                {/* Font size control */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs text-[var(--color-text-muted)]">Size:</span>
                  <input
                    type="range"
                    min="12"
                    max="36"
                    value={testFontSize}
                    onChange={(e) => setTestFontSize(Number(e.target.value))}
                    className="w-24 accent-[var(--ubuntu-orange)] cursor-pointer"
                  />
                  <span className="text-xs font-mono text-[var(--color-text-primary)] w-8 text-right">
                    {testFontSize}px
                  </span>
                </div>
              </div>

              {/* Editable tester input */}
              <div>
                <input
                  type="text"
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  placeholder="Type anything here to test..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
                />
              </div>

              {/* Dynamic specimen preview */}
              <div className="p-4 rounded-xl bg-[var(--color-control-bg)] border border-[var(--color-border-subtle)] space-y-3">
                <div className="text-[10px] uppercase font-semibold text-[var(--color-text-muted)] tracking-wider">
                  Live Preview ({testFontSize}px)
                </div>
                <div
                  style={{ fontSize: `${testFontSize}px` }}
                  className="text-[var(--color-text-primary)] leading-relaxed break-words transition-all"
                >
                  {testText || "The quick brown fox jumps over the lazy dog"}
                </div>
              </div>

              {/* Weights specimen grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-[var(--color-control-bg)] border border-[var(--color-border-subtle)] space-y-1">
                  <div className="text-[10px] text-[var(--color-text-muted)] font-medium">Regular (400)</div>
                  <div className="text-xs font-normal text-[var(--color-text-primary)] truncate">
                    {testText || "Sample Text"}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-control-bg)] border border-[var(--color-border-subtle)] space-y-1">
                  <div className="text-[10px] text-[var(--color-text-muted)] font-medium">Medium (500)</div>
                  <div className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                    {testText || "Sample Text"}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-control-bg)] border border-[var(--color-border-subtle)] space-y-1">
                  <div className="text-[10px] text-[var(--color-text-muted)] font-medium">Bold (700)</div>
                  <div className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                    {testText || "Sample Text"}
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture / Monospace Note */}
            <div className="p-4 rounded-2xl bg-[var(--color-control-bg)]/60 border border-[var(--color-border-subtle)] flex items-start gap-3 text-xs text-[var(--color-text-muted)] leading-relaxed">
              <Type className="w-4 h-4 text-[var(--ubuntu-orange)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--color-text-primary)]">System Typography Note:</strong> Choosing a font changes the UI typeface across all windows, top bar, dock, and applications. Developer environments (Terminal and VS Code) remain locked to <span className="font-mono text-[var(--color-text-primary)]">Ubuntu Mono</span> to guarantee fixed-width CLI alignment and authentic terminal behavior.
              </div>
            </div>
          </div>
        )}

        {/* Displays section mock */}
        {activeSection === "displays" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Displays</h1>
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[var(--color-text-primary)]">Primary Display</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Built-in Display (1920 × 1080 @ 60 Hz)</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-[var(--ubuntu-orange)] text-white font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Ubuntu Desktop section mock */}
        {activeSection === "desktop" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Ubuntu Desktop</h1>
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="text-sm font-semibold text-[var(--color-text-primary)]">Dock Configuration</div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Dock panel is docked at the bottom in floating mode with dynamic auto-hide support.
              </p>
            </div>
          </div>
        )}

        {/* Sound section mock */}
        {activeSection === "sound" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Sound</h1>
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="text-sm font-semibold text-[var(--color-text-primary)]">Output Device</div>
              <div className="text-xs text-[var(--color-text-muted)]">Headphones / Stereo Speakers</div>
            </div>
          </div>
        )}

        {/* Power section mock */}
        {activeSection === "power" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Power</h1>
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="text-sm font-semibold text-[var(--color-text-primary)]">Power Mode</div>
              <div className="text-xs text-emerald-400 font-medium">Balanced (Recommended)</div>
            </div>
          </div>
        )}

        {/* About section mock */}
        {activeSection === "about" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">About</h1>
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-2xl p-5 space-y-3 text-xs shadow-sm">
              <div className="flex justify-between py-1.5 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">OS Name</span>
                <span className="font-medium text-[var(--color-text-primary)]">Ubuntu 24.04.1 LTS (Noble Numbat)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">GNOME Version</span>
                <span className="font-medium text-[var(--color-text-primary)]">46.0</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">Windowing System</span>
                <span className="font-medium text-[var(--color-text-primary)]">Wayland</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[var(--color-text-muted)]">Virtual Environment</span>
                <span className="font-medium text-[var(--color-text-primary)]">Next.js 16 Web OS Shell</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2.5 text-left transition-colors focus:outline-none",
        active
          ? "bg-[var(--color-card-active)] text-[var(--color-text-primary)] font-medium"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-hover)]"
      )}
    >
      <Icon className={cn("w-4 h-4", active ? "text-[var(--ubuntu-orange)]" : "text-[var(--color-text-muted)]")} />
      <span className="truncate">{label}</span>
    </button>
  );
}
