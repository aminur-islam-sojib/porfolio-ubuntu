import { create } from "zustand";
import { APP_REGISTRY, AppMetadata } from "@/apps/registry";
import {
  calculateCascadePosition,
  clampWindowPosition,
  getDesktopBounds,
} from "@/lib/geometry";
import { SnapZone, getSnapBounds } from "@/lib/snap";

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  snapZone: SnapZone;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  minWidth: number;
  minHeight: number;
}

interface WindowStoreState {
  windows: Record<string, WindowState>;
  openWindowIds: string[];
  mruOrder: string[];
  activeId: string | null;
  highestZIndex: number;
  openCount: number;

  // Snap Preview
  previewSnapZone: SnapZone;
  setPreviewSnapZone: (zone: SnapZone) => void;
  applySnap: (id: string, zone: SnapZone) => void;

  // Alt + Tab Switcher
  isSwitcherOpen: boolean;
  switcherIndex: number;
  setSwitcherOpen: (open: boolean) => void;
  setSwitcherIndex: (index: number) => void;
  stepSwitcher: (step: number) => void;
  commitSwitcher: () => void;

  // Window Management Actions
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  updateBounds: (
    id: string,
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) => void;
  toggleWindow: (id: string) => void;
  clampAllWindowsOnResize: () => void;
}

// Generate initial window map from APP_REGISTRY
const createInitialWindows = (): Record<string, WindowState> => {
  const initial: Record<string, WindowState> = {};
  const appList = Object.values(APP_REGISTRY);

  appList.forEach((app: AppMetadata, idx) => {
    const cascade = calculateCascadePosition(idx, app.defaultWidth, app.defaultHeight);
    const isAboutApp = app.id === "about";

    initial[app.id] = {
      id: app.id,
      title: app.title,
      isOpen: isAboutApp,
      isMinimized: false,
      isMaximized: false,
      snapZone: "none",
      zIndex: isAboutApp ? 10 : 1,
      position: { x: cascade.x, y: cascade.y },
      size: { width: cascade.width, height: cascade.height },
      prevBounds: {
        x: cascade.x,
        y: cascade.y,
        width: cascade.width,
        height: cascade.height,
      },
      minWidth: app.minWidth,
      minHeight: app.minHeight,
    };
  });

  return initial;
};

const initialWindows = createInitialWindows();
const initialOpenIds = Object.values(initialWindows)
  .filter((w) => w.isOpen)
  .map((w) => w.id);

export const useWindowStore = create<WindowStoreState>((set, get) => ({
  windows: initialWindows,
  openWindowIds: initialOpenIds,
  mruOrder: ["about"],
  activeId: "about",
  highestZIndex: 10,
  openCount: 1,

  // Snap Preview
  previewSnapZone: "none",
  setPreviewSnapZone: (zone: SnapZone) => {
    if (get().previewSnapZone !== zone) {
      set({ previewSnapZone: zone });
    }
  },

  applySnap: (id: string, zone: SnapZone) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    if (zone === "none") {
      set({ previewSnapZone: "none" });
      return;
    }

    if (zone === "maximize") {
      state.maximizeWindow(id);
      set({ previewSnapZone: "none" });
      return;
    }

    const bounds = getDesktopBounds();
    const snapBounds = getSnapBounds(zone, bounds);
    if (!snapBounds) return;

    const nextZ = state.highestZIndex + 1;
    const shouldSavePrev = !win.isMaximized && win.snapZone === "none";

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isMaximized: false,
          snapZone: zone,
          position: { x: snapBounds.x, y: snapBounds.y },
          size: { width: snapBounds.width, height: snapBounds.height },
          prevBounds: shouldSavePrev
            ? {
                x: win.position.x,
                y: win.position.y,
                width: win.size.width,
                height: win.size.height,
              }
            : win.prevBounds,
          zIndex: nextZ,
        },
      },
      previewSnapZone: "none",
      activeId: id,
      highestZIndex: nextZ,
    });
  },

  // Alt + Tab Switcher
  isSwitcherOpen: false,
  switcherIndex: 0,
  setSwitcherOpen: (open: boolean) => set({ isSwitcherOpen: open }),
  setSwitcherIndex: (index: number) => set({ switcherIndex: index }),
  stepSwitcher: (step: number) => {
    const state = get();
    const openWins = state.mruOrder.filter((id) => state.windows[id]?.isOpen);
    if (openWins.length === 0) return;

    const count = openWins.length;
    const nextIndex = (state.switcherIndex + step + count) % count;
    set({ switcherIndex: nextIndex });
  },
  commitSwitcher: () => {
    const state = get();
    const openWins = state.mruOrder.filter((id) => state.windows[id]?.isOpen);
    if (openWins.length > 0 && openWins[state.switcherIndex]) {
      state.focusWindow(openWins[state.switcherIndex]);
    }
    set({ isSwitcherOpen: false, switcherIndex: 0 });
  },

  openWindow: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    const nextZ = state.highestZIndex + 1;
    const updatedMru = [id, ...state.mruOrder.filter((item) => item !== id)];

    if (win.isOpen) {
      set({
        windows: {
          ...state.windows,
          [id]: { ...win, isMinimized: false, zIndex: nextZ },
        },
        activeId: id,
        highestZIndex: nextZ,
        mruOrder: updatedMru,
      });
      return;
    }

    const cascade = calculateCascadePosition(
      state.openCount,
      win.size.width,
      win.size.height
    );

    const updatedOpenIds = state.openWindowIds.includes(id)
      ? state.openWindowIds
      : [...state.openWindowIds, id];

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          snapZone: "none",
          zIndex: nextZ,
          position: { x: cascade.x, y: cascade.y },
          size: { width: cascade.width, height: cascade.height },
          prevBounds: {
            x: cascade.x,
            y: cascade.y,
            width: cascade.width,
            height: cascade.height,
          },
        },
      },
      openWindowIds: updatedOpenIds,
      mruOrder: updatedMru,
      activeId: id,
      highestZIndex: nextZ,
      openCount: state.openCount + 1,
    });
  },

  closeWindow: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    const updatedWindows = {
      ...state.windows,
      [id]: {
        ...win,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        snapZone: "none" as SnapZone,
      },
    };

    const updatedOpenIds = state.openWindowIds.filter((wId) => wId !== id);
    const updatedMru = state.mruOrder.filter((item) => item !== id);

    const openWins = Object.values(updatedWindows).filter(
      (w) => w.isOpen && !w.isMinimized && w.id !== id
    );
    const nextActive = openWins.sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null;

    set({
      windows: updatedWindows,
      openWindowIds: updatedOpenIds,
      mruOrder: updatedMru,
      activeId: nextActive,
    });
  },

  minimizeWindow: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    const updatedWindows = {
      ...state.windows,
      [id]: { ...win, isMinimized: true },
    };

    const openWins = Object.values(updatedWindows).filter(
      (w) => w.isOpen && !w.isMinimized && w.id !== id
    );
    const nextActive = openWins.sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null;

    set({
      windows: updatedWindows,
      activeId: nextActive,
    });
  },

  maximizeWindow: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    const bounds = getDesktopBounds();
    const nextZ = state.highestZIndex + 1;
    const shouldSavePrev = !win.isMaximized && win.snapZone === "none";

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isMaximized: true,
          snapZone: "maximize",
          prevBounds: shouldSavePrev
            ? {
                x: win.position.x,
                y: win.position.y,
                width: win.size.width,
                height: win.size.height,
              }
            : win.prevBounds,
          position: { x: bounds.x, y: bounds.y },
          size: { width: bounds.width, height: bounds.height },
          zIndex: nextZ,
        },
      },
      activeId: id,
      highestZIndex: nextZ,
      mruOrder: [id, ...state.mruOrder.filter((item) => item !== id)],
    });
  },

  restoreWindow: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    const bounds = getDesktopBounds();
    const restored = clampWindowPosition(
      win.prevBounds.x,
      win.prevBounds.y,
      win.prevBounds.width,
      win.prevBounds.height,
      bounds
    );

    const nextZ = state.highestZIndex + 1;

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isMaximized: false,
          snapZone: "none",
          position: { x: restored.x, y: restored.y },
          size: { width: win.prevBounds.width, height: win.prevBounds.height },
          zIndex: nextZ,
        },
      },
      activeId: id,
      highestZIndex: nextZ,
      mruOrder: [id, ...state.mruOrder.filter((item) => item !== id)],
    });
  },

  toggleMaximize: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    if (win.isMaximized || win.snapZone !== "none") {
      state.restoreWindow(id);
    } else {
      state.maximizeWindow(id);
    }
  },

  focusWindow: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    const updatedMru = [id, ...state.mruOrder.filter((item) => item !== id)];

    if (state.activeId === id) {
      if (win.isMinimized) {
        set({
          windows: {
            ...state.windows,
            [id]: { ...win, isMinimized: false },
          },
          mruOrder: updatedMru,
        });
      }
      return;
    }

    const nextZ = state.highestZIndex + 1;
    set({
      windows: {
        ...state.windows,
        [id]: { ...win, isMinimized: false, zIndex: nextZ },
      },
      activeId: id,
      highestZIndex: nextZ,
      mruOrder: updatedMru,
    });
  },

  updateBounds: (id, position, size) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    const isSnapped = win.isMaximized || win.snapZone !== "none";

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          position,
          size,
          prevBounds: isSnapped
            ? win.prevBounds
            : {
                x: position.x,
                y: position.y,
                width: size.width,
                height: size.height,
              },
        },
      },
    });
  },

  toggleWindow: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    if (!win.isOpen) {
      state.openWindow(id);
    } else if (win.isMinimized) {
      state.openWindow(id);
    } else if (state.activeId === id) {
      state.minimizeWindow(id);
    } else {
      state.focusWindow(id);
    }
  },

  clampAllWindowsOnResize: () => {
    const state = get();
    const bounds = getDesktopBounds();
    const updatedWindows: Record<string, WindowState> = {};

    Object.values(state.windows).forEach((win) => {
      if (win.isMaximized) {
        updatedWindows[win.id] = {
          ...win,
          position: { x: bounds.x, y: bounds.y },
          size: { width: bounds.width, height: bounds.height },
        };
      } else if (win.snapZone !== "none") {
        const snapBounds = getSnapBounds(win.snapZone, bounds);
        if (snapBounds) {
          updatedWindows[win.id] = {
            ...win,
            position: { x: snapBounds.x, y: snapBounds.y },
            size: { width: snapBounds.width, height: snapBounds.height },
          };
        } else {
          updatedWindows[win.id] = win;
        }
      } else {
        const clamped = clampWindowPosition(
          win.position.x,
          win.position.y,
          win.size.width,
          win.size.height,
          bounds
        );
        updatedWindows[win.id] = {
          ...win,
          position: { x: clamped.x, y: clamped.y },
        };
      }
    });

    set({ windows: updatedWindows });
  },
}));
