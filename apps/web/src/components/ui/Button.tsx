"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

/**
 * NOTE: `primary-dark` was referenced here but never defined in
 * tailwind.config.ts, so the primary hover state rendered nothing.
 * The defined token is `primary-hover`.
 */
const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-onPrimary shadow-sm hover:bg-primary-hover hover:shadow-[0_8px_24px_-8px_rgb(var(--color-primary)/0.55)] focus-visible:ring-primary",
  secondary:
    "border border-border/15 bg-transparent text-foreground hover:border-primary/40 hover:bg-foreground/[0.04] focus-visible:ring-foreground/30",
  ghost:
    "bg-transparent text-muted hover:text-foreground focus-visible:ring-foreground/30",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium",
          // spring-ish lift on hover, honest press on click
          "transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out",
          "hover:-translate-y-px active:translate-y-0 active:scale-[0.97]",
          "motion-reduce:transform-none motion-reduce:transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
