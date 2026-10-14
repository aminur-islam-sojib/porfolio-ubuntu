"use client";

import * as React from "react";
import { useSystemStore } from "@/store/system";
import { useWindowStore } from "@/store/windows";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Slider } from "@/components/ui/Slider";
import { motion, AnimatePresence } from "motion/react";
import {
  Wifi,
  Volume2,
  VolumeX,
  Sun,
  Bluetooth,
  Settings,
  Lock,
  Power,
  Gauge,
  Contrast,
  Plane,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/cn";

export function QuickSettings() {
  const isQuickSettingsOpen = useSystemStore((state) => state.isQuickSettingsOpen);
  const theme = useSystemStore((state) => state.theme);
  const volume = useSystemStore((state) => state.volume);
  const wifiConnected = useSystemStore((state) => state.wifiConnected);
  const bluetoothConnected = useSystemStore((state) => state.bluetoothConnected);
  const prefersReducedMotion = useReducedMotion();

  const [brightness, setBrightness] = React.useState(85);
  const [nightLight, setNightLight] = React.useState(false);
  const [airplaneMode, setAirplaneMode] = React.useState(false);
  const [powerMode, setPowerMode] = React.useState<"Balanced" | "Performance" | "Power Saver">("Balanced");

  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isQuickSettingsOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        useSystemStore.getState().setQuickSettingsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        useSystemStore.getState().setQuickSettingsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQuickSettingsOpen]);

  // Handlers
  const handleScreenshot = () => {
    const flash = document.createElement("div");
    flash.className = "fixed inset-0 bg-white/70 z-[99999] pointer-events-none transition-opacity duration-300";
    document.body.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 300);
    }, 100);

    useSystemStore.getState().addNotification({
      title: "Screenshot Captured",
      message: "Desktop screenshot saved to Pictures/Screenshot.png",
    });
  };

  const handleSettings = () => {
    useWindowStore.getState().openWindow("settings");
    useSystemStore.getState().setQuickSettingsOpen(false);
  };

  const handleLock = () => {
    useSystemStore.getState().lockScreen();
  };

  const handlePower = () => {
    useSystemStore.getState().reboot();
  };

  const toggleWifi = () => {
    const next = !wifiConnected;
    useSystemStore.getState().setWifiConnected(next);
    if (next && airplaneMode) {
      setAirplaneMode(false);
    }
    useSystemStore.getState().addNotification({
      title: "Wi-Fi",
      message: next ? "Connected to Wi-Fi: FNSA (5 GHz)" : "Wi-Fi disconnected",
    });
  };

  const toggleBluetooth = () => {
    const next = !bluetoothConnected;
    useSystemStore.getState().setBluetoothConnected(next);
    useSystemStore.getState().addNotification({
      title: "Bluetooth",
      message: next ? "Bluetooth active and discoverable" : "Bluetooth disabled",
    });
  };

  const cyclePowerMode = () => {
    const modes: ("Balanced" | "Performance" | "Power Saver")[] = ["Balanced", "Performance", "Power Saver"];
    const nextIdx = (modes.indexOf(powerMode) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    setPowerMode(nextMode);
    useSystemStore.getState().addNotification({
      title: "Power Profile",
      message: `Power mode switched to ${nextMode}`,
    });
  };

  const toggleNightLight = () => {
    const next = !nightLight;
    setNightLight(next);
    useSystemStore.getState().addNotification({
      title: "Night Light",
      message: next ? "Night Light enabled (warm color temperature)" : "Night Light disabled",
    });
  };

  const toggleAirplaneMode = () => {
    const next = !airplaneMode;
    setAirplaneMode(next);
    if (next) {
      useSystemStore.getState().setWifiConnected(false);
      useSystemStore.getState().setBluetoothConnected(false);
      useSystemStore.getState().addNotification({
        title: "Airplane Mode",
        message: "Airplane Mode enabled (Wi-Fi and Bluetooth disabled)",
      });
    } else {
      useSystemStore.getState().setWifiConnected(true);
      useSystemStore.getState().setBluetoothConnected(true);
      useSystemStore.getState().addNotification({
        title: "Airplane Mode",
        message: "Airplane Mode disabled (Radios restored)",
      });
    }
  };

  return (
    <AnimatePresence>
      {isQuickSettingsOpen && (
        <motion.div
          ref={menuRef}
          role="menu"
          aria-label="Quick Settings"
          initial={{ opacity: 0, scale: 0.94, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
          }
          style={{ transformOrigin: "top right" }}
          className="fixed top-[34px] right-2 z-[99990] w-[360px] sm:w-[380px] rounded-[8px] bg-[var(--color-qs-bg)] border border-[var(--color-qs-border)] shadow-[var(--shadow-qs)] p-3.5 space-y-3.5 select-none text-[var(--color-qs-tile-text)] transition-colors will-change-transform"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. Top Header: Battery Pill on Left & 4 Round Action Buttons on Right */}
          <div className="flex items-center justify-between">
            {/* Left: Battery status pill */}
            <button
              type="button"
              onClick={() => {
                useSystemStore.getState().addNotification({
                  title: "Battery",
                  message: "Battery is at 97% (Charging — 18m to full)",
                });
              }}
              aria-label="Battery Status: 97% Charging"
              className="h-9 px-3 rounded-full bg-[var(--color-qs-tile-bg)] hover:bg-[var(--color-qs-tile-hover)] active:scale-95 text-[var(--color-qs-tile-text)] flex items-center gap-1.5 font-normal text-xs transition-all shrink-0"
            >
              <div className="flex items-center gap-1 shrink-0">
                {/* Charging lightning bolt */}
                <svg className="w-2.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                {/* Vertical battery outline + fill */}
                <svg className="w-3 h-4 stroke-current fill-none" viewBox="0 0 12 16" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3.5 1h5v1h-5z" fill="currentColor" stroke="none" />
                  <rect x="1" y="2.5" width="10" height="12.5" rx="1.5" stroke="currentColor" />
                  <rect x="2.5" y="4" width="7" height="9.5" rx="0.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="font-normal text-[12px] tracking-normal">97%</span>
            </button>

            {/* Right: Screenshot, Settings, Lock, Power round buttons */}
            <div className="flex items-center gap-2">
              {/* Screenshot Viewfinder Button */}
              <button
                type="button"
                onClick={handleScreenshot}
                aria-label="Take Screenshot"
                title="Take Screenshot"
                className="w-9 h-9 rounded-full bg-[var(--color-qs-tile-bg)] hover:bg-[var(--color-qs-tile-hover)] active:scale-90 text-[var(--color-qs-tile-text)] flex items-center justify-center transition-all"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 8V6a2 2 0 0 1 2-2h2" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                  <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
                  <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>

              {/* Settings Button */}
              <button
                type="button"
                onClick={handleSettings}
                aria-label="Settings"
                title="Settings"
                className="w-9 h-9 rounded-full bg-[var(--color-qs-tile-bg)] hover:bg-[var(--color-qs-tile-hover)] active:scale-90 text-[var(--color-qs-tile-text)] flex items-center justify-center transition-all"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Lock Screen Button */}
              <button
                type="button"
                onClick={handleLock}
                aria-label="Lock screen"
                title="Lock screen"
                className="w-9 h-9 rounded-full bg-[var(--color-qs-tile-bg)] hover:bg-[var(--color-qs-tile-hover)] active:scale-90 text-[var(--color-qs-tile-text)] flex items-center justify-center transition-all"
              >
                <Lock className="w-4 h-4" />
              </button>

              {/* Power / Reboot Button */}
              <button
                type="button"
                onClick={handlePower}
                aria-label="Power off or restart"
                title="Power off or restart"
                className="w-9 h-9 rounded-full bg-[var(--color-qs-tile-bg)] hover:bg-[var(--color-qs-tile-hover)] active:scale-90 text-[var(--color-qs-tile-text)] flex items-center justify-center transition-all"
              >
                <Power className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Sliders Section: Volume and Brightness */}
          <div className="space-y-2.5 px-1 py-0.5">
            {/* Volume Slider */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => useSystemStore.getState().setVolume(volume > 0 ? 0 : 75)}
                className="text-[var(--color-qs-tile-text)] hover:opacity-80 active:scale-90 transition-all"
                aria-label={volume === 0 ? "Unmute sound" : "Mute sound"}
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 opacity-60" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <Slider
                value={volume}
                onChange={(val) => useSystemStore.getState().setVolume(val)}
                aria-label="Volume slider"
              />
            </div>

            {/* Brightness Slider */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="text-[var(--color-qs-tile-text)] hover:opacity-80 transition-opacity"
                aria-label="Screen brightness"
              >
                <Sun className="w-4 h-4" />
              </button>
              <Slider
                value={brightness}
                onChange={setBrightness}
                aria-label="Screen brightness slider"
              />
            </div>
          </div>

          {/* 3. Quick Toggles Grid (2 Columns x 3 Rows) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Row 1 Left: Wi-Fi (Split Button) */}
            <div
              className={cn(
                "h-[50px] rounded-[20px] flex items-center overflow-hidden transition-all",
                wifiConnected
                  ? "bg-[var(--color-qs-tile-active-bg)] text-white"
                  : "bg-[var(--color-qs-tile-bg)] text-[var(--color-qs-tile-text)]"
              )}
            >
              <button
                type="button"
                onClick={toggleWifi}
                aria-label={`Toggle Wi-Fi (Currently ${wifiConnected ? "On" : "Off"})`}
                className="flex-1 h-full flex items-center gap-2.5 px-3 hover:opacity-90 active:scale-[0.98] transition-all text-left min-w-0"
              >
                <Wifi className="w-5 h-5 shrink-0" />
                <div className="truncate">
                  <span className="text-[13px] font-normal block leading-tight">Wi-Fi</span>
                  <span className="text-[11px] font-normal leading-tight block opacity-85 truncate">
                    {wifiConnected ? "FNSA" : "Off"}
                  </span>
                </div>
              </button>
              <div
                className={cn(
                  "w-[1px] h-6 shrink-0 transition-colors",
                  wifiConnected ? "bg-[var(--color-qs-active-divider)]" : "bg-[var(--color-qs-divider)]"
                )}
              />
              <button
                type="button"
                onClick={toggleWifi}
                aria-label="Wi-Fi Details"
                className="w-8 h-full flex items-center justify-center hover:opacity-80 active:scale-90 transition-all shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Row 1 Right: Bluetooth (Split Button) */}
            <div
              className={cn(
                "h-[50px] rounded-[20px] flex items-center overflow-hidden transition-all",
                bluetoothConnected
                  ? "bg-[var(--color-qs-tile-active-bg)] text-white"
                  : "bg-[var(--color-qs-tile-bg)] text-[var(--color-qs-tile-text)]"
              )}
            >
              <button
                type="button"
                onClick={toggleBluetooth}
                aria-label={`Toggle Bluetooth (Currently ${bluetoothConnected ? "On" : "Off"})`}
                className="flex-1 h-full flex items-center gap-2.5 px-3 hover:opacity-90 active:scale-[0.98] transition-all text-left min-w-0"
              >
                <Bluetooth className="w-5 h-5 shrink-0" />
                <div className="truncate">
                  <span className="text-[13px] font-normal block leading-tight">Bluetooth</span>
                </div>
              </button>
              <div
                className={cn(
                  "w-[1px] h-6 shrink-0 transition-colors",
                  bluetoothConnected ? "bg-[var(--color-qs-active-divider)]" : "bg-[var(--color-qs-divider)]"
                )}
              />
              <button
                type="button"
                onClick={toggleBluetooth}
                aria-label="Bluetooth Details"
                className="w-8 h-full flex items-center justify-center hover:opacity-80 active:scale-90 transition-all shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Row 2 Left: Power Mode (Split Button) */}
            <div className="h-[50px] rounded-[20px] bg-[var(--color-qs-tile-bg)] text-[var(--color-qs-tile-text)] flex items-center overflow-hidden transition-all">
              <button
                type="button"
                onClick={cyclePowerMode}
                aria-label={`Power Mode: ${powerMode}`}
                className="flex-1 h-full flex items-center gap-2.5 px-3 hover:opacity-90 active:scale-[0.98] transition-all text-left min-w-0"
              >
                <Gauge className="w-5 h-5 shrink-0" />
                <div className="truncate">
                  <span className="text-[13px] font-normal block leading-tight">Power Mode</span>
                  <span className="text-[11px] font-normal text-[var(--color-qs-tile-subtext)] leading-tight block truncate">
                    {powerMode}
                  </span>
                </div>
              </button>
              <div className="w-[1px] h-6 shrink-0 bg-[var(--color-qs-divider)] transition-colors" />
              <button
                type="button"
                onClick={cyclePowerMode}
                aria-label="Cycle Power Mode Profile"
                className="w-8 h-full flex items-center justify-center hover:opacity-80 active:scale-90 transition-all shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Row 2 Right: Night Light (Single Button) */}
            <button
              type="button"
              onClick={toggleNightLight}
              aria-label={`Toggle Night Light (Currently ${nightLight ? "On" : "Off"})`}
              className={cn(
                "h-[50px] rounded-[20px] px-3.5 flex items-center gap-2.5 transition-all text-left w-full active:scale-[0.98]",
                nightLight
                  ? "bg-[var(--color-qs-tile-active-bg)] text-white hover:bg-[var(--color-qs-tile-active-hover)]"
                  : "bg-[var(--color-qs-tile-bg)] text-[var(--color-qs-tile-text)] hover:bg-[var(--color-qs-tile-hover)]"
              )}
            >
              <svg
                className="w-5 h-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <span className="text-[13px] font-normal block leading-tight truncate">Night Light</span>
            </button>

            {/* Row 3 Left: Dark Style (Single Button) -> Switches Dark/Light Mode */}
            <button
              type="button"
              onClick={() => useSystemStore.getState().toggleTheme()}
              aria-label={`Toggle Dark Style (Currently ${theme === "dark" ? "Enabled (Dark Mode)" : "Disabled (Light Mode)"})`}
              className={cn(
                "h-[50px] rounded-[20px] px-3.5 flex items-center gap-2.5 transition-all text-left w-full active:scale-[0.98]",
                theme === "dark"
                  ? "bg-[var(--color-qs-tile-active-bg)] text-white hover:bg-[var(--color-qs-tile-active-hover)]"
                  : "bg-[var(--color-qs-tile-bg)] text-[var(--color-qs-tile-text)] hover:bg-[var(--color-qs-tile-hover)]"
              )}
            >
              <Contrast className="w-5 h-5 shrink-0" />
              <span className="text-[13px] font-normal block leading-tight truncate">Dark Style</span>
            </button>

            {/* Row 3 Right: Airplane Mode (Single Button) */}
            <button
              type="button"
              onClick={toggleAirplaneMode}
              aria-label={`Toggle Airplane Mode (Currently ${airplaneMode ? "On" : "Off"})`}
              className={cn(
                "h-[50px] rounded-[20px] px-3.5 flex items-center gap-2.5 transition-all text-left w-full active:scale-[0.98]",
                airplaneMode
                  ? "bg-[var(--color-qs-tile-active-bg)] text-white hover:bg-[var(--color-qs-tile-active-hover)]"
                  : "bg-[var(--color-qs-tile-bg)] text-[var(--color-qs-tile-text)] hover:bg-[var(--color-qs-tile-hover)]"
              )}
            >
              <Plane className="w-5 h-5 shrink-0" />
              <span className="text-[13px] font-normal block leading-tight truncate">Airplane Mode</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
