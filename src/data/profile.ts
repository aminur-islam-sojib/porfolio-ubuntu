export interface Profile {
  name: string;
  handle: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  email: string;
  website: string;
  avatarUrl: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  systemInfo: {
    osName: string;
    osVersion: string;
    kernel: string;
    uptime: string;
    shell: string;
    terminal: string;
    cpu: string;
    memory: string;
  };
}

export const profileData: Profile = {
  name: "Sojib Ahmed",
  handle: "sojib-ahmed",
  title: "Full-Stack Developer",
  subtitle: "Building resilient web applications & high-performance interactive interfaces",
  bio: "TODO: Add your personal bio here. E.g., Full-Stack Engineer passionate about TypeScript, React/Next.js, Node.js, and cloud architecture.",
  location: "TODO: Add your location (e.g., Dhaka, Bangladesh / Remote)",
  email: "sojibahmed.connect@gmail.com",
  website: "https://sojib.dev", // TODO: Replace with your actual domain
  avatarUrl: "/avatars/profile.png", // TODO: Place your avatar image in public/avatars/
  socials: {
    github: "https://github.com/sojib-ahmed", // TODO: Update with your GitHub profile
    linkedin: "https://linkedin.com/in/sojib-ahmed", // TODO: Update with your LinkedIn profile
    twitter: "https://x.com/sojib_ahmed", // TODO: Update with your Twitter/X handle or remove
  },
  systemInfo: {
    osName: "Ubuntu",
    osVersion: "24.04 LTS (Noble Numbat)",
    kernel: "Linux 6.8.0-generic x86_64",
    uptime: "24/7 Available for hire",
    shell: "bash 5.2.21",
    terminal: "gnome-terminal",
    cpu: "Full-Stack Engine (React + Node.js + Cloud)",
    memory: "Unlimited Curiosity / High Capacity",
  },
};

