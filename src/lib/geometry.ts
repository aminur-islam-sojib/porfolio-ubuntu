export const TOPBAR_HEIGHT = 30;
export const DOCK_WIDTH = 56;
export const TITLEBAR_HEIGHT = 40;

export interface DesktopBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getDesktopBounds(): DesktopBounds {
  if (typeof window === "undefined") {
    return {
      x: DOCK_WIDTH,
      y: TOPBAR_HEIGHT,
      width: 1200,
      height: 750,
    };
  }

  const width = Math.max(360, window.innerWidth - DOCK_WIDTH);
  const height = Math.max(300, window.innerHeight - TOPBAR_HEIGHT);

  return {
    x: DOCK_WIDTH,
    y: TOPBAR_HEIGHT,
    width,
    height,
  };
}

export function clampWindowPosition(
  x: number,
  y: number,
  width: number,
  _height: number,
  bounds: DesktopBounds = getDesktopBounds()
): { x: number; y: number } {
  const minX = bounds.x - width + 80;
  const maxX = bounds.x + bounds.width - 80;
  const minY = bounds.y;
  const maxY = bounds.y + bounds.height - TITLEBAR_HEIGHT;

  return {
    x: Math.min(Math.max(x, minX), maxX),
    y: Math.min(Math.max(y, minY), maxY),
  };
}

export function calculateCascadePosition(
  index: number,
  defaultWidth: number,
  defaultHeight: number
): { x: number; y: number; width: number; height: number } {
  const bounds = getDesktopBounds();

  // Offset by 32px per cascaded window, wrapping every 6 windows
  const offset = (index % 6) * 32;
  const initialX = bounds.x + 40 + offset;
  const initialY = bounds.y + 30 + offset;

  // Fit within screen if window dimensions exceed available area
  const fitWidth = Math.min(defaultWidth, bounds.width - 60);
  const fitHeight = Math.min(defaultHeight, bounds.height - 50);

  const clamped = clampWindowPosition(initialX, initialY, fitWidth, fitHeight, bounds);

  return {
    x: clamped.x,
    y: clamped.y,
    width: fitWidth,
    height: fitHeight,
  };
}

