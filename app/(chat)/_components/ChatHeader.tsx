"use client";

import React from "react";
import { Conversation } from "@/types/conversation";
import { Avatar } from "@/components/ui/Avatar";
import { formatLastSeen } from "@/lib/utils/formatTime";
import { Phone, Video, MoreVertical, Menu, Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsMobileSidebarOpen } from "@/store/chat.store";

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

  const subtitle =
    conversation.type === "group"
      ? `${conversation.participants.length} members`
      : formatLastSeen(otherParticipant?.lastSeen, otherParticipant?.isOnline);

  return (
    <div className="h-[60px] px-4 bg-[#111827] border-b border-[#21262D] flex items-center justify-between shrink-0 z-20">
      {/* Left: Avatar + name */}
      <div className="flex items-center gap-3">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => dispatch(setIsMobileSidebarOpen(true))}
          className="md:hidden p-2 rounded-xl text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Avatar
          src={displayAvatar}
          name={displayName}
          size="md"
          isOnline={otherParticipant?.isOnline}
          showStatus={conversation.type === "direct"}
          isGroup={conversation.type === "group"}
        />

        <div>
          <h3 className="text-[14px] font-bold text-[#E6EDF3] leading-tight">{displayName}</h3>
          <p className="text-[11.5px] text-[#8B949E] flex items-center gap-1">
            {conversation.type === "direct" && otherParticipant?.isOnline && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950] inline-block" />
            )}
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Action icons */}
      <div className="flex items-center gap-1">
        {[Phone, Video, Search].map((Icon, i) => (
          <button
            key={i}
            className="p-2 rounded-xl text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D] transition-all"
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
        <button className="p-2 rounded-xl text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D] transition-all">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
