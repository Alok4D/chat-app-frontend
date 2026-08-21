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

export const ParticipantItem: React.FC<ParticipantItemProps> = ({ user, isSelected, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(user.id)}
      className={cn(
        "flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all",
        isSelected
          ? "bg-[#F4F3FF] border border-[#6C63FF]/30"
          : "hover:bg-[#F8FAFC] border border-transparent"
      )}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Avatar src={user.avatarUrl} name={user.name} isOnline={user.isOnline} showStatus size="sm" />
        <div className="min-w-0">
          <p className="text-[13px] font-bold truncate text-[#0F172A]">{user.name}</p>
          <p className="text-[11.5px] text-[#64748B] truncate">{user.statusMessage || user.phone}</p>
        </div>
      </div>

      {/* Checkbox */}
      <div
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center transition-all border shrink-0",
          isSelected
            ? "bg-[#6C63FF] border-[#6C63FF] text-white shadow-2xs"
            : "border-[#CBD5E1] bg-white"
        )}
      >
        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
      </div>
    </div>
  );
};
