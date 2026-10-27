export interface Profile {
  name: string;
  fullName: string;
  handle: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  birthday: string;
  website: string;
  avatarUrl: string;
  brandLogoUrl: string;
  brandLogoPng: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    facebook?: string;
    instagram?: string;
    codeforces?: string;
    twitter?: string;
  };
  metrics: {
    experience: string;
    projectsCompleted: string;
    commits: string;
    support: string;
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
  fullName: "Aminur Islam Sojib",
  handle: "aminur-islam-sojib",
  title: "Fullstack Developer",
  subtitle: "Frontend Developer at Softvence • Next.js, React, Node.js & MongoDB Specialist",
  bio: "Fullstack Developer at Softvence specializing in Next.js, React, Node.js, and MongoDB based in Dhaka, Bangladesh. Experienced in building scalable, user-friendly web applications, REST API integrations, robust authentication (NextAuth, JWT, OAuth), and performance-driven responsive interfaces.",
  location: "Dhaka, Bangladesh",
  email: "sojibahmed.connect@gmail.com",
  phone: "+8801522110607",
  birthday: "Feb 20, 2006",
  website: "https://sojibahmed.vercel.app",
  avatarUrl: "/avatars/sojib_profile.jpg",
  brandLogoUrl: "/avatars/brand logo.svg",
  brandLogoPng: "/avatars/brand logo.png",
  resumeUrl: "/Sojib_Ahmed_Resume.pdf",
  socials: {
    github: "https://github.com/aminur-islam-sojib",
    linkedin: "https://linkedin.com/in/aminur-islam-sojib/",
    facebook: "https://facebook.com/sojibahmed.connect",
    instagram: "https://instagram.com/sojibahmed.dev",
    codeforces: "https://codeforces.com/profile/sojibahmed.me",
  },
  metrics: {
    experience: "1+ Years Active Development",
    projectsCompleted: "15+ Projects Completed",
    commits: "500+ Git Commits",
    support: "24/7 Available",
  },
  systemInfo: {
    osName: "Ubuntu",
    osVersion: "24.04 LTS (Noble Numbat)",
    kernel: "Linux 6.8.0-generic x86_64",
    uptime: "24/7 Available for hire",
    shell: "bash 5.2.21",
    terminal: "gnome-terminal",
    cpu: "Fullstack Engine (Next.js + Node.js + MongoDB)",
    memory: "MERN Stack / Continuous Innovation",
  },
};
