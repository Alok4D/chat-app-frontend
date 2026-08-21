"use client";

import React, { useState } from "react";
import { Message } from "@/types/message";
import { Avatar } from "@/components/ui/Avatar";
import { formatTime } from "@/lib/utils/formatTime";
import { Check, CheckCheck, Smile, Reply } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  onReact?: (messageId: string, emoji: string) => void;
  onReply?: (message: Message) => void;
}

const COMMON_EMOJIS = ["👍", "❤️", "🔥", "🚀", "😂", "🎉"];

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  onReact,
  onReply,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex gap-2.5 max-w-[85%] sm:max-w-[68%] animate-fadeIn",
        isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar (received only) */}
      {!isCurrentUser && (
        <Avatar
          src={message.sender?.avatarUrl}
          name={message.sender?.name || "User"}
          size="sm"
          className="mt-1 shrink-0"
        />
      )}

      <div className="flex flex-col gap-1">
        {/* Sender name (group chats) */}
        {!isCurrentUser && message.sender?.name && (
          <span className="text-[11.5px] font-semibold text-[#8B949E] pl-1">
            {message.sender.name}
          </span>
        )}

        {/* Reply quote */}
        {message.replyTo && (
          <div
            className={cn(
              "text-[11px] px-3 py-1.5 rounded-lg border-l-2 truncate",
              isCurrentUser
                ? "border-[#6C63FF] bg-[#6C63FF]/20 text-[#C8C3FF]"
                : "border-[#30363D] bg-[#21262D] text-[#8B949E]"
            )}
          >
            <span className="font-semibold">{message.replyTo.senderName}: </span>
            {message.replyTo.content}
          </div>
        )}

        {/* Main Bubble */}
        <div
          className={cn(
            "relative px-4 py-2.5 rounded-2xl text-[13.5px] break-words leading-relaxed shadow-sm",
            isCurrentUser
              ? "bg-[#6C63FF] text-white rounded-br-sm"
              : "bg-[#21262D] text-[#E6EDF3] rounded-bl-sm"
          )}
        >
          <p>{message.content}</p>

          {/* Timestamp + read receipt */}
          <div
            className={cn(
              "flex items-center gap-1 mt-1 text-[10.5px] select-none",
              isCurrentUser ? "justify-end text-[#C8C3FF]" : "justify-end text-[#8B949E]"
            )}
          >
            <span>{formatTime(message.createdAt)}</span>
            {isCurrentUser && (
              message.status === "read" ? (
                <CheckCheck className="w-3.5 h-3.5 text-[#C8C3FF]" />
              ) : message.status === "delivered" ? (
                <CheckCheck className="w-3.5 h-3.5 text-[#C8C3FF]/60" />
              ) : (
                <Check className="w-3.5 h-3.5 text-[#C8C3FF]/60" />
              )
            )}
          </div>
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className={cn("flex flex-wrap gap-1", isCurrentUser ? "justify-end" : "justify-start")}>
            {message.reactions.map((reaction, i) => (
              <button
                key={i}
                onClick={() => onReact?.(message.id, reaction.emoji)}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#21262D] border border-[#30363D] text-[#E6EDF3] hover:border-[#6C63FF]/50 hover:bg-[#6C63FF]/10 transition-colors"
              >
                <span>{reaction.emoji}</span>
                <span className="text-[10px] font-semibold text-[#8B949E]">{reaction.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating actions */}
      <div
        className={cn(
          "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 bg-[#161B22] border border-[#30363D] rounded-xl px-1.5 py-1 shadow-lg z-20",
          isCurrentUser ? "-left-[4.5rem]" : "-right-[4.5rem]"
        )}
      >
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-1 rounded-lg text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D] transition-colors"
        >
          <Smile className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onReply?.(message)}
          className="p-1 rounded-lg text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D] transition-colors"
        >
          <Reply className="w-3.5 h-3.5" />
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-full mb-1 left-0 flex items-center gap-1 p-1.5 bg-[#161B22] border border-[#30363D] rounded-xl shadow-xl z-30 animate-scaleUp">
            {COMMON_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => { onReact?.(message.id, emoji); setShowEmojiPicker(false); }}
                className="hover:scale-125 transition-transform p-0.5 text-sm"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
