import React from "react";
import { Conversation } from "@/types/conversation";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils/formatDate";
import { cn } from "@/lib/utils/cn";
import { useAppSelector } from "@/store/hooks";

export interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
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

  const isOnline = otherParticipant?.isOnline || false;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-3 mx-2 my-0.5 rounded-2xl cursor-pointer transition-all duration-150 select-none",
        isActive
          ? "bg-[#F4F3FF] border border-[#6C63FF]/20 shadow-xs"
          : "hover:bg-[#F8FAFC] border border-transparent"
      )}
    >
      <Avatar
        src={displayAvatar}
        name={displayName}
        size="md"
        isOnline={isOnline}
        showStatus={conversation.type === "direct"}
        isGroup={conversation.type === "group"}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h4
            className={cn(
              "text-[13.5px] font-bold truncate transition-colors",
              isActive ? "text-[#6C63FF]" : "text-[#0F172A]"
            )}
          >
            {displayName}
          </h4>
          {conversation.lastMessage?.createdAt && (
            <span className="text-[11px] text-[#94A3B8] shrink-0 font-medium ml-1">
              {formatDate(conversation.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-1">
          <p className="text-[12px] text-[#64748B] truncate max-w-[155px]">
            {conversation.lastMessage?.content || "Started a new conversation"}
          </p>

          {conversation.unreadCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#6C63FF] text-white font-bold text-[10px] shadow-sm shadow-[#6C63FF]/30 shrink-0">
              {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
