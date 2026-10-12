"use client";

import * as React from "react";
import Image from "next/image";
import { useSystemStore } from "@/store/system";
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
  const customWallpapers = useSystemStore((state) => state.customWallpapers);

  const setWallpaper = useSystemStore((state) => state.setWallpaper);
  const setAccentColor = useSystemStore((state) => state.setAccentColor);
  const setTheme = useSystemStore((state) => state.setTheme);
  const addCustomWallpaper = useSystemStore((state) => state.addCustomWallpaper);

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
    <div className="flex h-full w-full bg-[var(--color-window-bg)] text-white font-sans select-none overflow-hidden">
      {/* 1. Left Sidebar */}
      <aside className="w-56 shrink-0 bg-[#202020]/90 border-r border-white/5 flex flex-col h-full">
        {/* Search header */}
        <div className="p-3 border-b border-white/5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Settings"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
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

          <div className="my-2 border-t border-white/5" />

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
            icon={Layout}
            label="Ubuntu Desktop"
            active={activeSection === "desktop"}
            onClick={() => setActiveSection("desktop")}
          />

          <div className="my-2 border-t border-white/5" />

          {/* Group 3: Apps & System */}
          <SidebarItem icon={Grid} label="Apps" active={false} onClick={() => {}} />
          <SidebarItem icon={Bell} label="Notifications" active={false} onClick={() => {}} />
          <SidebarItem icon={Search} label="Search" active={false} onClick={() => {}} />
          <SidebarItem icon={UserCheck} label="Online Accounts" active={false} onClick={() => {}} />
          <SidebarItem icon={Share2} label="Sharing" active={false} onClick={() => {}} />

          <div className="my-2 border-t border-white/5" />

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
              <h1 className="text-xl font-bold tracking-tight text-white">Appearance</h1>
            </div>

            {/* Section 1: Style (Default vs Dark) */}
            <div className="bg-[#2e2e2e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-zinc-300">Style</h2>

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
                        : "border border-white/10 bg-[#3a3a3a] opacity-80 group-hover:opacity-100"
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
                      theme === "light" ? "text-white" : "text-zinc-400"
                    )}
                  >
                    Default
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
                        : "border border-white/10 bg-[#222222] opacity-80 group-hover:opacity-100"
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
                      theme === "dark" ? "text-white" : "text-zinc-400"
                    )}
                  >
                    Dark
                  </span>
                </button>
              </div>

              {/* Accent Color Palette */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-300">Color</span>
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
                          isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-[#2e2e2e]" : ""
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

            {/* Section 2: Background Wallpapers Grid */}
            <div className="bg-[#2e2e2e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-zinc-300">Background</h2>

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
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors shadow-sm"
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
                          ? "ring-4 ring-[var(--ubuntu-orange)] ring-offset-2 ring-offset-[#242424] scale-[0.98]"
                          : "hover:scale-[1.02] border border-white/10"
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
                        "group relative aspect-[16/10] rounded-xl overflow-hidden focus:outline-none transition-all duration-150 shadow-md bg-[#242424]",
                        isSelected
                          ? "ring-4 ring-[var(--ubuntu-orange)] ring-offset-2 ring-offset-[#242424] scale-[0.98]"
                          : "hover:scale-[1.02] border border-white/10 hover:border-white/20"
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

        {/* Displays section mock */}
        {activeSection === "displays" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight">Displays</h1>
            <div className="bg-[#2e2e2e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Primary Display</div>
                  <div className="text-xs text-zinc-400">Built-in Display (1920 × 1080 @ 60 Hz)</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-[var(--ubuntu-orange)] font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Ubuntu Desktop section mock */}
        {activeSection === "desktop" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight">Ubuntu Desktop</h1>
            <div className="bg-[#2e2e2e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="text-sm font-semibold">Dock Configuration</div>
              <p className="text-xs text-zinc-400">
                Dock panel is docked at the bottom in floating mode with dynamic auto-hide support.
              </p>
            </div>
          </div>
        )}

        {/* Sound section mock */}
        {activeSection === "sound" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight">Sound</h1>
            <div className="bg-[#2e2e2e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="text-sm font-semibold">Output Device</div>
              <div className="text-xs text-zinc-400">Headphones / Stereo Speakers</div>
            </div>
          </div>
        )}

        {/* Power section mock */}
        {activeSection === "power" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight">Power</h1>
            <div className="bg-[#2e2e2e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="text-sm font-semibold">Power Mode</div>
              <div className="text-xs text-emerald-400">Balanced (Recommended)</div>
            </div>
          </div>
        )}

        {/* About section mock */}
        {activeSection === "about" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl font-bold tracking-tight">About</h1>
            <div className="bg-[#2e2e2e]/80 border border-white/10 rounded-2xl p-5 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">OS Name</span>
                <span className="font-medium text-white">Ubuntu 24.04.1 LTS (Noble Numbat)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">GNOME Version</span>
                <span className="font-medium text-white">46.0</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Windowing System</span>
                <span className="font-medium text-white">Wayland</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-zinc-400">Virtual Environment</span>
                <span className="font-medium text-white">Next.js 16 Web OS Shell</span>
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
          ? "bg-white/10 text-white font-medium"
          : "text-zinc-400 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon className={cn("w-4 h-4", active ? "text-[var(--ubuntu-orange)]" : "text-zinc-400")} />
      <span className="truncate">{label}</span>
    </button>
  );
}
