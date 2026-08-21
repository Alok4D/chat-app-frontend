"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/types/user";
import { ParticipantItem } from "./ParticipantItem";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { usersApi } from "@/lib/api/users.api";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";

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

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await usersApi.getUsers({ search });
        setSearchResults(res);
      } catch (err) {
        console.error("Group search contact error:", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Combine search results and currently selected items to ensure selected ones remain visible
  const allDisplayUsers = [...searchResults];
  
  selectedUserIds.forEach((selectedId) => {
    const isPresent = allDisplayUsers.some((u) => u.id === selectedId);
    if (!isPresent) {
      // Find user inside props users or build a mock placeholder
      const found = users.find((u) => u.id === selectedId);
      if (found) {
        allDisplayUsers.push(found);
      }
    }
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-300">
          Select Participants ({selectedUserIds.length} chosen)
        </label>
      </div>

      <Input
        placeholder="Search global directory by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search className="w-4 h-4 text-slate-500" />}
        className="h-9 text-xs bg-slate-900/60"
      />

      <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
        {loading ? (
          <div className="py-6 flex justify-center">
            <LoadingSpinner size="sm" label="Searching users..." />
          </div>
        ) : allDisplayUsers.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">
            Type name or phone number to find users
          </p>
        ) : (
          allDisplayUsers.map((user) => (
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
