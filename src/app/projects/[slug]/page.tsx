import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Monitor,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { projectsData, Project } from "@/data/projects";
import { profileData } from "@/data/profile";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | ${profileData.name}`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project: Project | undefined = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#111111] text-zinc-200 font-sans selection:bg-[var(--ubuntu-orange)] selection:text-white">
      {/* Top Banner */}
      <nav
        aria-label="Breadcrumb Navigation"
        className="bg-[#181818] border-b border-white/10 px-6 py-4"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/classic#projects"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/?project=${project.slug}`}
              className="px-3 py-1.5 rounded-lg bg-[var(--ubuntu-orange)] hover:bg-[#ff6d38] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Open in Ubuntu OS</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Case Study */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[var(--ubuntu-orange)]/15 text-[var(--ubuntu-orange)] text-xs font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Full-Stack Project</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed">
            {project.tagline}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[var(--ubuntu-orange)] hover:bg-[#ff6d38] text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub Source</span>
              </a>
            )}

            <Link
              href={`/?project=${project.slug}`}
              className="px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Interactive Desktop View</span>
            </Link>
          </div>
        </header>

        {/* Technology Stack */}
        <section aria-labelledby="tech-heading" className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 space-y-3">
          <h2 id="tech-heading" className="text-xs font-bold uppercase tracking-wider text-[var(--ubuntu-orange)]">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Performance & Engineering Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <section aria-labelledby="metrics-heading" className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 space-y-3">
            <h2 id="metrics-heading" className="text-xs font-bold uppercase tracking-wider text-[var(--ubuntu-orange)]">
              Engineering Achievements & Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Overview & Architecture */}
        <section aria-labelledby="overview-heading" className="space-y-4">
          <h2 id="overview-heading" className="text-xl font-bold text-white tracking-tight">
            System Overview & Architecture
          </h2>
          <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <p>{project.description}</p>
            <p>
              Engineered with a focus on high throughput, responsive user feedback, modular component
              isolation, and resilient state synchronization.
            </p>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs">
          <Link
            href="/classic#projects"
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>

          <Link
            href="/classic#contact"
            className="text-[var(--ubuntu-orange)] hover:underline"
          >
            Have a question about this project? Contact Sojib →
          </Link>
        </div>
      </main>
    </div>
  );
}

