"use client";

import React from "react";
import { Search, Plus, Filter, MessageSquare, Users } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery, setFilterType, setIsCreateGroupModalOpen } from "@/store/chat.store";

export const ChatSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, filterType } = useAppSelector((s) => s.chat);

  return (
    <div className="p-4 space-y-3 border-b border-slate-800/80 bg-slate-950/40">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          leftIcon={<Search className="w-4 h-4 text-slate-500" />}
          className="h-10 text-xs bg-slate-900/60"
        />
        <button
          onClick={() => dispatch(setIsCreateGroupModalOpen(true))}
          title="Create Group"
          className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => dispatch(setFilterType("all"))}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            filterType === "all"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilterType("direct"))}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
            filterType === "direct"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <MessageSquare className="w-3 h-3" />
          Direct
        </button>
        <button
          onClick={() => dispatch(setFilterType("group"))}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
            filterType === "group"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Users className="w-3 h-3" />
          Groups
        </button>
      </div>
    </div>
  );
};
