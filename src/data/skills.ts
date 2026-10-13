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
    title: "Frontend Development",
    category: "frontend",
    skills: [
      { name: "Next.js (App Router)", category: "frontend", level: "expert", iconKey: "nextjs" },
      { name: "React.js", category: "frontend", level: "expert", iconKey: "react" },
      { name: "TypeScript", category: "frontend", level: "expert", iconKey: "typescript" },
      { name: "JavaScript (ES6+)", category: "frontend", level: "expert", iconKey: "javascript" },
      { name: "Tailwind CSS", category: "frontend", level: "expert", iconKey: "tailwind" },
      { name: "HTML5 & CSS3", category: "frontend", level: "expert", iconKey: "html" },
      { name: "Framer Motion", category: "frontend", level: "advanced", iconKey: "motion" },
      { name: "TanStack Query", category: "frontend", level: "advanced", iconKey: "query" },
      { name: "shadcn/ui & Radix UI", category: "frontend", level: "advanced", iconKey: "ui" },
    ],
  },
  {
    title: "Backend & Authentication",
    category: "backend",
    skills: [
      { name: "Node.js", category: "backend", level: "advanced", iconKey: "nodejs" },
      { name: "Express.js", category: "backend", level: "advanced", iconKey: "express" },
      { name: "RESTful APIs", category: "backend", level: "advanced", iconKey: "api" },
      { name: "NextAuth / OAuth", category: "backend", level: "advanced", iconKey: "auth" },
      { name: "JWT Authentication", category: "backend", level: "advanced", iconKey: "jwt" },
      { name: "Firebase Auth", category: "backend", level: "proficient", iconKey: "firebase" },
      { name: "Stripe Payment Gateway", category: "backend", level: "advanced", iconKey: "stripe" },
    ],
  },
  {
    title: "Databases & Storage",
    category: "database",
    skills: [
      { name: "MongoDB", category: "database", level: "advanced", iconKey: "mongodb" },
      { name: "Mongoose ODM", category: "database", level: "advanced", iconKey: "mongoose" },
      { name: "Aggregation Pipelines", category: "database", level: "advanced", iconKey: "database" },
      { name: "Query Indexing & Optimization", category: "database", level: "advanced", iconKey: "database" },
    ],
  },
  {
    title: "DevOps & Cloud Hosting",
    category: "devops",
    skills: [
      { name: "Vercel Cloud Deployment", category: "devops", level: "expert", iconKey: "vercel" },
      { name: "Netlify Hosting", category: "devops", level: "advanced", iconKey: "cloud" },
      { name: "CI/CD Deployment Pipelines", category: "devops", level: "advanced", iconKey: "github" },
      { name: "Linux / Ubuntu Environment", category: "devops", level: "proficient", iconKey: "ubuntu" },
    ],
  },
  {
    title: "Tools & Workflow",
    category: "tools",
    skills: [
      { name: "Git & GitHub", category: "tools", level: "expert", iconKey: "git" },
      { name: "Postman API Testing", category: "tools", level: "advanced", iconKey: "postman" },
      { name: "Vite / Turbopack", category: "tools", level: "advanced", iconKey: "vite" },
      { name: "VS Code & Dev Tools", category: "tools", level: "expert", iconKey: "tools" },
      { name: "Bash Terminal", category: "tools", level: "proficient", iconKey: "bash" },
    ],
  },
];
