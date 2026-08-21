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
        "group relative flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 select-none",
        isActive ? "bg-[#21262D]" : "hover:bg-[#161B22]"
      )}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-7 bg-[#6C63FF] rounded-r-full" />
      )}

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
          <h4 className="text-[13px] font-semibold truncate text-[#E6EDF3]">
            {displayName}
          </h4>
          {conversation.lastMessage?.createdAt && (
            <span className="text-[10.5px] text-[#8B949E] shrink-0 ml-2">
              {formatDate(conversation.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[12px] text-[#8B949E] truncate max-w-[150px]">
            {conversation.lastMessage?.content || "Started a new conversation"}
          </p>

          {conversation.unreadCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#6C63FF] text-white font-bold text-[10px]">
              {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
