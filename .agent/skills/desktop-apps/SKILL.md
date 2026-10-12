---
name: desktop-apps
description: Conventions and architecture for desktop applications in the Ubuntu portfolio
---

# Desktop Apps Skill Specification

## 1. App Architecture
- Every app is a folder in `src/apps/<AppId>/` containing an `index.tsx` component.
- Every app is lazily loaded using `next/dynamic` in `src/apps/registry.ts`.
- App components must be layout-agnostic: they receive no window chrome props and focus solely on content presentation.
- App state is self-contained or reads from `src/data/*`.

## 2. Core Apps
1. **About (`About/index.tsx`)**:
   - Styled like Ubuntu Settings > About.
   - Profile summary, hardware specs ("Full-Stack Engine", "Memory: Unlimited Curiosity"), OS version "Ubuntu 24.04 LTS (Portfolio Edition)".
2. **Terminal (`Terminal/index.tsx`)**:
   - Ubuntu Mono font, dark background `#300A24` (authentic purple-black).
   - Built-in commands: `help`, `neofetch`, `skills`, `projects`, `cat resume.md`, `contact`, `clear`, `sudo`.
   - Command history (up/down arrow) and tab-completion.
3. **Projects (`Projects/index.tsx`)**:
   - Filterable grid (Full-Stack, Frontend, Backend, AI/Cloud).
   - Card previews, live demo buttons, source code links, tech stack badges.
4. **Files (`Files/index.tsx`)**:
   - Nautilus file manager styling.
   - Folders: Documents, Projects, Skills, Certificates.
5. **Resume (`Resume/index.tsx`)**:
   - Embedded PDF preview with "Download PDF" action bar.
6. **Mail / Contact (`Mail/index.tsx`)**:
   - Thunderbird-styled email composer.
   - Connects to `/api/contact` with input validation and rate limiting.

