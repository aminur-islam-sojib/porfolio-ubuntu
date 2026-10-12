"use client";

import * as React from "react";
import { useSystemStore } from "@/store/system";
import { Settings, Moon, Sun, Check, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/Switch";

export default function SettingsApp() {
  const theme = useSystemStore((state) => state.theme);
  const isLight = theme === "light";

  const [accent, setAccent] = React.useState("#E95420");

  const accents = [
    { label: "Ubuntu Orange", color: "#E95420" },
    { label: "Teal", color: "#16A085" },
    { label: "Emerald", color: "#27AE60" },
    { label: "Blue", color: "#2980B9" },
    { label: "Purple", color: "#8E44AD" },
  ];

  const handleAccentChange = (hex: string) => {
    setAccent(hex);
    document.documentElement.style.setProperty("--ubuntu-orange", hex);
  };

  const handleToggleTheme = (checked: boolean) => {
    useSystemStore.getState().setTheme(checked ? "light" : "dark");
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-2xl mx-auto font-sans text-white select-none">
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <Settings className="w-5 h-5 text-[var(--ubuntu-orange)]" />
        <div>
          <h1 className="text-lg font-bold tracking-tight">Appearance Settings</h1>
          <p className="text-xs text-zinc-400">Customize desktop theme, accent colors, and background</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. Theme Mode Switch */}
        <div className="p-4 rounded-[var(--window-radius)] bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isLight ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
            <div>
              <span className="text-sm font-medium block">Light Theme Mode</span>
              <span className="text-xs text-zinc-400 block">
                Toggle between Yaru Dark and Yaru Light visual style
              </span>
            </div>
          </div>
          <Switch checked={isLight} onCheckedChange={handleToggleTheme} aria-label="Toggle light theme" />
        </div>

        {/* 2. Accent Color Palette */}
        <div className="p-4 rounded-[var(--window-radius)] bg-white/5 border border-white/10 space-y-3">
          <div>
            <h2 className="text-sm font-semibold">Accent Color</h2>
            <p className="text-xs text-zinc-400">Change system focus rings and primary highlight colors</p>
          </div>

          <div className="flex items-center gap-4 pt-1">
            {accents.map((acc) => {
              const isSelected = accent === acc.color;
              return (
                <button
                  key={acc.color}
                  type="button"
                  onClick={() => handleAccentChange(acc.color)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 relative"
                  style={{ backgroundColor: acc.color }}
                  title={acc.label}
                  aria-label={acc.label}
                >
                  {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Wallpaper Swatches */}
        <div className="p-4 rounded-[var(--window-radius)] bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--ubuntu-orange)]" />
            <h2 className="text-sm font-semibold">Background Atmosphere</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#77216F] to-[#2C001E] border-2 border-[var(--ubuntu-orange)] text-xs h-20 flex flex-col justify-end text-white font-medium shadow-md">
              <span>Noble Aubergine (Default)</span>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#1E1E1E] to-[#111111] border border-white/10 text-xs h-20 flex flex-col justify-end text-zinc-300 font-medium">
              <span>Dark Minimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
