# PROMPTS: copy-paste into Antigravity, one phase at a time

Tip: use Planning mode for each phase, review the plan, then let the agent build. Start a NEW conversation per phase if the context gets long (the agent re-reads AGENTS.md, rules and skills automatically).

---
## Kickoff (once)
```
Read AGENTS.md, docs/PRD.md, docs/ROADMAP.md and every skill in .agents/skills. Summarize in 10 bullets what we are building and the architecture you will follow. Do not write code yet. List any questions or missing inputs.
```

## Phase 0
```
/build-phase 0
Use the ubuntu-design-system skill. Set up Next.js (App Router, TypeScript strict, Tailwind), install the stack from AGENTS.md, create the folder structure, fonts, tokens.css with Tailwind mapping, and a temporary /dev/tokens page. Data files must contain TODO placeholders only.
```

## Phase 1
```
/build-phase 1
Use shell-components and ubuntu-design-system. Build the wallpaper, TopBar and left Dock with a stub registry. It must look like a clean Ubuntu 24.04 desktop at 1440px.
```

## Phase 2
```
/build-phase 2
Use window-manager and motion-performance. Build the Zustand windows store, app registry, WindowManager and Window with drag, resize, focus, maximize, minimize-to-dock, close and open animations. Use placeholder content. Prove with the React Profiler that dragging does not re-render other windows.
```

## Phase 3
```
/build-phase 3
Add snapping with preview, double-click maximize, Alt+Tab switcher, global hotkeys, title-bar context menu and re-clamping on viewport resize.
```

## Phase 4
```
/build-phase 4
Use desktop-apps. Build About, Terminal (full command list, history, tab-completion, neofetch) and Projects showcase using src/data seed data.
```

## Phase 5
```
/build-phase 5
Build the context menu, draggable desktop icons with rubber-band selection, Show Applications grid, Activities overview with search, notifications and QuickSettings with a working dark/light toggle.
```

## Phase 6
```
/build-phase 6
Build Files, Browser (sandboxed iframe + fallback), VS Code viewer (lazy Monaco or Shiki), Settings (wallpaper/accent), Mail with /api/contact (zod, rate limit, honeypot, env-driven provider), Resume and Trash.
```

## Phase 7
```
/build-phase 7
Build the skippable boot animation, lock/login screen and first-visit welcome flow. One click or key must skip everything.
```

## Phase 8
```
/build-phase 8
Use mobile-tablet-shell. Implement useLayoutMode, PhoneShell and TabletShell, adapt all apps to three modes, and prevent any wrong-shell flash on first paint. Test the device matrix from the skill.
```

## Phase 9
```
/build-phase 9
Use content-seo-a11y. Implement /classic, metadata, JSON-LD, sitemap, robots, OG image, deep links and /projects/[slug]. Use my real content from src/data (I will fill it in). Do not invent any facts.
```

## Phase 10
```
Run /review, then /visual-qa. Fix Blocker and Major issues. Run the performance checklist and bundle analysis, an accessibility audit and a production build. Prepare the Vercel deployment and list remaining manual steps.
```

---
## Handy follow-up prompts
- Fix feel: `The window drag feels heavy. Profile it using the motion-performance checklist, find the cause and fix it without changing the visuals.`
- Authenticity: `Compare the top bar, dock and window chrome against rule 01 and make them feel more like Ubuntu 24.04. List what you changed.`
- New app: `Add a new "<name>" app following the desktop-apps conventions: registry entry, lazy component, three layout modes, data in src/data.`
- Bug: `Reproduce this bug in the browser first, explain the root cause, then fix it and add a regression test if practical: <bug>`
