export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "full-stack" | "frontend" | "backend" | "open-source";
  featured: boolean;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnailUrl: string;
  screenshots?: string[];
  metrics?: string[];
}

export const projectsData: Project[] = [
  {
    id: "shifa",
    slug: "shifa-healthcare",
    title: "Shifa — Healthcare Telemedicine Platform",
    tagline: "Role-based healthcare service & appointment management platform with real-time consultation",
    description: "Led a 3-member team to build a scalable telemedicine platform featuring secure role-based access control (patients, doctors, administrators), NextAuth session validation, appointment scheduling, and high-performance MongoDB schemas with aggregation pipelines and indexing. Configured environment-based deployments on Vercel.",
    category: "full-stack",
    featured: true,
    technologies: ["Next.js", "TypeScript", "NextAuth", "MongoDB", "Node.js", "Tailwind CSS", "REST APIs", "Vercel"],
    githubUrl: "https://github.com/ShifaLabs/shifa",
    liveUrl: "https://shifa-medi.vercel.app",
    thumbnailUrl: "/projects/shifa.png",
    metrics: [
      "Team Lead (3-member engineering team)",
      "Secure Role-Based Access Control (RBAC)",
      "MongoDB aggregation pipeline queries",
      "Server-side session validation with NextAuth",
    ],
  },
  {
    id: "mess-manager",
    slug: "mess-manager",
    title: "Mess Manager — Cost & Meal Management System",
    tagline: "Smart shared living cost tracking, automated expense distribution, and meal logging system",
    description: "Production-ready shared living cost and meal tracking platform built for shared flats and student hostels. Designed normalized MongoDB data models with real-time cost calculation using aggregation pipelines, dynamic date range filtering, automated monthly expense reports, NextAuth authentication, and email-based member invitation system.",
    category: "full-stack",
    featured: true,
    technologies: ["Next.js", "TypeScript", "NextAuth", "MongoDB", "Tailwind CSS", "REST APIs", "Vercel"],
    githubUrl: "https://github.com/aminur-islam-sojib/Mess-Manager",
    liveUrl: "https://mess-manager-prod.vercel.app/",
    thumbnailUrl: "/projects/mess_manager.png",
    metrics: [
      "Real-time expense distribution logic",
      "MongoDB aggregation performance reports",
      "Email-based member invitation workflow",
      "Dynamic date range filtering & summaries",
    ],
  },
  {
    id: "aabohawax",
    slug: "aabohawax-weather",
    title: "AabohawaX — Real-Time Weather Tracker",
    tagline: "Live atmospheric telemetry, instant city search, and 5-day predictive weather forecasting",
    description: "Interactive real-time weather tracking application showing live temperature, humidity, atmospheric pressure, wind direction, and sunrise/sunset times with fast city search and 5-day predictive forecasts using TanStack Query and OpenWeather APIs.",
    category: "frontend",
    featured: true,
    technologies: ["React", "TypeScript", "Tailwind CSS", "TanStack Query", "shadcn/ui", "Vite", "Netlify"],
    githubUrl: "https://github.com/aminur-islam-sojib/AabohawaX",
    liveUrl: "https://aabohawax.netlify.app",
    thumbnailUrl: "/projects/aabohawax.png",
    metrics: [
      "Live meteorological data telemetry",
      "Instant city search with caching",
      "5-day predictive weather forecasting",
      "TanStack Query background refetching",
    ],
  },
  {
    id: "portfolio-ubuntu",
    slug: "ubuntu-portfolio",
    title: "Ubuntu 24.04 Web OS Portfolio",
    tagline: "Authentic Ubuntu Linux desktop environment running natively in the browser",
    description: "An immersive developer portfolio replicating the Ubuntu 24.04 (GNOME/Yaru) desktop experience with full window management, snapping, dock, lock screen, interactive bash terminal, and purpose-built mobile/tablet touch shells. Engineered with Next.js App Router, TypeScript, Zustand, and Motion for 60fps performance.",
    category: "full-stack",
    featured: true,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Motion", "Web Audio API"],
    githubUrl: "https://github.com/aminur-islam-sojib/portfolio-ubuntu",
    liveUrl: "https://sojibahmed.vercel.app",
    thumbnailUrl: "/avatars/sojib_profile.jpg",
    metrics: [
      "60fps hardware-accelerated window manager",
      "Two-phase authentic GDM lock screen",
      "Recruiter-optimized clean HTML/CSS mode",
      "Purpose-built mobile & tablet touch shells",
    ],
  },
];
