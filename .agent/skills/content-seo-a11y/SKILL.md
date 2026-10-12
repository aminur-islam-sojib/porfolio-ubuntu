---
name: content-seo-a11y
description: Content separation, SEO metadata, JSON-LD, accessibility and the Classic portfolio view
---

# Content, SEO & Accessibility Skill Specification

## 1. Data Separation (`src/data/*`)
- All personal data, projects, experience, skills, and links reside in `src/data/`:
  - `profile.ts`: Name, bio, avatar, location, title, links, contact details.
  - `projects.ts`: Array of projects with title, slug, summary, tags, techStack, githubUrl, liveUrl, screenshots.
  - `skills.ts`: Categories (Frontend, Backend, DevOps, Tools) with proficiency and icon keys.
  - `experience.ts`: Timeline of roles, companies, dates, and achievements.
- **Rule**: Never invent facts about the developer. Use clear `TODO:` placeholders for unverified details.

## 2. Classic Portfolio View (`/classic`)
- Provides a clean, fast-reading static HTML/CSS portfolio without the OS desktop shell.
- Direct access for recruiters, screen readers, and low-bandwidth connections.
- Easily toggleable via the desktop shell's QuickSettings and TopBar.

## 3. SEO & OpenGraph
- Comprehensive metadata in `src/app/layout.tsx`.
- Schema.org JSON-LD Person and WebSite schema.
- Dynamic OpenGraph cards.

