import React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "primary",
  size = "sm",
  ...props
}) => {
  const variantStyles = {
    primary: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    secondary: "bg-slate-800 text-slate-300 border border-slate-700",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    danger: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    outline: "bg-transparent text-slate-300 border border-slate-700",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 rounded-full font-medium",
    md: "text-xs px-2.5 py-1 rounded-full font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono tracking-tight",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
