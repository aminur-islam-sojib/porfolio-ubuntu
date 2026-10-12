import * as React from "react";
import { cn } from "@/lib/cn";
import {
  Terminal,
  Folder,
  User,
  FolderGit2,
  Cpu,
  FileText,
  Mail,
  Settings,
  Trash2,
  LayoutGrid,
  Globe,
  Code2,
  Sparkles,
} from "lucide-react";

export interface AppIconProps {
  id: string;
  size?: number;
  className?: string;
}

export function AppIcon({ id, size = 40, className }: AppIconProps) {
  const iconConfig: Record<
    string,
    {
      gradient: string;
      Icon: React.ElementType;
      iconColor: string;
      shadow: string;
    }
  > = {
    terminal: {
      gradient: "from-[#300A24] to-[#1E0517]",
      Icon: Terminal,
      iconColor: "text-[#47D472]",
      shadow: "shadow-purple-950/50",
    },
    files: {
      gradient: "from-[#F39C12] to-[#D35400]",
      Icon: Folder,
      iconColor: "text-white",
      shadow: "shadow-amber-900/40",
    },
    about: {
      gradient: "from-[#3498DB] to-[#2980B9]",
      Icon: User,
      iconColor: "text-white",
      shadow: "shadow-blue-900/40",
    },
    projects: {
      gradient: "from-[#E95420] to-[#C0392B]",
      Icon: FolderGit2,
      iconColor: "text-white",
      shadow: "shadow-orange-950/40",
    },
    skills: {
      gradient: "from-[#16A085] to-[#1ABC9C]",
      Icon: Cpu,
      iconColor: "text-white",
      shadow: "shadow-teal-950/40",
    },
    resume: {
      gradient: "from-[#E74C3C] to-[#C0392B]",
      Icon: FileText,
      iconColor: "text-white",
      shadow: "shadow-red-950/40",
    },
    mail: {
      gradient: "from-[#2980B9] to-[#1F618D]",
      Icon: Mail,
      iconColor: "text-white",
      shadow: "shadow-sky-950/40",
    },
    settings: {
      gradient: "from-[#7F8C8D] to-[#4D5656]",
      Icon: Settings,
      iconColor: "text-white",
      shadow: "shadow-zinc-950/40",
    },
    trash: {
      gradient: "from-[#5D6D7E] to-[#34495E]",
      Icon: Trash2,
      iconColor: "text-zinc-200",
      shadow: "shadow-slate-950/40",
    },
    browser: {
      gradient: "from-[#E67E22] to-[#2980B9]",
      Icon: Globe,
      iconColor: "text-white",
      shadow: "shadow-blue-950/40",
    },
    vscode: {
      gradient: "from-[#007ACC] to-[#005A9E]",
      Icon: Code2,
      iconColor: "text-white",
      shadow: "shadow-sky-950/50",
    },
    apps: {
      gradient: "from-[#2C3E50] to-[#1A252F]",
      Icon: LayoutGrid,
      iconColor: "text-white",
      shadow: "shadow-black/50",
    },
    welcome: {
      gradient: "from-[#E95420] via-[#77216F] to-[#2C001E]",
      Icon: Sparkles,
      iconColor: "text-white",
      shadow: "shadow-orange-950/40",
    },
  };

  const config = iconConfig[id] || iconConfig.about;
  const { gradient, Icon, iconColor, shadow } = config;

  const glyphSize = Math.round(size * 0.55);

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "relative rounded-[10px] flex items-center justify-center bg-gradient-to-br shadow-md transition-transform duration-150 border border-white/10",
        gradient,
        shadow,
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-[9px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      <Icon
        size={glyphSize}
        className={cn("drop-shadow-sm transition-transform duration-150", iconColor)}
      />
    </div>
  );
}
