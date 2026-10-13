"use client";

import * as React from "react";
import { skillsData } from "@/data/skills";
import { Cpu } from "lucide-react";

export default function SkillsApp() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto font-sans text-[var(--color-text-primary)]">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Technical Skills</h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Core proficiencies across frontend, backend, databases, and DevOps
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)] shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-teal-400" />
          <span>Full-Stack Arsenal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {skillsData.map((category) => (
          <div
            key={category.category}
            className="p-5 rounded-[var(--window-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] space-y-3 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-[var(--ubuntu-orange)] tracking-wide">
              {category.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="px-2.5 py-1 rounded-[var(--control-radius)] bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-primary)] flex items-center justify-between gap-3"
                >
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] capitalize">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

