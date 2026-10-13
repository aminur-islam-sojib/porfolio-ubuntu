import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { useSystemStore } from "@/store/system";
import { useWindowStore } from "@/store/windows";

export const AVAILABLE_COMMANDS = [
  "help",
  "neofetch",
  "skills",
  "projects",
  "cat",
  "ls",
  "whoami",
  "contact",
  "clear",
  "sudo",
  "uname",
  "date",
  "history",
  "lock",
  "reboot",
  "cowsay",
  "sl",
  "matrix",
  "fortune",
  "theme",
  "exit",
];

const NEOFETCH_ART = `
        ---
     --/   \\--       sojib@ubuntu-portfolio
   -/  |   |  \\-     ----------------------
  /    \\---/    \\    OS: Ubuntu 24.04 LTS (Noble Numbat)
 |   /-------\\   |   Host: Developer Portfolio Engine
 |  /         \\  |   Kernel: Linux 6.8.0-generic x86_64
  \\ \\---------/ /    Uptime: 24/7 Available for hire
   -\\         /-     Packages: Next.js, React, Node.js, MongoDB
     --\\   /--       Shell: bash 5.2.21
        ---          Terminal: gnome-terminal
                     CPU: Fullstack Engine (Next.js + Node.js + MongoDB)
                     Memory: MERN Stack / Continuous Innovation
`;

export function executeCommand(rawCommand: string): { output: string; shouldClear?: boolean } {
  const trimmed = rawCommand.trim();
  if (!trimmed) return { output: "" };

  const [cmd, ...args] = trimmed.split(/\s+/);
  const lowerCmd = cmd.toLowerCase();

  switch (lowerCmd) {
    case "clear":
      return { output: "", shouldClear: true };

    case "help":
      return {
        output: [
          "Available terminal commands:",
          "  neofetch          Display system specifications and Ubuntu banner",
          "  skills            List technical skills by engineering domain",
          "  projects          View portfolio projects with stack and links",
          "  ls                List available virtual files and folders",
          "  cat <file>        Read a file (e.g. 'cat resume.md', 'cat bio.md')",
          "  whoami            Print developer title and current session identity",
          "  contact           Show email and social contact links",
          "  uname -a          Print operating system kernel info",
          "  date              Print the current system timestamp",
          "  clear             Clear the terminal display",
          "  lock              Lock desktop session (GDM lock screen)",
          "  reboot            Restart system and replay Plymouth boot",
          "  theme <dark|light> Switch between dark and light themes",
          "  cowsay <text>     Cow speech bubble message",
          "  sl                Steam locomotive animation",
          "  matrix            Digital matrix code stream",
          "  fortune           Engineering fortune quote",
          "  exit              Close the terminal window",
          "  sudo <cmd>        Execute command with elevated privileges",
        ].join("\n"),
      };

    case "neofetch":
      return { output: NEOFETCH_ART };

    case "whoami":
      return {
        output: `${profileData.name} — ${profileData.title} (${profileData.handle})`,
      };

    case "contact":
      return {
        output: [
          `Email:    ${profileData.email}`,
          `GitHub:   ${profileData.socials.github}`,
          `LinkedIn: ${profileData.socials.linkedin}`,
          `Website:  ${profileData.website}`,
        ].join("\n"),
      };

    case "uname":
      return {
        output: `Linux ubuntu-portfolio ${profileData.systemInfo.kernel} #42-Ubuntu SMP x86_64 GNU/Linux`,
      };

    case "date":
      return { output: new Date().toString() };

    case "ls":
      return {
        output: "bio.md    resume.md    projects/    skills/    certificates/",
      };

    case "cat": {
      const file = args[0]?.toLowerCase();
      if (!file) {
        return { output: "cat: missing file operand. Example: 'cat resume.md'" };
      }
      if (file === "resume.md" || file === "resume") {
        return {
          output: [
            `# ${profileData.name} — Resume Summary`,
            `Role: ${profileData.title}`,
            `Location: ${profileData.location}`,
            `Contact: ${profileData.email} • ${profileData.phone}`,
            "",
            "Experience highlights:",
            "  - Frontend Developer at Softvence (2026 — Present)",
            "  - Junior Full-Stack Developer — Freelance / Personal Projects (2024 — Present)",
            "  - MERN Stack, Next.js App Router, REST APIs, NextAuth & MongoDB aggregation pipelines",
            "  - Type 'projects' to review software creations or 'skills' for tech stack.",
          ].join("\n"),
        };
      }
      if (file === "bio.md" || file === "bio") {
        return { output: profileData.bio };
      }
      return { output: `cat: ${args[0]}: No such file or directory` };
    }

    case "skills": {
      const lines = ["TECHNICAL PROFICIENCIES:"];
      skillsData.forEach((category) => {
        lines.push(`\n[${category.title}]`);
        category.skills.forEach((s) => {
          lines.push(`  • ${s.name.padEnd(30)} [${s.level}]`);
        });
      });
      return { output: lines.join("\n") };
    }

    case "projects": {
      const lines = ["FEATURED PROJECTS:"];
      projectsData.forEach((p, i) => {
        lines.push(
          `\n${i + 1}. ${p.title} (${p.category.toUpperCase()})`,
          `   Tagline: ${p.tagline}`,
          `   Stack:   ${p.technologies.join(", ")}`,
          p.liveUrl ? `   Live:    ${p.liveUrl}` : "",
          p.githubUrl ? `   GitHub:  ${p.githubUrl}` : ""
        );
      });
      return { output: lines.filter(Boolean).join("\n") };
    }

    case "sudo":
      return {
        output: `[sudo] password for ${profileData.handle}: \nPermission granted. With great power comes great responsibility!`,
      };

    case "lock":
      useSystemStore.getState().lockScreen();
      return { output: "Desktop locked." };

    case "reboot":
      useSystemStore.getState().reboot();
      return { output: "Restarting Ubuntu desktop..." };

    case "cowsay": {
      const msg = args.join(" ") || `Hire ${profileData.name}! Top-tier Full-Stack Engineer.`;
      const border = "-".repeat(msg.length + 4);
      return {
        output: [
          `  ${border}`,
          `<  ${msg}  >`,
          `  ${border}`,
          `        \\   ^__^`,
          `         \\  (oo)\\_______`,
          `            (__)\\       )\\/\\`,
          `                ||----w |`,
          `                ||     ||`,
        ].join("\n"),
      };
    }

    case "sl":
      return {
        output: [
          "      ====        ________                ___________",
          "  _D _|  |_______/        \\__I_I_____===__|_________|",
          "   |(_)---  |   H\\________/ _____ |   | |   |       |",
          "   /     |  |   H  |  |     |   | |   | |   |       |",
          "  |      |  |   H  |__--------------------|_______|",
          "  | ________|___H__/__|_____/[][]~\\_______|      |",
          "  |/ |   |_____ _____ _____       _____   | ____ |",
          " Choo Choo! (Did you mean 'ls'?)",
        ].join("\n"),
      };

    case "matrix":
      return {
        output: [
          "01010100 01101000 01100101 00100000 01001101 01100001 01110100 01110010 01101001 01111000",
          " Wake up, Neo... The Matrix has you.",
          " Follow the white rabbit: https://github.com/sojib-ahmed",
          " Knock, knock.",
        ].join("\n"),
      };

    case "fortune": {
      const quotes = [
        `"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra`,
        `"First, solve the problem. Then, write the code." — John Johnson`,
        `"Make it work, make it right, make it fast." — Kent Beck`,
        `"Good code is its own best documentation." — Steve McConnell`,
      ];
      return { output: quotes[Math.floor(Math.random() * quotes.length)] };
    }

    case "theme": {
      const target = args[0]?.toLowerCase();
      if (target === "light" || target === "dark") {
        useSystemStore.getState().setTheme(target);
        return { output: `Theme switched to ${target} mode.` };
      }
      useSystemStore.getState().toggleTheme();
      return { output: "System theme toggled." };
    }

    case "exit":
      useWindowStore.getState().closeWindow("terminal");
      return { output: "logout" };

    default:
      return {
        output: `bash: command not found: ${cmd}. Type 'help' to view available commands.`,
      };
  }
}

export function autoCompleteCommand(current: string): string | null {
  const trimmed = current.trim();
  if (!trimmed) return null;

  // If user typed "cat "
  if (trimmed.startsWith("cat ")) {
    const filePart = trimmed.slice(4).trim();
    const files = ["resume.md", "bio.md"];
    const match = files.find((f) => f.startsWith(filePart));
    return match ? `cat ${match}` : null;
  }

  // Auto-complete command name
  const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(trimmed));
  return match || null;
}

