"use client";

import * as React from "react";
import { Settings, Moon, Sun, Monitor } from "lucide-react";
import { Switch } from "@/components/ui/Switch";

export default function SettingsApp() {
  const [isLight, setIsLight] = React.useState(false);

  const toggleTheme = (checked: boolean) => {
    setIsLight(checked);
    if (checked) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-xl mx-auto font-sans text-white">
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <Settings className="w-5 h-5 text-[var(--ubuntu-orange)]" />
        <div>
          <h1 className="text-lg font-bold tracking-tight">Appearance & System Settings</h1>
          <p className="text-xs text-zinc-400">Personalize desktop theme and desktop behavior</p>
        </div>
      </div>

      <div className="space-y-4">
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
                Toggle between Yaru Dark and Yaru Light palette
              </span>
            </div>
          </div>
          <Switch checked={isLight} onCheckedChange={toggleTheme} aria-label="Toggle light theme" />
        </div>

        <div className="p-4 rounded-[var(--window-radius)] bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Monitor className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-sm font-medium block">Hardware Acceleration</span>
              <span className="text-xs text-zinc-400 block">
                GPU transform compositing (60fps active)
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-400">ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

