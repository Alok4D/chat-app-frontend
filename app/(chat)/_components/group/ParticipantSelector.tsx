"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/types/user";
import { ParticipantItem } from "./ParticipantItem";
import { Search } from "lucide-react";
import { usersApi } from "@/lib/api/users.api";

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
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await usersApi.getUsers({ search });
        setSearchResults(res);
      } catch {
        console.error("Group search error");
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  // Ensure already-selected users remain visible
  const allDisplayUsers = [...searchResults];
  selectedUserIds.forEach((selectedId) => {
    if (!allDisplayUsers.some((u) => u.id === selectedId)) {
      const found = users.find((u) => u.id === selectedId);
      if (found) allDisplayUsers.push(found);
    }
  });

  return (
    <div className="space-y-2">
      {/* Search */}
      <div className="flex items-center gap-2 bg-[#0D1117] border border-[#30363D] rounded-xl px-3 py-2.5 focus-within:border-[#6C63FF]/60 transition-all">
        <Search className="w-3.5 h-3.5 text-[#8B949E] shrink-0" />
        <input
          type="text"
          placeholder="Search users by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-[13px] text-[#E6EDF3] placeholder-[#8B949E] outline-none"
        />
      </div>

      {/* List */}
      <div className="max-h-52 overflow-y-auto custom-scrollbar rounded-xl border border-[#30363D] bg-[#161B22]">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <span className="w-5 h-5 border-2 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin" />
          </div>
        ) : allDisplayUsers.length === 0 ? (
          <p className="text-[12px] text-[#8B949E] text-center py-6">
            {search.trim() ? "No users found" : "Type to search for users..."}
          </p>
        ) : (
          <div className="divide-y divide-[#21262D]">
            {allDisplayUsers.map((user) => (
              <ParticipantItem
                key={user.id}
                user={user}
                isSelected={selectedUserIds.includes(user.id)}
                onToggle={onToggleParticipant}
              />
            ))}
          </div>
        )}
      </div>

      {selectedUserIds.length > 0 && (
        <p className="text-[11.5px] text-[#6C63FF] font-medium">
          {selectedUserIds.length} participant{selectedUserIds.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
};
