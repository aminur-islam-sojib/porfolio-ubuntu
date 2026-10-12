# AGENTS.md — Ubuntu Desktop Portfolio

You are building a **developer portfolio that behaves like an Ubuntu (GNOME/Yaru) desktop running in the browser**.
Desktop = windowed OS experience. Tablet and phone = purpose-built touch shells (NOT the shrunken desktop).
Quality bar: smooth (60fps), classy, authentic Ubuntu feel, fast first load, accessible, recruiter-friendly.

## Stack (do not swap without asking)
- Next.js (latest stable, App Router) + TypeScript (strict)
- Tailwind CSS + CSS variables (design tokens in `src/styles/tokens.css`)
- Zustand for all window/system state
- `react-rnd` for drag/resize, wrapped by our own `<Window>` so it can be swapped later
- `motion` (framer-motion successor, `motion/react`) for animation
- `lucide-react` for UI glyphs; Yaru-style SVG icons live in `public/icons/`
- Fonts via `next/font/google`: **Ubuntu** (UI) and **Ubuntu Mono** (terminal/code)
- Package manager: pnpm (or npm if pnpm is unavailable)

## Folder map
```
src/
  app/                 layout.tsx, page.tsx, globals.css
  components/
    shell/             Desktop, TopBar, Dock, Activities, ContextMenu, BootScreen, LockScreen, SnapPreview, QuickSettings
    window/            WindowManager, Window, TitleBar, WindowControls
    mobile/            PhoneShell, TabletShell, HomeGrid, StatusBar, AppSwitcher
    ui/                shared primitives (Button, Switch, Slider, Menu, Tooltip)
  apps/                one folder per app + registry.ts
  store/               windows.ts, system.ts
  hooks/               useLayoutMode, useHotkeys, useReducedMotion
  data/                profile.ts, projects.ts, skills.ts, experience.ts (ALL content lives here)
  lib/                 geometry.ts, snap.ts, cn.ts
  styles/              tokens.css
docs/                  PRD.md, DESIGN.md, ROADMAP.md, PROMPTS.md
```

## Commands
- `pnpm dev` — dev server
- `pnpm build && pnpm start` — production check (always verify before finishing a phase)
- `pnpm lint` and `pnpm tsc --noEmit` — must pass with zero errors

## Non-negotiable rules
1. **Read the matching skill in `.agent/skills/` before starting any task** (window-manager, ubuntu-design-system, shell-components, desktop-apps, mobile-tablet-shell, motion-performance, content-seo-a11y).
2. **All visual values come from tokens** (`tokens.css`). No random hex codes or magic pixel values in components.
3. **Animate only `transform` and `opacity`.** Never animate `top/left/width/height` during drag or open/close.
4. **One source of truth for windows**: the Zustand store. Components never keep their own position/size/z-index state.
5. **Every app is lazy-loaded** with `next/dynamic` and registered in `src/apps/registry.ts`.
6. **Content is data**: never hardcode portfolio text in JSX. Use `src/data/*`.
7. **Desktop, tablet and phone share app components**; only the shell changes.
8. **Respect `prefers-reduced-motion`**, keyboard navigation, focus rings, and ARIA roles.
9. Do not copy Canonical/Ubuntu logos or trademarked assets. Use original branding, open fonts, and open icon styles.
10. Never invent facts about the owner (jobs, clients, metrics). Use clearly marked `TODO:` placeholders in `src/data/*`.

## Working style
- Work **one phase at a time** from `docs/ROADMAP.md`. Do not start the next phase until the current phase's acceptance criteria pass.
- Start each phase with a short plan (files to create/change). Keep diffs focused.
- After each phase: run lint, tsc, build; open the app in the browser and verify visually at 1440px, 820px and 390px widths; note results.
- If a requirement is ambiguous, pick the Ubuntu-authentic option and state the assumption in your summary.
- Keep components under ~200 lines; extract hooks/helpers.

## Definition of done (per phase)
- Acceptance criteria in `docs/ROADMAP.md` met
- No TS/ESLint errors, no console errors/warnings, build passes
- 60fps drag on a mid-range laptop (check with the browser performance panel when possible)
- Keyboard-accessible and reduced-motion safe
- Short summary: what changed, what to test, known gaps
