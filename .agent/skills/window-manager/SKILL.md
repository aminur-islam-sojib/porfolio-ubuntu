---
name: window-manager
description: Architectural and operational rules for the Zustand window manager, window drag, resize, snapping, and Alt+Tab
---

# Window Manager Skill Specification

## 1. Single Source of Truth: Zustand Store
- Store path: `src/store/windows.ts`
- Windows map: `Record<string, WindowState>`
- Active window ID: `activeId: string | null`
- Window state properties:
  - `id`: unique app identifier (e.g. `'terminal'`, `'projects'`)
  - `title`: string
  - `icon`: string / React node
  - `isOpen`: boolean
  - `isMinimized`: boolean
  - `isMaximized`: boolean
  - `isFocused`: boolean
  - `zIndex`: number
  - `position`: `{ x: number, y: number }`
  - `size`: `{ width: number, height: number }`
  - `prevBounds`: `{ x: number, y: number, width: number, height: number }` (for restore from maximize)
  - `snapZone`: `'none' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'maximize'`
  - `minWidth`: number (default: 360)
  - `minHeight`: number (default: 240)

## 2. Drag & Resize Rules
- Wrap `react-rnd` inside `src/components/window/Window.tsx`.
- Never store position or size in React local state (`useState`). Read from and commit to Zustand.
- Clamp coordinates so windows cannot be dragged entirely off-screen. Titlebar must always remain reachable (y >= 30px below TopBar).
- During drag: apply `will-change: transform`. Do not trigger re-renders in other windows.
- Inactive windows must render with reduced shadow and dimmed titlebar.

## 3. Snapping Behavior
- When dragged within 20px of screen edges:
  - Left edge: Snap preview for left 50%
  - Right edge: Snap preview for right 50%
  - Top edge: Snap preview for full maximize
  - Corners: Snap preview for 25% quadrants
- Releasing pointer applies snap layout. Dragging from snapped state restores previous bounds.

## 4. Alt+Tab Switcher & Shortcuts
- `Alt + Tab`: Opens switcher modal showing open windows in MRU order.
- `Super` / `Win`: Toggles Activities Overview.
- `Ctrl + Alt + T`: Spawns or focuses Terminal.

