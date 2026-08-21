"use client";

import React from "react";
import { Conversation } from "@/types/conversation";
import { Avatar } from "@/components/ui/Avatar";
import { formatLastSeen } from "@/lib/utils/formatTime";
import { Phone, Video, MoreVertical, Menu, Info } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsMobileSidebarOpen, toggleInfoPanel } from "@/redux/slices/chatSlice";

export interface ChatHeaderProps {
  conversation: Conversation;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ conversation }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.auth.user);

  const otherParticipant =
    conversation.type === "direct"
      ? conversation.participants.find((p) => p.id !== currentUser?.id) || conversation.participants[0]
      : null;

  const displayName =
    conversation.type === "group"
      ? conversation.name || "Group Chat"
      : otherParticipant?.name || "User";

  const displayAvatar =
    conversation.type === "group" ? conversation.avatarUrl : otherParticipant?.avatarUrl;

  const isOnline = otherParticipant?.isOnline ?? true;

  const subtitle =
    conversation.type === "group"
      ? `${conversation.participants.length} members`
      : isOnline
      ? "Online"
      : formatLastSeen(otherParticipant?.lastSeen, false);

  return (
    <div className="h-[68px] px-6 bg-white border-b border-[#F1F5F9] flex items-center justify-between shrink-0 z-20">
      {/* Left: Avatar + name */}
      <div
        onClick={() => dispatch(toggleInfoPanel())}
        className="flex items-center gap-3.5 cursor-pointer group"
      >
        {/* Mobile sidebar toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setIsMobileSidebarOpen(true));
          }}
          className="md:hidden p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Avatar
          src={displayAvatar}
          name={displayName}
          size="md"
          isOnline={isOnline}
          showStatus={conversation.type === "direct"}
          isGroup={conversation.type === "group"}
          className="ring-2 ring-transparent group-hover:ring-[#6C63FF]/20 transition-all"
        />

        <div>
          <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight group-hover:text-[#6C63FF] transition-colors">
            {displayName}
          </h3>
          <p className="text-[11.5px] font-medium text-[#10B981] flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
            <span className={isOnline ? "text-[#10B981]" : "text-[#94A3B8]"}>{subtitle}</span>
          </p>
        </div>
      </div>

      {/* Right: Actions (Call, Video, More/Info) */}
      <div className="flex items-center gap-2">
        <button
          title="Voice call"
          className="w-10 h-10 rounded-full bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:text-[#0F172A] transition-all"
        >
          <Phone className="w-4 h-4" />
        </button>
        <button
          title="Video call"
          className="w-10 h-10 rounded-full bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:text-[#0F172A] transition-all"
        >
          <Video className="w-4 h-4" />
        </button>
        <button
          onClick={() => dispatch(toggleInfoPanel())}
          title="Conversation Info"
          className="w-10 h-10 rounded-full bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:text-[#0F172A] transition-all"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
