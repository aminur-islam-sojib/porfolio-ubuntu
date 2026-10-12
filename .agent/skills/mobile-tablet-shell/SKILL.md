---
name: mobile-tablet-shell
description: Touch-first shell architecture for phones and tablets
---

# Mobile & Tablet Shell Skill Specification

## 1. Shell Breakdown
- Breakpoints:
  - Phone: `< 768px` -> `PhoneShell`
  - Tablet: `768px - 1023px` -> `TabletShell`
  - Desktop: `>= 1024px` -> `DesktopShell`
- Implemented via `useLayoutMode` hook with SSR hydration guard (render neutral skeleton or default layout to prevent mismatch).

## 2. Phone Shell (`src/components/mobile/PhoneShell.tsx`)
- Inspired by Ubuntu Touch / modern mobile OS:
  - Top: Mobile Status Bar (carrier, Wi-Fi, battery, clock).
  - Main View: App Grid Launcher with crisp Ubuntu app icons.
  - Active App: Fullscreen presentation with a smooth slide-up animation.
  - Navigation: Bottom gesture pill / back button to return to launcher.
  - App Switcher: Swipe-up card carousel showing recent open apps.
- **NEVER** render floating windows or window resize handles on phone.

## 3. Tablet Shell (`src/components/mobile/TabletShell.tsx`)
- Hybrid workspace:
  - Bottom auto-dock with pinned apps.
  - Single maximized window or side-by-side 50/50 split view.
  - Touch-friendly window controls (minimum 44x44px hit targets).

