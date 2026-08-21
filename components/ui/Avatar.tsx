import React from "react";
import { cn } from "@/lib/utils/cn";
import { Users } from "lucide-react";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isOnline?: boolean;
  showStatus?: boolean;
  className?: string;
  isGroup?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "User",
  size = "md",
  isOnline,
  showStatus = false,
  className,
  isGroup = false,
}) => {
  const sizeStyles = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const statusSizeStyles = {
    xs: "w-1.5 h-1.5 ring-1",
    sm: "w-2.5 h-2.5 ring-2",
    md: "w-3 h-3 ring-2",
    lg: "w-3.5 h-3.5 ring-2",
    xl: "w-4 h-4 ring-2",
  };

  const getInitials = (n: string) => {
    return n
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getBgColor = (n: string) => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-violet-500 to-purple-600",
      "from-amber-500 to-orange-600",
      "from-rose-500 to-pink-600",
      "from-cyan-500 to-blue-600",
    ];
    let hash = 0;
    for (let i = 0; i < n.length; i++) {
      hash = n.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <div className={cn("relative inline-flex flex-shrink-0 items-center justify-center select-none", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center font-semibold text-white shadow-inner",
          sizeStyles[size],
          !src && (isGroup ? "bg-gradient-to-br from-indigo-500 to-purple-600" : `bg-gradient-to-br ${getBgColor(name)}`)
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : isGroup ? (
          <Users className={cn(size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : "w-5 h-5")} />
        ) : (
          getInitials(name)
        )}
      </div>

      {showStatus && !isGroup && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-slate-900",
            statusSizeStyles[size],
            isOnline ? "bg-emerald-500" : "bg-slate-500"
          )}
          title={isOnline ? "Online" : "Offline"}
        />
      )}
    </div>
  );
};
