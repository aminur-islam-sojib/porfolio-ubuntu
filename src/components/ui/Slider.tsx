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
    <div className={cn("relative flex w-full touch-none select-none items-center py-1", className)}>
      <style>{`
        .ubuntu-slider {
          -webkit-appearance: none !important;
          appearance: none !important;
        }
        .ubuntu-slider::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 9999px;
        }
        .ubuntu-slider::-webkit-slider-thumb {
          -webkit-appearance: none !important;
          appearance: none !important;
          width: 17px !important;
          height: 17px !important;
          border-radius: 9999px !important;
          background-color: #ffffff !important;
          background: #ffffff !important;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35) !important;
          cursor: pointer !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          margin-top: -6.5px !important;
        }
        .ubuntu-slider::-moz-range-thumb {
          width: 17px !important;
          height: 17px !important;
          border-radius: 9999px !important;
          background-color: #ffffff !important;
          background: #ffffff !important;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35) !important;
          cursor: pointer !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
        }
      `}</style>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ubuntu-slider w-full h-[4px] rounded-full appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] disabled:opacity-50"
        style={{
          background: `linear-gradient(to right, var(--color-qs-slider-fill, #e95420) 0%, var(--color-qs-slider-fill, #e95420) ${percentage}%, var(--color-qs-slider-track, #484848) ${percentage}%, var(--color-qs-slider-track, #484848) 100%)`,
        }}
      />
    </div>
  );
}
