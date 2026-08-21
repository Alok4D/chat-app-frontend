import React from "react";
import { User } from "@/types/user";
import { Avatar } from "@/components/ui/Avatar";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ParticipantItemProps {
  user: User;
  isSelected: boolean;
  onToggle: (userId: string) => void;
}

export const ParticipantItem: React.FC<ParticipantItemProps> = ({
  user,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      onClick={() => onToggle(user.id)}
      className={cn(
        "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border",
        isSelected
          ? "bg-blue-600/10 border-blue-500/30 text-white"
          : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/60 text-slate-300"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Avatar src={user.avatarUrl} name={user.name} isOnline={user.isOnline} showStatus size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold truncate text-slate-100">{user.name}</p>
          <p className="text-[11px] text-slate-400 truncate">{user.statusMessage || user.phone}</p>
        </div>
      </div>

      <div
        className={cn(
          "w-5 h-5 rounded-lg flex items-center justify-center transition-all border",
          isSelected
            ? "bg-blue-600 border-blue-500 text-white shadow-sm shadow-blue-500/50"
            : "border-slate-700 bg-slate-800/60"
        )}
      >
        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </div>
  );
};
