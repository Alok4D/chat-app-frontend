"use client";

import React from "react";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchQuery, setFilterType } from "@/redux/slices/chatSlice";
import { cn } from "@/lib/utils/cn";

export const ChatSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, filterType } = useAppSelector((s) => s.chat);

  const filterTabs: Array<{ id: "all" | "direct" | "group"; label: string }> = [
    { id: "all", label: "All" },
    { id: "direct", label: "Direct" },
    { id: "group", label: "Groups" },
  ];

  return (
    <div className="px-4 pt-3 pb-3 space-y-3 border-b border-[#F1F5F9] bg-white">
      {/* Search Input */}
      <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 focus-within:border-[#6C63FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#6C63FF]/10 transition-all">
        <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="flex-1 bg-transparent text-[13px] text-[#0F172A] placeholder-[#94A3B8] outline-none"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5">
        {filterTabs.map((tab) => {
          const isActive = filterType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => dispatch(setFilterType(tab.id))}
              className={cn(
                "px-3.5 py-1 rounded-full text-xs font-semibold transition-all select-none",
                isActive
                  ? "bg-[#6C63FF] text-white shadow-sm shadow-[#6C63FF]/30"
                  : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A]"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
