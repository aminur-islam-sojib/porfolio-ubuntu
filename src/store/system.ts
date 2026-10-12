import { create } from "zustand";

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  icon?: string;
  timestamp: string;
}

interface SystemStoreState {
  theme: "dark" | "light";
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
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    set({ theme });
  },

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
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
