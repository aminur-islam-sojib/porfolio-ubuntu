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
  "catsay",
  "meowsay",
  "pet",
  "petcat",
  "catfacts",
  "meowfacts",
  "lolcat",
  "oneko",
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

const CAT_QUOTES = [
  "Meow! Hire Sojib — top-tier Full-Stack Engineer!",
  "Purrrr... It compiled cleanly on my machine, push to prod!",
  "3 AM is the optimal time for coding and keyboard zoomies.",
  "I knocked a bug off the desk. Now all tests are passing!",
  "Cats & Linux: The two greatest creations in the universe.",
  "Feed me tuna, and I will review your pull request.",
  "git commit -m 'meow' — 100% test coverage achieved.",
];

const CAT_FACTS = [
  "[Cat Fact #1] Cats spend roughly 70% of their lives sleeping, saving their energy for 3 AM keyboard zoomies.",
  "[Cat Fact #2] A cat's purr vibrates between 25 and 150 Hz, a frequency known in physics to accelerate tissue regeneration and relieve developer stress.",
  "[Cat Fact #3] The first computer bug was an actual moth found in the Harvard Mark II in 1947; cats have been hunting bugs long before computers existed.",
  "[Cat Fact #4] Adult cats only meow to communicate with humans—they never meow to other cats in the wild.",
  "[Cat Fact #5] Isaac Newton is often credited with inventing the cat flap door so his cats could wander without disrupting light experiments.",
  "[Cat Fact #6] Cats have 32 muscles in each ear, allowing them to rotate their ears 180 degrees to detect keyboard keystrokes from across the house.",
  "[Cat Fact #7] In 1963, a French tuxedo cat named Félicette became the first feline in space and returned safely as an astronaut hero.",
  "[Cat Fact #8] Cats walk like giraffes and camels: both right legs move first, then both left legs. This makes their steps virtually silent.",
  "[Cat Fact #9] A cat's nose print is completely unique, similar to human fingerprints or cryptographic public keys.",
  "[Cat Fact #10] Cats can jump up to 6 times their height in a single leap—equivalent to a human vaulting onto a two-story roof.",
  "[Cat Fact #11] The average cat sleeps 12-16 hours a day. In software architecture, this is officially called 'background worker daemon mode'.",
  "[Cat Fact #12] Cats have whiskers on the backs of their front paws to help calculate distance and detect nearby movement.",
  "[Cat Fact #13] When a cat shows you its belly, it is the highest sign of feline trust and psychological safety.",
  "[Cat Fact #14] In ancient Egypt, cats were revered as protectors of the home and sacred companions of the goddess Bastet.",
  "[Cat Fact #15] Tuxedo cats are dressed in permanent formal wear, perfectly prepared for technical lead interviews.",
  "[Cat Fact #16] A cat walking across a mechanical keyboard has a 12% probability of generating syntactically valid TypeScript.",
];

const PET_REACTIONS = [
  `(=^･ω･^=)  *purrrrrrrrr*  [Affection: +10]\nYou scratched behind the ears. The cat purrs loudly in 60 FPS!`,
  `(=｀ω´=)   *swats gently*  [Treat Required]\nFeed me tuna first before deploying on Friday!`,
  `(=^‥^=)   *curls up on your warm laptop keyboard*  [Comfort: 100%]\nPurring at 42Hz to soothe your compiler errors.`,
  `(^・x・^)   *slow blink of trust*  [Trust Level: Senior Engineer]\nThe cat acknowledges you as a worthy developer.`,
  `(=^-ω-^=)  *kneading biscuits on your lap*  [Happiness: MAX]\nKneading soft dough while your build pipelines finish.`,
  `(Ф∀Ф)     *3 AM zoomies activated!*  [Speed: 10 Gbps]\nRunning at the speed of an optimized Node.js cluster!`,
];

export function applyLolcat(text: string): string {
  const lines = text.split("\n");
  return lines
    .map((line, lineIdx) => {
      let result = "";
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === " ") {
          result += " ";
          continue;
        }
        const pos = i * 0.12 + lineIdx * 0.45;
        const r = Math.round(Math.sin(pos + 0) * 127 + 128);
        const g = Math.round(Math.sin(pos + (2 * Math.PI) / 3) * 127 + 128);
        const b = Math.round(Math.sin(pos + (4 * Math.PI) / 3) * 127 + 128);
        result += `\u001b[38;2;${r};${g};${b}m${char}\u001b[0m`;
      }
      return result;
    })
    .join("\n");
}

function formatSpeechBubble(msg: string): string {
  const cleanMsg = msg.trim() || CAT_QUOTES[0];
  const lines = cleanMsg.split("\n");
  const maxLen = Math.max(...lines.map((l) => l.length), cleanMsg.length);
  const border = "-".repeat(maxLen + 4);
  const formattedLines = lines.map((l) => `<  ${l.padEnd(maxLen)}  >`).join("\n");
  return `  ${border}\n${formattedLines}\n  ${border}`;
}

function getCatAscii(mood: "default" | "sleep" | "bongo" | "purr" | "dead"): string {
  switch (mood) {
    case "sleep":
      return [
        "        \\",
        "   Zzz   \\   |\\      _,,,---,,_",
        "          \\ /,`.-'`'    -.  ;-;;,_",
        "           |,4-  ) )-,_. ,\\ (  `'-'",
        "          '---''(_/--'  `-'\\_)",
      ].join("\n");

    case "bongo":
      return [
        "        \\",
        "         \\     /\\_/\\",
        "              ( o.o )   _____",
        "              /  ~  \\  [=====]  *tap tap tap*",
        "             (   v   )  =====",
      ].join("\n");

    case "purr":
      return [
        "        \\",
        "         \\     /\\_/\\  ",
        "              ( ^.^ )  *purrrrr*",
        "               > ^ <   ~♥",
      ].join("\n");

    case "dead":
      return [
        "        \\",
        "         \\    /\\_____/\\",
        "             /  x   x  \\",
        "            ( ==  ^  == )",
        "             )  - - -  (",
        "            (           )",
        "           ( (  )   (  ) )",
        "          (__(__)___(__)__)",
      ].join("\n");

    case "default":
    default:
      return [
        "        \\",
        "         \\    /\\_____/\\",
        "             /  o   o  \\",
        "            ( ==  ^  == )",
        "             )         (",
        "            (           )",
        "           ( (  )   (  ) )",
        "          (__(__)___(__)__)",
      ].join("\n");
  }
}

function executeCatsay(args: string[]): string {
  let mood: "default" | "sleep" | "bongo" | "purr" | "dead" = "default";
  const filteredArgs: string[] = [];

  for (const arg of args) {
    const lower = arg.toLowerCase();
    if (lower === "-s" || lower === "--sleep" || lower === "sleep") {
      mood = "sleep";
    } else if (lower === "-b" || lower === "--bongo" || lower === "bongo") {
      mood = "bongo";
    } else if (lower === "-p" || lower === "--purr" || lower === "-cute" || lower === "purr") {
      mood = "purr";
    } else if (lower === "-d" || lower === "--dead" || lower === "dead") {
      mood = "dead";
    } else {
      filteredArgs.push(arg);
    }
  }

  const rawMsg = filteredArgs.join(" ").trim();
  const msg = rawMsg || CAT_QUOTES[Math.floor(Math.random() * CAT_QUOTES.length)];
  const bubble = formatSpeechBubble(msg);
  const cat = getCatAscii(mood);

  return `${bubble}\n${cat}`;
}

function executeSingleCommand(rawCommand: string): { output: string; shouldClear?: boolean } {
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
          "",
          "Cat & Fun Utilities (I Love Cat Suite):",
          "  catsay <text>     Cat speech bubble (flags: -s sleep, -b bongo, -p purr, -d dead)",
          "  meowsay <text>    Alias for catsay",
          "  pet / petcat      Pet the desktop terminal cat & receive purrs",
          "  catfacts          Fascinating developer & feline trivia",
          "  lolcat <text>     Colorize terminal text in vibrant rainbow gradients",
          "  oneko             Toggle the classic animated desktop kitten chasing your cursor",
          "  cowsay <text>     Cow speech bubble (supports -f cat)",
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
      if (!file || file === "cat" || file === "meow" || file === "--meow") {
        return {
          output: [
            "   /\\___/\\",
            "  (  o.o  )   Did you mean the Unix 'cat' or a real cat? (=^･ω･^=)",
            "   >  ^  <    Meow! Try 'catsay', 'pet', 'catfacts', 'oneko', or 'cat resume.md'!",
          ].join("\n"),
        };
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

    case "catsay":
    case "meowsay":
      return { output: executeCatsay(args) };

    case "pet":
    case "petcat": {
      const randomReaction = PET_REACTIONS[Math.floor(Math.random() * PET_REACTIONS.length)];
      return { output: randomReaction };
    }

    case "catfacts":
    case "meowfacts": {
      const randomFact = CAT_FACTS[Math.floor(Math.random() * CAT_FACTS.length)];
      return { output: randomFact };
    }

    case "oneko": {
      const current = useSystemStore.getState().onekoEnabled;
      useSystemStore.getState().toggleOneko();
      const willBeActive = !current;
      useSystemStore.getState().addNotification({
        title: willBeActive ? "oneko: Desktop Kitten Spawned! 🐾" : "oneko: Kitten Resting 💤",
        message: willBeActive
          ? "The classic Linux desktop cat is now chasing your mouse cursor!"
          : "The desktop kitten curled up to sleep.",
      });
      return {
        output: willBeActive
          ? "🐾 oneko: Desktop kitten spawned! Move your mouse pointer to watch it run, scratch, and play.\nType 'oneko' anytime to put it back to sleep."
          : "💤 oneko: Desktop kitten put to sleep. Type 'oneko' to wake it up again anytime!",
      };
    }

    case "lolcat": {
      const msg = args.join(" ");
      if (!msg) {
        return {
          output: applyLolcat(
            "lolcat: Colorful cat text formatter! Usage: 'lolcat <text>' or pipe '<command> | lolcat'"
          ),
        };
      }
      return { output: applyLolcat(msg) };
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
      // Support Linux cowsay -f cat / -f kitty
      if (args[0] === "-f" && (args[1] === "cat" || args[1] === "kitty")) {
        return { output: executeCatsay(args.slice(2)) };
      }
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

export function executeCommand(rawCommand: string): { output: string; shouldClear?: boolean } {
  const trimmed = rawCommand.trim();
  if (!trimmed) return { output: "" };

  // Support Linux terminal pipeline syntax: e.g. "catsay | lolcat" or "catfacts | lolcat"
  if (trimmed.includes("|")) {
    const parts = trimmed.split("|").map((p) => p.trim());
    const currentRes = executeSingleCommand(parts[0]);
    if (currentRes.shouldClear) return currentRes;

    let output = currentRes.output;
    for (let i = 1; i < parts.length; i++) {
      const stage = parts[i].toLowerCase();
      if (stage.startsWith("lolcat")) {
        output = applyLolcat(output);
      } else if (stage.startsWith("catsay") || stage.startsWith("meowsay")) {
        output = executeCatsay([output]);
      } else if (stage.startsWith("cowsay")) {
        const border = "-".repeat(output.length + 4);
        output = `  ${border}\n<  ${output}  >\n  ${border}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
      }
    }
    return { output };
  }

  return executeSingleCommand(trimmed);
}

export function autoCompleteCommand(current: string): string | null {
  const trimmed = current.trim();
  if (!trimmed) return null;

  // If user typed "cat "
  if (trimmed.startsWith("cat ")) {
    const filePart = trimmed.slice(4).trim();
    const files = ["resume.md", "bio.md", "catfacts"];
    const match = files.find((f) => f.startsWith(filePart));
    return match ? `cat ${match}` : null;
  }

  // Auto-complete command name
  const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(trimmed));
  return match || null;
}
