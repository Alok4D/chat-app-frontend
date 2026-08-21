"use client";

import React from "react";
import { Search, Plus, MessageSquare, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery, setFilterType, setIsCreateGroupModalOpen } from "@/store/chat.store";

export const ChatSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, filterType } = useAppSelector((s) => s.chat);

  return (
    <div className="px-4 pt-3 pb-3 space-y-3 border-b border-[#21262D]">
      {/* Search Input */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-[#161B22] border border-[#30363D] rounded-xl px-3 py-2.5 focus-within:border-[#6C63FF] focus-within:ring-1 focus-within:ring-[#6C63FF]/30 transition-all">
          <Search className="w-3.5 h-3.5 text-[#8B949E] shrink-0" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="flex-1 bg-transparent text-[12.5px] text-[#E6EDF3] placeholder-[#8B949E] outline-none"
          />
        </div>
        <button
          onClick={() => dispatch(setIsCreateGroupModalOpen(true))}
          title="New Conversation"
          className="h-[38px] w-[38px] flex-shrink-0 flex items-center justify-center rounded-xl bg-[#6C63FF] hover:bg-[#5a52e8] text-white shadow-md shadow-[#6C63FF]/25 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5">
        {[
          { label: "All", value: "all" },
          { label: "Direct", value: "direct" },
          { label: "Groups", value: "group" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => dispatch(setFilterType(tab.value as any))}
            className={`text-[11.5px] px-3 py-1 rounded-full font-medium transition-all ${
              filterType === tab.value
                ? "bg-[#6C63FF] text-white shadow-sm shadow-[#6C63FF]/30"
                : "text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
