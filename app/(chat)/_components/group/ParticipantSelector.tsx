import React, { useState } from "react";
import { User } from "@/types/user";
import { ParticipantItem } from "./ParticipantItem";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export interface ParticipantSelectorProps {
  users: User[];
  selectedUserIds: string[];
  onToggleParticipant: (userId: string) => void;
}

export const ParticipantSelector: React.FC<ParticipantSelectorProps> = ({
  users,
  selectedUserIds,
  onToggleParticipant,
}) => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-300">
          Select Participants ({selectedUserIds.length} chosen)
        </label>
      </div>

      <Input
        placeholder="Filter contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search className="w-4 h-4 text-slate-500" />}
        className="h-9 text-xs"
      />

      <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
        {filteredUsers.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <ParticipantItem
              key={user.id}
              user={user}
              isSelected={selectedUserIds.includes(user.id)}
              onToggle={onToggleParticipant}
            />
          ))
        )}
      </div>
    </div>
  );
};
