import * as React from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors select-none rounded-[var(--control-radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ubuntu-orange)] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-[var(--color-card-bg)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-card-hover)] active:bg-[var(--color-card-active)]",
      primary:
        "bg-[var(--ubuntu-orange)] text-white hover:bg-[var(--ubuntu-orange-hover)] active:bg-[var(--ubuntu-orange-active)] shadow-sm",
      danger:
        "bg-[var(--color-status-danger)] text-white hover:opacity-90 active:opacity-100",
      ghost:
        "text-[var(--color-text-primary)] hover:bg-[var(--color-card-hover)] active:bg-[var(--color-card-active)]",
      link:
        "text-[var(--ubuntu-orange)] underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizeStyles = {
      sm: "h-7 px-2.5 text-xs gap-1.5",
      md: "h-9 px-3.5 text-sm gap-2",
      lg: "h-11 px-5 text-base gap-2.5",
      icon: "h-8 w-8 p-0 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

