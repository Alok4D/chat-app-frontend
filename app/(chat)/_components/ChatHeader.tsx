"use client";

import React from "react";
import { Conversation } from "@/types/conversation";
import { Avatar } from "@/components/ui/Avatar";
import { formatLastSeen } from "@/lib/utils/formatTime";
import { Phone, Video, MoreVertical, Menu, Info, Users } from "lucide-react";
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
    conversation.type === "group"
      ? conversation.avatarUrl
      : otherParticipant?.avatarUrl;

  const subtitle =
    conversation.type === "group"
      ? `${conversation.participants.length} members`
      : formatLastSeen(otherParticipant?.lastSeen, otherParticipant?.isOnline);

  return (
    <div className="h-16 px-4 sm:px-6 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between backdrop-blur-xl z-20">
      <div className="flex items-center gap-3">
        {/* Mobile toggle button */}
        <button
          onClick={() => dispatch(setIsMobileSidebarOpen(true))}
          aria-label="Open sidebar"
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
          <h3 className="text-sm font-semibold text-white tracking-tight">{displayName}</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            {conversation.type === "direct" && otherParticipant?.isOnline && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            )}
            {subtitle}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          title="Start voice call"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Phone className="w-4 h-4" />
        </button>
        <button
          title="Start video call"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Video className="w-4 h-4" />
        </button>
        <button
          title="Channel details"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:inline-flex"
        >
          <Info className="w-4 h-4" />
        </button>
        <button
          title="More options"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
