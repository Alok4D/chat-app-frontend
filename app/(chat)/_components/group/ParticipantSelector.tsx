"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/types/user";
import { ParticipantItem } from "./ParticipantItem";
import { Search } from "lucide-react";
import { usersApi } from "@/lib/api/users.api";
import { useAppSelector } from "@/store/hooks";

export interface ParticipantSelectorProps {
  users?: User[];
  selectedUserIds: string[];
  onToggleParticipant: (userId: string) => void;
}

export const ParticipantSelector: React.FC<ParticipantSelectorProps> = ({
  users = [],
  selectedUserIds,
  onToggleParticipant,
}) => {
  const currentUser = useAppSelector((s) => s.auth.user);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [cachedUsers, setCachedUsers] = useState<Record<string, User>>({});
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
        const filtered = res.filter((u) => u.id !== currentUser?.id);
        setSearchResults(filtered);
        
        // Cache found users so they remain accessible when selected
        setCachedUsers((prev) => {
          const next = { ...prev };
          filtered.forEach((u) => {
            next[u.id] = u;
          });
          return next;
        });
      } catch {
        console.error("Group search error");
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(delay);
  }, [search, currentUser]);

  // Combine search results and any previously selected users that are cached
  const displayedUsers: User[] = [];
  const seenIds = new Set<string>();

  searchResults.forEach((u) => {
    displayedUsers.push(u);
    seenIds.add(u.id);
  });

  // Always show selected users even if not in current search filter
  selectedUserIds.forEach((id) => {
    if (!seenIds.has(id)) {
      const user = cachedUsers[id] || users.find((u) => u.id === id);
      if (user) {
        displayedUsers.unshift(user);
        seenIds.add(id);
      }
    }
  });

  return (
    <div className="space-y-2.5">
      {/* Search Bar */}
      <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 focus-within:border-[#6C63FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#6C63FF]/10 transition-all">
        <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
        <input
          type="text"
          placeholder="Search by phone (e.g. 1555) or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-[13px] text-[#0F172A] placeholder-[#94A3B8] outline-none"
        />
      </div>

      {/* List */}
      <div className="max-h-52 overflow-y-auto custom-scrollbar rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/50 p-1">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <span className="w-5 h-5 border-2 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin" />
          </div>
        ) : displayedUsers.length === 0 ? (
          <p className="text-[12px] text-[#94A3B8] text-center py-6 font-medium">
            {search.trim() ? "No users found" : "Type a phone number or name to find members"}
          </p>
        ) : (
          <div className="space-y-1">
            {displayedUsers.map((user) => (
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

      {/* Counter & Help text */}
      <div className="flex items-center justify-between text-[11.5px] px-1">
        <span
          className={
            selectedUserIds.length >= 2
              ? "text-[#10B981] font-semibold"
              : "text-[#64748B] font-medium"
          }
        >
          {selectedUserIds.length} participant{selectedUserIds.length === 1 ? "" : "s"} selected
        </span>
        {selectedUserIds.length < 2 && (
          <span className="text-[#94A3B8] font-medium">(minimum 2 required)</span>
        )}
      </div>
    </div>
  );
};
