export interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "tools";
  level: "expert" | "advanced" | "proficient";
  iconKey: string;
}

export interface SkillCategory {
  title: string;
  category: SkillItem["category"];
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    category: "frontend",
    skills: [
      { name: "React / Next.js", category: "frontend", level: "expert", iconKey: "react" },
      { name: "TypeScript", category: "frontend", level: "expert", iconKey: "typescript" },
      { name: "Tailwind CSS", category: "frontend", level: "expert", iconKey: "tailwind" },
      { name: "State Management (Zustand/Redux)", category: "frontend", level: "advanced", iconKey: "zustand" },
      { name: "Web Animations (Motion)", category: "frontend", level: "advanced", iconKey: "motion" },
    ],
  },
  {
    title: "Backend Engineering",
    category: "backend",
    skills: [
      { name: "Node.js / Express", category: "backend", level: "expert", iconKey: "nodejs" },
      { name: "REST & GraphQL APIs", category: "backend", level: "advanced", iconKey: "api" },
      { name: "Python / FastAPI", category: "backend", level: "proficient", iconKey: "python" },
      { name: "Microservices & Auth (JWT/OAuth)", category: "backend", level: "advanced", iconKey: "auth" },
    ],
  },
  {
    title: "Databases & Storage",
    category: "database",
    skills: [
      { name: "PostgreSQL", category: "database", level: "advanced", iconKey: "postgresql" },
      { name: "MongoDB", category: "database", level: "advanced", iconKey: "mongodb" },
      { name: "Redis Caching", category: "database", level: "proficient", iconKey: "redis" },
      { name: "Prisma / Drizzle ORM", category: "database", level: "advanced", iconKey: "prisma" },
    ],
  },
  {
    title: "DevOps & Cloud",
    category: "devops",
    skills: [
      { name: "Docker & Containerization", category: "devops", level: "advanced", iconKey: "docker" },
      { name: "Linux / Ubuntu Server", category: "devops", level: "advanced", iconKey: "ubuntu" },
      { name: "CI/CD (GitHub Actions)", category: "devops", level: "advanced", iconKey: "github" },
      { name: "AWS / Vercel Deployment", category: "devops", level: "proficient", iconKey: "cloud" },
    ],
  },
  {
    title: "Workflow & Tools",
    category: "tools",
    skills: [
      { name: "Git & Version Control", category: "tools", level: "expert", iconKey: "git" },
      { name: "Linux Bash Scripting", category: "tools", level: "advanced", iconKey: "bash" },
      { name: "Jest / Vitest Testing", category: "tools", level: "proficient", iconKey: "test" },
      { name: "Postman / Thunder Client", category: "tools", level: "advanced", iconKey: "postman" },
    ],
  },
];

