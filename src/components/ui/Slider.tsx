import * as React from "react";
import { cn } from "@/lib/cn";

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
  disabled = false,
  "aria-label": ariaLabel,
}: SliderProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center py-2", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-[#444444] rounded-full appearance-none cursor-pointer accent-[var(--ubuntu-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] disabled:opacity-50"
        style={{
          background: `linear-gradient(to right, var(--ubuntu-orange) 0%, var(--ubuntu-orange) ${percentage}%, #444444 ${percentage}%, #444444 100%)`,
        }}
      />
    </div>
  );
}

