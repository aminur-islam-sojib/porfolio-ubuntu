# 🐧 Ubuntu 24.04 LTS Desktop Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-443e38?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![License](https://img.shields.io/badge/License-MIT-E95420?style=for-the-badge)](LICENSE)

**An authentic, pixel-perfect developer portfolio crafted as an interactive Ubuntu 24.04 LTS (Noble Numbat / GNOME Yaru) desktop operating system running directly inside the web browser.**

[🌐 Live Demo](https://sojibahmed.vercel.app) • [📄 Classic Recruiter View](https://sojibahmed.vercel.app/classic) • [👨‍💻 About Sojib Ahmed](https://github.com/aminur-islam-sojib)

</div>

---

## 📸 Overview

This portfolio is not just another landing page—it is a fully functional web operating system engineered to deliver a 60 FPS desktop experience. Designed for recruiters, developers, and tech enthusiasts, it faithfully recreates Canonical's Ubuntu GNOME desktop with window management, a customizable dock, live system terminal, file manager, personalized settings, and adaptive touch shells for mobile and tablet devices.

```
                  .-.
                 .--.
                /    \
               |  ()  |    sojib@ubuntu-portfolio
                \    /     ----------------------
                 '--'      OS: Ubuntu 24.04.1 LTS (Noble Numbat)
                  ||       Host: Next.js 16 App Router Web OS
              .---||---.   Kernel: Linux 6.8.0-generic x86_64
             /    ||    \  Uptime: 24/7 Available for hire
            |  () || ()  | Shell: GNOME 46 / Yaru Dark & Light
             \    ||    /  Terminal: gnome-terminal + bash 5.2
              '---''---'   Stack: Next.js 16 • React 19 • TypeScript • Tailwind
```

---

## ✨ Key Features

### 🖥️ 1. Window Manager & Desktop Shell
- **60 FPS Window System**: Draggable, resizable, minimizable, and maximizable windows powered by `react-rnd` with hardware-accelerated transforms (`translate3d`).
- **Window Snapping**: Edge-drag window snapping (snap left, snap right, maximize to top, restore on drag).
- **Z-Index Layering**: True OS window hierarchy with active window focus, focus-stealing prevention, and window grouping.
- **Alt + Tab App Switcher**: Fast keyboard application switcher cycling between open windows with thumbnail indicators.
- **Plymouth Boot & GDM Lock Screen**: Authentic boot splash screen on first visit, session locking, and password/PIN unlock screen.
- **Top Bar & Panel**: Dynamic status indicators, live clock with interactive calendar drop-down, sound volume sliders, theme quick toggles, and network status.
- **Activities Overview & App Drawer**: Full GNOME-style Activities overlay search and launch grid (triggered by Super/Windows key or Activities button).
- **Desktop Context Menu**: Right-click desktop menu for quick actions (New Folder, Terminal, Display Settings, Wallpaper Switcher, Fullscreen toggle, Theme switcher, Font changer, Desktop Cat).

### 📱 2. Adaptive Multi-Device Shells
- **Desktop (1024px+)**: Full multi-window desktop operating system with floating windows.
- **Tablet (768px – 1023px)**: Stage/split-view touch shell optimized for tablets (iPad / Android tablets).
- **Phone (< 768px)**: Native mobile shell with iOS/Android-inspired gesture bar, mobile status bar, full-screen app switching, and home app grid.
- **Classic View (`/classic`)**: Clean, accessible, lightweight HTML portfolio tailored for fast recruiting reviews and screen readers.

### 📦 3. Built-in Applications
| Application | Description |
| :--- | :--- |
| **👤 About Me** | Interactive developer biography, experience timeline, technical highlights, and career journey. |
| **💼 Projects Showcase** | Filterable project showcase featuring live demos, GitHub repositories, stack tags, and architecture summaries. |
| **⚡ Skills & Proficiencies** | Categorized engineering skills matrix (Frontend, Backend, Databases, DevOps, Tools). |
| **📄 Resume Viewer** | In-app PDF resume inspector with direct download link. |
| **💻 Terminal** | Interactive Linux bash shell with custom commands, Unix pipes, ASCII art, and script execution. |
| **📁 Files (Nautilus)** | File browser with folder navigation, markdown file previewers, and downloadable documents. |
| **🌐 Chrome Browser** | Simulated web browser with tabbed navigation, URL address bar, and quick web links. |
| **📝 VS Code** | Virtual IDE code viewer displaying code snippets with syntax highlighting. |
| **✉️ Mail / Contact** | Contact message composer with form validation and direct social links. |
| **⚙️ Settings** | Full system control center (Appearance, Wallpapers, Colors, Typography Studio, Display, Sound). |
| **🗑️ Trash** | Functional recycle bin with restore and empty actions. |

### 🔤 4. Typography Studio & Multi-Font Engine
Choose between multiple curated typography styles across the entire OS:
- **Ubuntu** (Default Canonical Yaru UI)
- **Inter** (Modern developer interface sans)
- **Roboto** (Google Neo-Grotesque geometric sans)
- **Fira Sans** (Mozilla crisp open-source font)
- **System Default** (Native OS font stack: San Francisco / Segoe UI)
- *Includes an interactive Type Tester with real-time size scaling slider (12px–36px) and weight specimens.*

### 🎨 5. Ubuntu Yaru Themes & Wallpapers
- **Dark & Light Modes**: Authentic GNOME Yaru Dark (`#1E1E1E` / `#242424`) and Light (`#FAFAFA`) styling.
- **10 Ubuntu Accent Colors**: Ubuntu Orange (`#E95420`), Bark, Sage, Emerald, Teal, Blue, Indigo, Purple, Magenta, Red.
- **Official Ubuntu Wallpapers**: Noble Numbat dynamic wallpapers, Jammy Jellyfish, Focal Fossa, plus **Custom Image Uploading** support!

### 🐱 6. Feline Terminal Suite & Desktop Cat (`oneko`)
- **`oneko`**: The legendary X11 desktop kitten! Follows your mouse cursor across the screen, curls up to sleep when idle, and wakes up when moved.
- **`catsay` / `meowsay`**: Cute ASCII cat speech bubbles with mood flags (`-s` sleep, `-b` bongo cat, `-p` purr, `-d` dead).
- **`pet` / `petcat`**: Interactive petting with dynamic purrs, affection counters, and developer cat reactions.
- **`catfacts` / `meowfacts`**: Curated trivia on developer cats and feline biology.
- **`lolcat`**: 24-bit ANSI truecolor rainbow formatter supporting Unix pipes (`catsay | lolcat`, `neofetch | lolcat`).

---

## ⌨️ Terminal Commands & Shortcuts

### Terminal Commands
You can open the terminal with `Ctrl + Alt + T` or from the dock/app grid:

| Command | Arguments | Description |
| :--- | :--- | :--- |
| `neofetch` | — | Display system specs, OS version, and Ubuntu ASCII art |
| `skills` | — | List technical proficiencies by domain |
| `projects` | — | Display featured portfolio software projects |
| `cat` | `<file>` | Read markdown files (`cat resume.md`, `cat bio.md`) |
| `catsay` | `[-s|-b|-p|-d] <text>` | Cat speech bubble (sleep, bongo, purr, dead moods) |
| `pet` | — | Pet the terminal cat for dynamic purr responses |
| `catfacts` | — | Read random developer & feline trivia |
| `lolcat` | `<text>` | Output text in animated rainbow gradient (supports `\| lolcat`) |
| `oneko` | — | Toggle the animated cursor-chasing desktop kitten |
| `cowsay` | `[-f cat] <text>` | Classic cowsay speech bubble (supports `-f cat`) |
| `ls` | — | List virtual files and directories |
| `whoami` | — | Print current developer user profile |
| `contact` | — | Display email, social profiles, and phone numbers |
| `theme` | `<dark\|light>` | Switch desktop theme mode |
| `lock` | — | Lock the desktop session to the GDM lock screen |
| `reboot` | — | Restart the session and replay Plymouth boot |
| `matrix` | — | Display digital green falling code stream |
| `sl` | — | Steam locomotive animation (did you mean `ls`?) |
| `fortune` | — | Print inspiring software engineering quotes |
| `sudo` | `<command>` | Execute command with elevated privileges |
| `clear` | — | Clear terminal screen |

### Keyboard Shortcuts
| Shortcut | Action |
| :--- | :--- |
| `Super` / `Windows` | Toggle Activities Overview / App Search |
| `Ctrl + Alt + T` | Open Terminal |
| `Alt + Tab` | Switch active open windows |
| `F11` | Toggle Fullscreen display mode |
| `Escape` | Close modals, context menu, or Activities |

---

## 🛠️ Tech Stack & Architecture

- **Core**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Compiler optimization)
- **UI Framework**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + CSS custom properties design tokens (`src/styles/tokens.css`)
- **State Management**: [Zustand v5](https://github.com/pmndrs/zustand) (Normalized window store & system preferences)
- **Window Drag & Resize**: [`react-rnd`](https://github.com/bokuweb/react-rnd)
- **Animations**: [`motion`](https://motion.dev/) (Framer Motion successor, hardware-accelerated transforms)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Yaru SVGs
- **Fonts**: Next.js Google Fonts (`Ubuntu`, `Ubuntu Mono`, `Inter`, `Roboto`, `Fira Sans`)

### Directory Structure
```
src/
├── app/                  # Next.js App Router (layout.tsx, page.tsx, globals.css)
│   ├── classic/          # Lightweight, accessible fallback portfolio
│   └── dev/tokens/       # Design tokens inspection suite
├── apps/                 # Desktop applications (one folder per app)
│   ├── About/            # Biography & overview
│   ├── Browser/          # Simulated web browser
│   ├── Files/            # File manager
│   ├── Mail/             # Contact mailer
│   ├── Projects/         # Featured projects
│   ├── Resume/           # Resume viewer
│   ├── Settings/         # Ubuntu control center & Typography Studio
│   ├── Skills/           # Technical proficiencies
│   ├── Terminal/         # CLI emulator, cat suite, ANSI parser
│   ├── Trash/            # Recycle bin
│   ├── VSCode/           # Code editor
│   ├── Welcome/          # Tour dialog
│   └── registry.ts       # Lazy dynamic app registry
├── components/
│   ├── mobile/           # Dedicated touch shells (PhoneShell, TabletShell)
│   ├── shell/            # TopBar, Dock, Desktop, Activities, ContextMenu, Oneko, BootScreen, LockScreen
│   └── window/           # WindowManager, Window container, TitleBar, WindowControls
├── data/                 # Pure data layer (profile.ts, projects.ts, skills.ts, wallpapers.ts)
├── hooks/                # Custom React hooks (useHotkeys, useLayoutMode, useReducedMotion)
├── lib/                  # Geometry, sound, fullscreen, geometry utilities
├── store/                # Zustand stores (windows.ts, system.ts)
└── styles/               # Design token definitions (tokens.css)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18.18 or higher (Node 20+ recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aminur-islam-sojib/porfolio-ubuntu.git
   cd porfolio-ubuntu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to explore the Ubuntu desktop environment.

### Production Build & Linting

```bash
# Type check TypeScript
npx tsc --noEmit

# Run ESLint
npm run lint

# Compile optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 👨‍💻 About the Author

**Sojib Ahmed (Aminur Islam Sojib)**  
*Fullstack Developer at Softvence specializing in Next.js, React, Node.js, and MongoDB.*  
📍 Dhaka, Bangladesh  

- 🌐 **Portfolio**: [sojibahmed.vercel.app](https://sojibahmed.vercel.app)
- 💼 **LinkedIn**: [linkedin.com/in/aminur-islam-sojib](https://linkedin.com/in/aminur-islam-sojib/)
- 🐙 **GitHub**: [github.com/aminur-islam-sojib](https://github.com/aminur-islam-sojib)
- 📧 **Email**: [sojibahmed.connect@gmail.com](mailto:sojibahmed.connect@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Engineered with ❤️ and dedication to open source. Built with Next.js, Tailwind CSS, and Ubuntu Yaru design inspiration.</sub>
</div>
