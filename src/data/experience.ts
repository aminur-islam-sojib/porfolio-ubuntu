export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full-Stack Developer",
    company: "TODO: Current Company / Freelance",
    location: "Remote / Hybrid",
    period: "2023 — Present",
    current: true,
    summary: "TODO: Add overview of your main responsibilities and achievements in this role.",
    highlights: [
      "TODO: Spearheaded full-stack web applications using Next.js and Node.js microservices.",
      "TODO: Reduced API response times by 35% through Redis caching and query indexing.",
      "TODO: Collaborated in agile sprints with cross-functional design and engineering teams.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: "exp-2",
    role: "Frontend Engineer",
    company: "TODO: Previous Tech Company",
    location: "On-site / Remote",
    period: "2022 — 2023",
    current: false,
    summary: "TODO: Add overview of your frontend development work.",
    highlights: [
      "TODO: Developed high-performance user interfaces with modern React, Tailwind CSS, and state management.",
      "TODO: Improved web vitals score from 68 to 94 across critical customer-facing pages.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "REST APIs"],
  },
  {
    id: "exp-3",
    role: "Junior Software Developer",
    company: "TODO: First Software Company",
    location: "On-site",
    period: "2021 — 2022",
    current: false,
    summary: "TODO: Add overview of your early career projects and learnings.",
    highlights: [
      "TODO: Built backend CRUD services and database schemas with Node.js and MongoDB.",
      "TODO: Participated in peer code reviews and unit test coverage expansion.",
    ],
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Git"],
  },
];

