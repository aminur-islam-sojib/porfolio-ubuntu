import Link from "next/link";
import { Metadata } from "next";
import {
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Monitor,
  FolderGit2,
  Briefcase,
  Cpu,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { experienceData } from "@/data/experience";

export const metadata: Metadata = {
  title: "Classic View — Resume & Portfolio",
  description: `Fast-reading recruiter portfolio and resume for ${profileData.name}, ${profileData.title}. Clean HTML/CSS view.`,
};

export default function ClassicPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-zinc-200 font-sans selection:bg-[var(--ubuntu-orange)] selection:text-white">
      {/* Top OS Switcher Banner */}
      <aside
        aria-label="OS Switcher Banner"
        className="bg-gradient-to-r from-[#2C001E] via-[#77216F] to-[#E95420] text-white px-4 py-2.5 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
      >
        <span>Looking for the interactive experience?</span>
        <Link
          href="/"
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/30 hover:bg-black/50 text-white font-semibold transition-colors underline-offset-4 hover:underline"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Launch Ubuntu Desktop OS</span>
        </Link>
      </aside>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#181818]/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/classic" className="flex items-center gap-2 group">
            <span className="w-3 h-3 rounded-full bg-[var(--ubuntu-orange)] inline-block group-hover:scale-125 transition-transform" />
            <span className="font-bold text-base text-white tracking-tight">
              {profileData.name}
            </span>
          </Link>

          <nav aria-label="Main Navigation" className="hidden sm:flex items-center gap-6 text-xs font-medium text-zinc-300">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-lg bg-[var(--ubuntu-orange)] hover:bg-[#ff6d38] text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Ubuntu OS</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-20">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Recruiter-Optimized Classic Portfolio</span>
          </div>

          <div className="space-y-3">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              {profileData.name}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-[var(--ubuntu-orange)]">
              {profileData.title}
            </p>
            <p className="text-base text-zinc-300 max-w-2xl leading-relaxed">
              {profileData.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span>{profileData.location}</span>
            </span>
            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>{profileData.email}</span>
            </a>
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <GitBranch className="w-4 h-4 text-zinc-400" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-xl bg-[var(--ubuntu-orange)] hover:bg-[#ff6d38] text-white text-xs font-semibold transition-colors shadow-sm flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
            >
              Contact Me
            </a>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl border border-white/20 hover:border-white/40 text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              <span>Interactive Desktop</span>
            </Link>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" aria-labelledby="projects-heading" className="space-y-8 scroll-mt-24">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="w-5 h-5 text-[var(--ubuntu-orange)]" />
              <h2 id="projects-heading" className="text-2xl font-bold text-white tracking-tight">
                Featured Projects
              </h2>
            </div>
            <span className="text-xs text-zinc-400">{projectsData.length} Selected Works</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => (
              <article
                key={project.id}
                className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--ubuntu-orange)]/10 text-[var(--ubuntu-orange)] text-[11px] font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    <Link href={`/projects/${project.slug}`} className="hover:text-[var(--ubuntu-orange)] transition-colors">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[11px] text-zinc-300 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--ubuntu-orange)] hover:underline flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-white flex items-center gap-1"
                      >
                        <span>Source</span>
                        <GitBranch className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/?project=${project.slug}`}
                    className="text-xs text-zinc-400 hover:text-[var(--ubuntu-orange)] flex items-center gap-1 transition-colors"
                  >
                    <span>View in OS</span>
                    <Monitor className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" aria-labelledby="skills-heading" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <Cpu className="w-5 h-5 text-[var(--ubuntu-orange)]" />
            <h2 id="skills-heading" className="text-2xl font-bold text-white tracking-tight">
              Technical Proficiencies
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skillsData.map((cat) => (
              <div
                key={cat.title}
                className="p-5 rounded-2xl bg-[#1A1A1A] border border-white/10 space-y-3"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ubuntu-orange)]">
                  {cat.title}
                </h3>
                <ul className="space-y-2">
                  {cat.skills.map((s) => (
                    <li key={s.name} className="flex items-center justify-between text-xs">
                      <span className="text-zinc-300">{s.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-zinc-400 capitalize">
                        {s.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" aria-labelledby="exp-heading" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <Briefcase className="w-5 h-5 text-[var(--ubuntu-orange)]" />
            <h2 id="exp-heading" className="text-2xl font-bold text-white tracking-tight">
              Engineering Experience
            </h2>
          </div>

          <div className="space-y-6">
            {experienceData.map((exp) => (
              <article
                key={exp.id}
                className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs text-[var(--ubuntu-orange)] font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">{exp.period}</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{exp.summary}</p>

                <ul className="space-y-1 pl-4 list-disc text-xs text-zinc-400">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-zinc-400 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" aria-labelledby="contact-heading" className="space-y-8 scroll-mt-24 pb-12">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <Mail className="w-5 h-5 text-[var(--ubuntu-orange)]" />
            <h2 id="contact-heading" className="text-2xl font-bold text-white tracking-tight">
              Get in Touch
            </h2>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1E1E1E] to-[#141414] border border-white/10 space-y-6 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white">Let&apos;s build something exceptional together</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Available for full-time software engineering roles, technical consulting, and contract projects.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${profileData.email}`}
                className="px-6 py-3 rounded-xl bg-[var(--ubuntu-orange)] hover:bg-[#ff6d38] text-white text-xs font-semibold transition-all shadow-md flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email directly</span>
              </a>

              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Monitor className="w-4 h-4" />
                <span>Open Ubuntu Desktop</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-xs text-zinc-400 bg-[#141414]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {profileData.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">Ubuntu Desktop OS</Link>
            <Link href="/dev/tokens" className="hover:text-white transition-colors">Design Tokens</Link>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
