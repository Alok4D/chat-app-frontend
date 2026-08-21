import React from "react";
import { Conversation } from "@/types/conversation";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils/formatDate";
import { Pin, CheckCheck, VolumeX } from "lucide-react";
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

  // In direct chat, find the recipient user
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

  const isOnline = otherParticipant?.isOnline || false;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 p-3 mx-2 rounded-2xl cursor-pointer transition-all duration-200 select-none border",
        isActive
          ? "bg-blue-600/10 border-blue-500/30 text-white shadow-sm"
          : "bg-transparent border-transparent hover:bg-slate-900/80 hover:border-slate-800 text-slate-300"
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
        <div className="flex items-center justify-between mb-1">
          <h4
            className={cn(
              "text-xs font-semibold truncate transition-colors",
              isActive ? "text-blue-400" : "text-slate-100 group-hover:text-white"
            )}
          >
            {displayName}
          </h4>
          {conversation.lastMessage?.createdAt && (
            <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-mono">
              {formatDate(conversation.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs">
          <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
            {conversation.lastMessage?.content || "Started a new conversation"}
          </p>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {conversation.isPinned && (
              <Pin className="w-3 h-3 text-slate-500 fill-slate-500" />
            )}
            {conversation.isMuted && (
              <VolumeX className="w-3 h-3 text-slate-500" />
            )}
            {conversation.unreadCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white font-bold text-[10px] shadow-sm shadow-blue-500/50">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
