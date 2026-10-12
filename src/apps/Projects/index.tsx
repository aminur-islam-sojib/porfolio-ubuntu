"use client";

import * as React from "react";
import { projectsData, Project } from "@/data/projects";
import { ProjectDetailModal } from "@/apps/Projects/ProjectDetailModal";
import { ExternalLink, GitBranch, Search, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

type CategoryFilter = "all" | "full-stack" | "frontend" | "backend";

export default function ProjectsApp() {
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [detailProject, setDetailProject] = React.useState<Project | null>(null);

  const categories: Array<{ id: CategoryFilter; label: string }> = [
    { id: "all", label: "All Projects" },
    { id: "full-stack", label: "Full-Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
  ];

  const filteredProjects = React.useMemo(() => {
    return projectsData.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto font-sans text-white select-text">
      {/* Header and Controls */}
      <div className="space-y-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Software Engineering Portfolio</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Architectural case studies, full-stack systems, and deployed microservices
          </p>
        </div>

        {/* Filter controls bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/30 border border-white/5 w-fit max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-[var(--control-radius)] text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-[var(--ubuntu-orange)] text-white shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech or title..."
              aria-label="Search projects"
              className="h-8 pl-8 pr-3 rounded-[var(--control-radius)] bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 outline-none focus:border-[var(--ubuntu-orange)] transition-colors w-full sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center space-y-2 text-zinc-400">
          <p className="text-sm">No projects matching your search filter.</p>
          <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-[var(--window-radius)] bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--ubuntu-orange)]/20 text-[var(--ubuntu-orange)] border border-[var(--ubuntu-orange)]/30">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-base font-bold text-white group-hover:text-[var(--ubuntu-orange)] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Technologies and Detail Button */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/40 text-zinc-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] text-zinc-400">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setDetailProject(project)}
                  className="w-full gap-1.5 text-xs h-8"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Architectural Details</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {detailProject && (
        <ProjectDetailModal
          project={detailProject}
          onClose={() => setDetailProject(null)}
        />
      )}
    </div>
  );
}
