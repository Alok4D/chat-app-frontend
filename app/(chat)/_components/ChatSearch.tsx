"use client";

import React from "react";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/chat.store";

export const ChatSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((s) => s.chat);

  return (
    <div className="px-4 pt-3 pb-3 border-b border-[#21262D]">
      <div className="flex items-center gap-2 bg-[#161B22] border border-[#30363D] rounded-xl px-3 py-2.5 focus-within:border-[#6C63FF] focus-within:ring-1 focus-within:ring-[#6C63FF]/30 transition-all">
        <Search className="w-3.5 h-3.5 text-[#8B949E] shrink-0" />
        <input
          type="text"
          placeholder="Search by name or number..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="flex-1 bg-transparent text-[12.5px] text-[#E6EDF3] placeholder-[#8B949E] outline-none"
        />
      </div>
    </div>
  );
};
