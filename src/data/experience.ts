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

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  field: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Frontend Developer",
    company: "Softvence",
    location: "Dhaka, Bangladesh",
    period: "2026 — Present",
    current: true,
    summary: "Developing scalable full-stack web applications and high-performance interactive interfaces using Next.js App Router, React, and TypeScript.",
    highlights: [
      "Architecting responsive, performant user interfaces with Tailwind CSS and Next.js modern component architecture.",
      "Integrating RESTful backend APIs, state management pipelines, and robust UI interactions.",
      "Collaborating in fast-paced sprint cycles with engineering teammates to deliver pixel-perfect client applications.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs", "Git"],
  },
  {
    id: "exp-2",
    role: "Junior Full-Stack Developer",
    company: "Freelance & Independent Projects",
    location: "Remote / Dhaka, Bangladesh",
    period: "2024 — Present",
    current: true,
    summary: "Developing full-stack MERN and Next.js applications with secure authentication, cloud databases, and payment integration.",
    highlights: [
      "Developed end-to-end applications using React, TypeScript, Node.js, Express, and MongoDB.",
      "Implemented secure RBAC authentication with NextAuth (OAuth + credentials validation) and JWT.",
      "Integrated Stripe payments and automated subscription workflows.",
      "Engineered analytical dashboards reducing page load times by 25% with component optimization and query caching.",
      "Managed CI/CD deployment pipelines on Vercel and Netlify with zero-downtime releases.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "NextAuth", "Stripe"],
  },
];

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    degree: "BSc in Computer Science & Engineering (CSE)",
    institution: "University of Scholars",
    location: "Dhaka, Bangladesh",
    period: "2025 — Ongoing",
    field: "Computer Science & Engineering",
  },
  {
    id: "edu-2",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "SMMPLSC Rajshahi",
    location: "Rajshahi, Bangladesh",
    period: "2023 — 2024",
    field: "Science",
  },
  {
    id: "edu-3",
    degree: "Secondary School Certificate (SSC)",
    institution: "Nazirpur High School",
    location: "Natore, Bangladesh",
    period: "2021 — 2022",
    field: "Science",
  },
];
