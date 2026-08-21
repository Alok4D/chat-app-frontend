import React from "react";
import { cn } from "@/lib/utils/cn";

export interface TypingIndicatorProps {
  userName?: string;
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  userName = "Someone",
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 animate-fadeIn shadow-sm",
        className
      )}
    >
      <span className="font-medium text-slate-300">{userName} is typing</span>
      <div className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
};
