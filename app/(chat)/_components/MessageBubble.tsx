"use client";

import React from "react";
import { Message } from "@/types/message";
import { Avatar } from "@/components/ui/Avatar";
import { formatTime } from "@/lib/utils/formatTime";
import { cn } from "@/lib/utils/cn";

export interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
}) => {
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

          {/* Timestamp */}
          <div
            className={cn(
              "flex items-center gap-1 mt-1 text-[10.5px] select-none",
              isCurrentUser ? "justify-end text-[#C8C3FF]" : "justify-end text-[#8B949E]"
            )}
          >
            <span>{formatTime(message.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
