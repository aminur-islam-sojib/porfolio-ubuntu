import { create } from "zustand";

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  icon?: string;
  timestamp: string;
}

export type SystemFontFamily = "ubuntu" | "inter" | "roboto" | "fira-sans" | "system";

export interface SystemFontOption {
  id: SystemFontFamily;
  name: string;
  category: string;
  description: string;
  sample: string;
  fontFamily: string;
}

export const SYSTEM_FONTS: SystemFontOption[] = [
  {
    id: "ubuntu",
    name: "Ubuntu",
    category: "Canonical Yaru UI",
    description: "Classic Ubuntu desktop identity with distinctive humanist curves",
    sample: "Ubuntu Desktop 24.04 LTS (Noble Numbat)",
    fontFamily: "var(--font-ubuntu), sans-serif",
  },
  {
    id: "inter",
    name: "Inter",
    category: "Modern UI Sans",
    description: "Highly legible geometric typeface optimized for developer interfaces",
    sample: "Full-Stack Distributed Systems & Cloud Architecture",
    fontFamily: "var(--font-inter), sans-serif",
  },
  {
    id: "roboto",
    name: "Roboto",
    category: "Neo-Grotesque",
    description: "Modern geometric curves with open, mechanical structure",
    sample: "High-Performance Next.js & React Applications",
    fontFamily: "var(--font-roboto), sans-serif",
  },
  {
    id: "fira-sans",
    name: "Fira Sans",
    category: "Mozilla Open Source",
    description: "Crisp open-source typeface tailored for Linux and high-DPI displays",
    sample: "Fast, Resilient & Accessible Software Engineering",
    fontFamily: "var(--font-fira-sans), sans-serif",
  },
  {
    id: "system",
    name: "System Default",
    category: "Native Platform",
    description: "Native operating system font stack (San Francisco / Segoe UI)",
    sample: "Native Browser Engine & Web Shell",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
];

interface SystemStoreState {
  theme: "dark" | "light";
  font: SystemFontFamily;
  isBooting: boolean;
  isLocked: boolean;
  isWelcomeOpen: boolean;
  isActivitiesOpen: boolean;
  isAppGridOpen: boolean;
  isQuickSettingsOpen: boolean;
  volume: number;
  wifiConnected: boolean;
  bluetoothConnected: boolean;
  notifications: SystemNotification[];
  wallpaper: string;
  accentColor: string;
  customWallpapers: string[];

  // Actions
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  setFont: (font: SystemFontFamily) => void;
  setWallpaper: (wallpaper: string) => void;
  setAccentColor: (accent: string) => void;
  addCustomWallpaper: (dataUrl: string) => void;
  finishBoot: () => void;
  reboot: () => void;
  lockScreen: () => void;
  unlockScreen: () => void;
  setWelcomeOpen: (open: boolean) => void;
  toggleActivities: () => void;
  setActivitiesOpen: (open: boolean) => void;
  toggleAppGrid: () => void;
  setAppGridOpen: (open: boolean) => void;
  toggleQuickSettings: () => void;
  setQuickSettingsOpen: (open: boolean) => void;
  setVolume: (volume: number) => void;
  addNotification: (notification: Omit<SystemNotification, "id" | "timestamp">) => void;
  dismissNotification: (id: string) => void;
}

export const useSystemStore = create<SystemStoreState>((set, get) => ({
  theme: "dark",
  font: "ubuntu",
  isBooting: false, // controlled by client mount on first load
  isLocked: false,
  isWelcomeOpen: false,
  isActivitiesOpen: false,
  isAppGridOpen: false,
  isQuickSettingsOpen: false,
  volume: 75,
  wifiConnected: true,
  bluetoothConnected: true,
  wallpaper: "noble-dynamic",
  accentColor: "#E95420",
  customWallpapers: [],
  notifications: [
    {
      id: "notif-1",
      title: "Welcome to Ubuntu 24.04",
      message: "Interactive developer portfolio is loaded. Use Super key or Activities to search.",
      timestamp: "Just now",
    },
  ],

  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      localStorage.setItem("ubuntu_theme", theme);
    }
    set({ theme });
  },

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },

  setFont: (font) => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-font", font);
      localStorage.setItem("ubuntu_font", font);
    }
    set({ font });
  },

  setWallpaper: (wallpaper) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ubuntu_wallpaper", wallpaper);
    }
    set({ wallpaper });
  },

  setAccentColor: (accentColor) => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--ubuntu-orange", accentColor);
      localStorage.setItem("ubuntu_accent", accentColor);
    }
    set({ accentColor });
  },

  addCustomWallpaper: (dataUrl) => {
    const next = [dataUrl, ...get().customWallpapers];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ubuntu_custom_wallpapers", JSON.stringify(next.slice(0, 5)));
      } catch {}
    }
    set({ customWallpapers: next, wallpaper: dataUrl });
  },

  finishBoot: () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ubuntu_booted", "true");
    }
    set({ isBooting: false });
  },

  reboot: () => {
    set({
      isBooting: true,
      isLocked: false,
      isWelcomeOpen: false,
      isQuickSettingsOpen: false,
      isActivitiesOpen: false,
      isAppGridOpen: false,
    });
  },

  lockScreen: () => {
    set({ isLocked: true, isQuickSettingsOpen: false });
  },

  unlockScreen: () => {
    set({ isLocked: false });
  },

  setWelcomeOpen: (open) => {
    set({ isWelcomeOpen: open });
  },

  toggleActivities: () => {
    set((state) => ({
      isActivitiesOpen: !state.isActivitiesOpen,
      isAppGridOpen: false,
      isQuickSettingsOpen: false,
    }));
  },

  setActivitiesOpen: (open) => set({ isActivitiesOpen: open }),

  toggleAppGrid: () => {
    set((state) => ({
      isAppGridOpen: !state.isAppGridOpen,
      isActivitiesOpen: false,
      isQuickSettingsOpen: false,
    }));
  },

  setAppGridOpen: (open) => set({ isAppGridOpen: open }),

  toggleQuickSettings: () => {
    set((state) => ({
      isQuickSettingsOpen: !state.isQuickSettingsOpen,
    }));
  },

  setQuickSettingsOpen: (open) => set({ isQuickSettingsOpen: open }),

  setVolume: (volume) => set({ volume }),

  addNotification: (notif) => {
    const newNotif: SystemNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: "Just now",
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
    }));
  },

  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));
