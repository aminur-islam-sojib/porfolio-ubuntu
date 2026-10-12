---
name: shell-components
description: Specification for TopBar, Dock, Activities, QuickSettings, BootScreen, and LockScreen
---

# Shell Components Skill Specification

## 1. TopBar (`src/components/shell/TopBar.tsx`)
- Height: `30px`, fixed at top, `z-index: 9998`.
- Left item: "Activities" button (toggles Activities Overview).
- Center item: Real-time clock formatted as `EEE MMM d  HH:mm` (e.g. `Mon Oct 12  20:45`), rendered after mount to avoid SSR hydration mismatch.
- Right items: Quick settings pill (Network icon, Volume icon, Power icon, Battery if supported).

## 2. Dock (`src/components/shell/Dock.tsx`)
- Position: Left-aligned, vertical, below TopBar (`top: 30px`, `bottom: 0`, `width: 56px`), `z-index: 9990`.
- Running dot indicator: Small 4px Ubuntu Orange dot or left pill next to running apps.
- Tooltips: Black tooltip with white text, 8px offset to the right.
- Bottom icon: "Show Applications" (9-dot grid icon) which toggles App Grid.

## 3. QuickSettings (`src/components/shell/QuickSettings.tsx`)
- Triggered by clicking the right pill in TopBar.
- Ubuntu-authentic pill layout:
  - Dark / Light mode toggle
  - Sound volume slider
  - Power / Lock / Suspend buttons
  - Classic view button

## 4. Boot & Lock Screens
- BootScreen: Authentic Ubuntu logo with loading spinner, skippable in one click or keypress (`Esc` / `Enter`).
- LockScreen: Displays profile avatar, date/time, and passwordless "Unlock" / press enter prompt.

