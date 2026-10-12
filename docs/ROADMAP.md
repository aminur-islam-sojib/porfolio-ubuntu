# ROADMAP (build one phase at a time)

Each phase ends with acceptance criteria. Do not start the next phase until they pass.

## Phase 0: Foundation
Create Next.js (App Router, TS strict, Tailwind, ESLint), install zustand, react-rnd, motion, lucide-react, clsx/tailwind-merge. Set up `@/` alias, folder structure from AGENTS.md, fonts (Ubuntu, Ubuntu Mono), `tokens.css`, Tailwind token mapping, `data/` stubs with TODO placeholders.
Skills: ubuntu-design-system.
Accept: app runs, fonts load, token showcase page (temporary `/dev/tokens`) renders colors/typography/buttons, lint+tsc+build pass.

## Phase 1: Static shell
Wallpaper, TopBar (live clock after mount), Dock (static icons from registry stub), basic Desktop layout with correct offsets.
Skills: ubuntu-design-system, shell-components.
Accept: looks like Ubuntu at 1440px, no layout shift, dock/topbar tooltips and focus rings work.

## Phase 2: Window manager (core)
Zustand store, registry, `<WindowManager>`, `<Window>`, title bar controls, drag, resize, focus/z-order, clamp, maximize/restore, minimize/restore from dock, close, open animation. Placeholder app content.
Skills: window-manager, motion-performance.
Accept: 8 windows open and behave; React Profiler shows no cross-window re-renders during drag; 60fps.

## Phase 3: Snap, shortcuts, switcher
Snap preview and apply, double-click title, Alt+Tab switcher, global hotkeys, right-click title menu, viewport-resize clamping.
Skills: window-manager.
Accept: snap to halves/quarters/maximize; shortcuts from rule 03 work.

## Phase 4: First real apps
About, Terminal (full command set), Projects showcase (with seed data).
Skills: desktop-apps.
Accept: Terminal commands from the skill all work with history/tab-complete; Projects opens detail view; all lazy-loaded.

## Phase 5: Shell interactions
Context menu, desktop icons (drag, select, open), Show Applications grid, Activities overview with search, notifications, QuickSettings (real theme toggle).
Skills: shell-components, ubuntu-design-system.
Accept: theme switch works across everything; Activities search opens apps/projects.

## Phase 6: Remaining apps
Files, Browser, VS Code viewer, Settings (wallpaper/accent), Mail (+ API route), Resume, Trash.
Skills: desktop-apps.
Accept: contact form sends a test email (env-driven) with validation and rate limiting; Browser handles blocked iframes gracefully.

## Phase 7: Boot and lock
Boot animation, lock/login screen, first-visit welcome flow, skip handling.
Skills: shell-components.
Accept: full sequence skippable in one action, never blocks, reduced-motion safe.

## Phase 8: Tablet and phone
`useLayoutMode`, PhoneShell (home grid, status bar, fullscreen apps, switcher, gestures), TabletShell (bottom dock, split view). Adapt every app to the three modes.
Skills: mobile-tablet-shell, desktop-apps.
Accept: test matrix from the skill passes; no hydration flash of the wrong shell.

## Phase 9: Content, SEO, Classic view
Fill real content, `/classic`, metadata, JSON-LD, sitemap, OG image, deep links, `/projects/[slug]`.
Skills: content-seo-a11y.
Accept: Lighthouse SEO 95+, Classic view works without JS-heavy UI, deep links open the right app.

## Phase 10: Polish, performance, launch
Run `/review` and `/visual-qa`, performance checklist, a11y audit (axe + keyboard-only), bundle analysis, easter eggs, analytics, deploy to Vercel, domain.
Skills: motion-performance, content-seo-a11y.
Accept: all budgets in rule 03 met, 3 real-device checks, production URL live.
