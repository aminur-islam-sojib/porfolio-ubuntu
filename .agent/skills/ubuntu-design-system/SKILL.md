---
name: ubuntu-design-system
description: Design system specification for Ubuntu 24.04 (GNOME/Yaru) theme in Next.js/Tailwind
---

# Ubuntu 24.04 Design System (Yaru + GNOME 46)

## 1. Color Tokens

### Primary Accents
- Ubuntu Orange: `#E95420` (canonical brand accent, buttons, selection, active indicators)
- Ubuntu Warm Orange Hover: `#FF6D3B`
- Ubuntu Orange Active: `#D03F0D`
- Ubuntu Aubergine (Dark): `#77216F`
- Ubuntu Aubergine (Mid): `#5E2750`
- Ubuntu Aubergine (Deep): `#2C001E` (wallpaper gradients)

### Yaru Dark (Default Desktop Shell)
- Shell Background (TopBar / System): `#111111` (rgba(17, 17, 17, 0.95) backdrop blur)
- Dock Background: `rgba(16, 16, 16, 0.88)` with `backdrop-filter: blur(16px)`
- Window Background (Dark): `#242424` / `#1E1E1E`
- Window Header / TitleBar: `#2E2E2E`
- Window Header Inactive: `#262626`
- Card / Panel Background: `#303030`
- Card Hover: `#3A3A3A`
- Border Subtle: `rgba(255, 255, 255, 0.08)`
- Border Focused: `#E95420`
- Foreground Primary: `#FFFFFF`
- Foreground Secondary: `#B0B0B0`
- Foreground Muted: `#7A7A7A`

### Yaru Light (Optional Switcher Theme)
- Window Background (Light): `#FAFAFA`
- Window Header (Light): `#EBEBEB`
- Card / Panel Background: `#F2F2F2`
- Foreground Primary: `#111111`
- Foreground Secondary: `#4A4A4A`
- Border Subtle: `rgba(0, 0, 0, 0.1)`

### Status & System Colors
- Success (Green): `#38B44A`
- Warning (Yellow): `#EFB73E`
- Danger (Red): `#DF382C`
- Info (Blue): `#19B6EE`
- Running Indicator Dot: `#E95420` (orange dot on dock icon)

## 2. Typography

- **UI Font**: `Ubuntu` (via `next/font/google`, weights: 300, 400, 500, 700)
- **Monospace Font**: `Ubuntu Mono` (weights: 400, 700)
- Heading 1: `text-2xl font-bold tracking-tight` (24px)
- Heading 2: `text-xl font-medium` (20px)
- Body: `text-sm font-normal` (14px, Ubuntu default UI size)
- Caption / Small: `text-xs font-normal` (12px)
- TitleBar Title: `text-sm font-medium` (14px)
- Terminal: `text-xs sm:text-sm font-mono leading-relaxed`

## 3. Geometry & Spacing (4px Grid)

- TopBar Height: `30px` (authentic GNOME height)
- Dock Width (Desktop): `56px` (48px icon + padding)
- Window TitleBar Height: `40px`
- Window Corner Radius: `12px` (`rounded-xl` in Tailwind)
- Window Controls: `14px` circular buttons with `8px` spacing
  - Close button: `#444444` base, `#E95420` on hover (classic Ubuntu close)
  - Minimize button: `#444444` base, `#555555` on hover
  - Maximize button: `#444444` base, `#555555` on hover
- Buttons & Inputs Radius: `6px` (`rounded-md`)
- Popover / Menu Radius: `8px` (`rounded-lg`)

## 4. Shadows & Elevation

- Window Default Shadow: `0 14px 40px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.3)`
- Window Inactive Shadow: `0 6px 20px rgba(0, 0, 0, 0.35)`
- Menu / Context Shadow: `0 8px 24px rgba(0, 0, 0, 0.5)`
- Dock Tooltip Shadow: `0 4px 12px rgba(0, 0, 0, 0.4)`

## 5. Motion Durations & Curves

- Fast / Hover: `120ms ease-out`
- Normal / Menu / Collapse: `200ms ease-out`
- Window Open / Maximize: `300ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Rule**: Animate **only** `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`.

