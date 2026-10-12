import { DesktopBounds, getDesktopBounds } from "@/lib/geometry";

export type SnapZone =
  | "none"
  | "left"
  | "right"
  | "maximize"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface SnapBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

const EDGE_THRESHOLD = 24;
const CORNER_THRESHOLD = 48;

export function getSnapZone(
  clientX: number,
  clientY: number,
  bounds: DesktopBounds = getDesktopBounds()
): SnapZone {
  const isNearLeft = clientX <= bounds.x + EDGE_THRESHOLD;
  const isNearRight = clientX >= bounds.x + bounds.width - EDGE_THRESHOLD;
  const isNearTop = clientY <= bounds.y + EDGE_THRESHOLD;

  // Corners (Quarter quadrants)
  if (isNearLeft && clientY <= bounds.y + CORNER_THRESHOLD) return "top-left";
  if (isNearLeft && clientY >= bounds.y + bounds.height - CORNER_THRESHOLD) return "bottom-left";
  if (isNearRight && clientY <= bounds.y + CORNER_THRESHOLD) return "top-right";
  if (isNearRight && clientY >= bounds.y + bounds.height - CORNER_THRESHOLD) return "bottom-right";

  // Halves and Maximize
  if (isNearTop) return "maximize";
  if (isNearLeft) return "left";
  if (isNearRight) return "right";

  return "none";
}

export function getSnapBounds(
  zone: SnapZone,
  bounds: DesktopBounds = getDesktopBounds()
): SnapBounds | null {
  if (zone === "none") return null;

  const halfWidth = Math.floor(bounds.width / 2);
  const halfHeight = Math.floor(bounds.height / 2);

  switch (zone) {
    case "maximize":
      return {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
      };

    case "left":
      return {
        x: bounds.x,
        y: bounds.y,
        width: halfWidth,
        height: bounds.height,
      };

    case "right":
      return {
        x: bounds.x + halfWidth,
        y: bounds.y,
        width: halfWidth,
        height: bounds.height,
      };

    case "top-left":
      return {
        x: bounds.x,
        y: bounds.y,
        width: halfWidth,
        height: halfHeight,
      };

    case "top-right":
      return {
        x: bounds.x + halfWidth,
        y: bounds.y,
        width: halfWidth,
        height: halfHeight,
      };

    case "bottom-left":
      return {
        x: bounds.x,
        y: bounds.y + halfHeight,
        width: halfWidth,
        height: halfHeight,
      };

    case "bottom-right":
      return {
        x: bounds.x + halfWidth,
        y: bounds.y + halfHeight,
        width: halfWidth,
        height: halfHeight,
      };

    default:
      return null;
  }
}
