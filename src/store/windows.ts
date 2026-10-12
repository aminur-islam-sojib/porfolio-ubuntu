import { create } from "zustand";
import { APP_REGISTRY, AppMetadata } from "@/apps/registry";
import {
  calculateCascadePosition,
  clampWindowPosition,
  getDesktopBounds,
} from "@/lib/geometry";

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
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
  activeId: string | null;
  highestZIndex: number;
  openCount: number;

  // Actions
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
}

// Generate initial window map from APP_REGISTRY
const createInitialWindows = (): Record<string, WindowState> => {
  const initial: Record<string, WindowState> = {};
  const appList = Object.values(APP_REGISTRY);

  appList.forEach((app: AppMetadata, idx) => {
    const cascade = calculateCascadePosition(idx, app.defaultWidth, app.defaultHeight);
    // Pre-open 'about' window on launch
    const isAboutApp = app.id === "about";

    initial[app.id] = {
      id: app.id,
      title: app.title,
      isOpen: isAboutApp,
      isMinimized: false,
      isMaximized: false,
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
  activeId: "about",
  highestZIndex: 10,
  openCount: 1,

  openWindow: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    const nextZ = state.highestZIndex + 1;

    if (win.isOpen) {
      if (win.isMinimized) {
        set({
          windows: {
            ...state.windows,
            [id]: { ...win, isMinimized: false, zIndex: nextZ },
          },
          activeId: id,
          highestZIndex: nextZ,
        });
      } else {
        set({
          windows: {
            ...state.windows,
            [id]: { ...win, zIndex: nextZ },
          },
          activeId: id,
          highestZIndex: nextZ,
        });
      }
      return;
    }

    // Window was closed, calculate new cascade position
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
      [id]: { ...win, isOpen: false, isMinimized: false, isMaximized: false },
    };

    const updatedOpenIds = state.openWindowIds.filter((wId) => wId !== id);

    // Find the next active window
    const openWins = Object.values(updatedWindows).filter(
      (w) => w.isOpen && !w.isMinimized && w.id !== id
    );
    const nextActive = openWins.sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null;

    set({
      windows: updatedWindows,
      openWindowIds: updatedOpenIds,
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

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          isMaximized: true,
          prevBounds: {
            x: win.position.x,
            y: win.position.y,
            width: win.size.width,
            height: win.size.height,
          },
          position: { x: bounds.x, y: bounds.y },
          size: { width: bounds.width, height: bounds.height },
          zIndex: nextZ,
        },
      },
      activeId: id,
      highestZIndex: nextZ,
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
          position: { x: restored.x, y: restored.y },
          size: { width: win.prevBounds.width, height: win.prevBounds.height },
          zIndex: nextZ,
        },
      },
      activeId: id,
      highestZIndex: nextZ,
    });
  },

  toggleMaximize: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    if (win.isMaximized) {
      state.restoreWindow(id);
    } else {
      state.maximizeWindow(id);
    }
  },

  focusWindow: (id: string) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    if (state.activeId === id) return;

    const nextZ = state.highestZIndex + 1;
    set({
      windows: {
        ...state.windows,
        [id]: { ...win, zIndex: nextZ },
      },
      activeId: id,
      highestZIndex: nextZ,
    });
  },

  updateBounds: (id, position, size) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          position,
          size,
          prevBounds: win.isMaximized
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
}));
