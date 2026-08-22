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
    xs: "w-6 h-6 text-[10.5px]",
    sm: "w-8 h-8 text-[12px]",
    md: "w-10 h-10 text-[14px]",
    lg: "w-11 h-11 text-[15px]",
    xl: "w-14 h-14 text-[18px]",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5 h-5",
    xl: "w-7 h-7",
  };

  const statusSizeStyles = {
    xs: "w-2 h-2 ring-1",
    sm: "w-2.5 h-2.5 ring-2",
    md: "w-3 h-3 ring-2",
    lg: "w-3.5 h-3.5 ring-2",
    xl: "w-4 h-4 ring-2",
  };

  const getInitials = (n: string) => {
    if (!n || !n.trim()) return "U";
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].slice(0, 1).toUpperCase(); // e.g. "ABCD" -> "A"
    }
    return (parts[0][0] + parts[1][0]).toUpperCase(); // e.g. "Lyle Ingram" -> "LI"
  };

  const hasValidImage = src && src.trim().length > 0 && !src.includes("dicebear");

  return (
    <div className={cn("relative inline-flex flex-shrink-0 items-center justify-center select-none", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center font-bold text-white tracking-wide shadow-2xs",
          sizeStyles[size],
          !hasValidImage && (isGroup ? "bg-[#5B4FE1]" : "bg-[#8B5CF6]")
        )}
      >
        {hasValidImage ? (
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
          <Users className={cn(iconSizes[size], "text-white")} />
        ) : (
          getInitials(name)
        )}
      </div>

      {showStatus && !isGroup && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-white bg-[#10B981]",
            statusSizeStyles[size]
          )}
          title={isOnline ? "Online" : "Offline"}
        />
      )}
    </div>
  );
};
