import React from "react";
import { Conversation } from "@/types/conversation";
import { Avatar } from "@/components/ui/Avatar";
import { formatTime } from "@/lib/utils/formatTime";
import { cn } from "@/lib/utils/cn";
import { useAppSelector } from "@/redux/hooks";

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
        "group relative flex items-center gap-3 px-3 py-2.5 mx-2 my-0.5 rounded-lg cursor-pointer transition-colors duration-150 select-none",
        isActive
          ? "bg-[#EEF0F4]"
          : "hover:bg-[#F9FAFB] bg-transparent"
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
          <h4 className="text-[13.5px] font-bold text-[#111827] truncate">
            {displayName}
          </h4>
          {conversation.lastMessage?.createdAt && (
            <span className="text-[11px] text-[#9CA3AF] shrink-0 font-medium ml-1">
              {formatTime(conversation.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-1">
          <p className="text-[12px] text-[#6B7280] truncate max-w-[160px]">
            {conversation.lastMessage?.content || "Started a new conversation"}
          </p>

          {conversation.type === "group" ? (
            <span className="text-[9.5px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#EDE9FE] text-[#6366F1] shrink-0">
              GROUP
            </span>
          ) : conversation.unreadCount > 0 ? (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#6366F1] text-white font-bold text-[10px] shrink-0">
              {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
