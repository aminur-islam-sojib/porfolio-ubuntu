import Link from "next/link";
import { ArrowRight, Terminal, Palette, ShieldCheck } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#77216F] via-[#5E2750] to-[#2C001E] text-white">
      <div className="max-w-xl w-full bg-[#1e1e1e]/90 backdrop-blur-md rounded-[var(--window-radius)] border border-white/10 shadow-[var(--shadow-window)] overflow-hidden">
        {/* Title bar */}
        <div className="h-[var(--titlebar-height)] bg-[#2e2e2e] px-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--ubuntu-orange)] inline-block" />
            <span className="text-xs font-medium text-white/90">
              {profileData.name} — Ubuntu Desktop Portfolio
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#444444]" />
            <span className="w-3 h-3 rounded-full bg-[#444444]" />
            <span className="w-3 h-3 rounded-full bg-[#444444]" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Phase 0: Foundation Complete</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              {profileData.name}
            </h1>
            <p className="text-sm text-zinc-300">
              {profileData.title} • {profileData.subtitle}
            </p>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Welcome to the Ubuntu 24.04 desktop web OS environment. All core design tokens, Google Fonts (Ubuntu and Ubuntu Mono), data contracts, and UI primitives are configured.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-[var(--control-radius)] bg-white/5 border border-white/5 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-[var(--ubuntu-orange)] font-medium">
                <Palette className="w-3.5 h-3.5" />
                <span>Tokens</span>
              </div>
              <p className="text-[11px] text-zinc-400">Yaru Dark/Light, Accents, Elevation</p>
            </div>

            <div className="p-3 rounded-[var(--control-radius)] bg-white/5 border border-white/5 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Terminal className="w-3.5 h-3.5" />
                <span>Typography</span>
              </div>
              <p className="text-[11px] text-zinc-400">Ubuntu & Ubuntu Mono</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dev/tokens"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--control-radius)] bg-[var(--ubuntu-orange)] hover:bg-[var(--ubuntu-orange-hover)] active:bg-[var(--ubuntu-orange-active)] font-medium text-sm text-white shadow-sm transition-colors"
            >
              <span>Explore /dev/tokens Showcase</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-3 bg-black/30 border-t border-white/5 text-[11px] text-zinc-500 flex items-center justify-between">
          <span>Ubuntu 24.04 LTS Noble Numbat</span>
          <span>Next.js 16 + Tailwind CSS</span>
        </div>
      </div>
    </main>
  );
}
