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
    id: "project-1",
    slug: "ubuntu-portfolio",
    title: "Ubuntu Web OS Portfolio",
    tagline: "An interactive Ubuntu 24.04 desktop environment built in Next.js",
    description: "TODO: Add detailed description of the project architecture, window manager, touch shells, and performance optimizations.",
    category: "full-stack",
    featured: true,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Motion"],
    githubUrl: "https://github.com/sojib-ahmed/portfolio-ubuntu", // TODO: Update GitHub repo URL
    liveUrl: "https://sojib.dev", // TODO: Update live demo URL
    thumbnailUrl: "/projects/ubuntu-portfolio.png",
    metrics: ["60fps window manager", "Zero layout shift", "Full mobile touch shell"],
  },
  {
    id: "project-2",
    slug: "ecommerce-platform",
    title: "E-Commerce Microservices Engine",
    tagline: "High-concurrency full-stack online storefront with real-time inventory",
    description: "TODO: Add project summary describing payment gateways, microservice architecture, and database caching.",
    category: "full-stack",
    featured: true,
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Stripe"],
    githubUrl: "https://github.com/sojib-ahmed/ecommerce-platform", // TODO: Update or replace with your project
    liveUrl: "https://demo-ecommerce.sojib.dev", // TODO: Update live demo link
    thumbnailUrl: "/projects/ecommerce.png",
    metrics: ["Sub-50ms query latency", "Stripe checkout integration", "Role-based admin dashboard"],
  },
  {
    id: "project-3",
    slug: "ai-task-assistant",
    title: "AI-Powered Workflow Automation",
    tagline: "Automated document processing and conversational assistant using LLM pipelines",
    description: "TODO: Add project details describing prompt engineering, RAG pipeline, and vector databases.",
    category: "full-stack",
    featured: true,
    technologies: ["React", "FastAPI", "Python", "LangChain", "Pinecone", "Tailwind CSS"],
    githubUrl: "https://github.com/sojib-ahmed/ai-task-assistant", // TODO: Update with your repo
    liveUrl: "https://ai-assistant.sojib.dev", // TODO: Update live demo link
    thumbnailUrl: "/projects/ai-assistant.png",
    metrics: ["Retrieval-augmented generation", "Streaming responses", "Dark/Light mode UI"],
  },
  {
    id: "project-4",
    slug: "distributed-task-queue",
    title: "Distributed Task Queue & Scheduler",
    tagline: "Resilient job queuing system built for high throughput and fault tolerance",
    description: "TODO: Add project overview describing workers, dead-letter queues, and monitoring dashboard.",
    category: "backend",
    featured: false,
    technologies: ["Go / Node.js", "RabbitMQ", "Redis", "Prometheus", "Grafana"],
    githubUrl: "https://github.com/sojib-ahmed/task-queue", // TODO: Update with your repo
    liveUrl: "https://queue-monitor.sojib.dev", // TODO: Update live demo link
    thumbnailUrl: "/projects/task-queue.png",
    metrics: ["10k+ jobs/sec throughput", "Zero data loss", "Health check metrics"],
  },
];

