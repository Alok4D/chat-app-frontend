"use client";

import React from "react";
import { Message } from "@/types/message";
import { Avatar } from "@/components/ui/Avatar";
import { formatTime } from "@/lib/utils/formatTime";
import { CheckCheck } from "lucide-react";
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
        "group relative flex gap-2.5 max-w-[85%] sm:max-w-[65%] animate-fadeIn",
        isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar for received messages */}
      {!isCurrentUser && (
        <Avatar
          src={message.sender?.avatarUrl}
          name={message.sender?.name || "User"}
          size="sm"
          className="mt-1 shrink-0"
        />
      )}

      <div className="flex flex-col gap-1 min-w-0">
        {/* Sender name for group messages */}
        {!isCurrentUser && message.sender?.name && (
          <span className="text-[11.5px] font-bold text-[#64748B] pl-1">
            {message.sender.name}
          </span>
        )}

        {/* Message Bubble Container */}
        <div
          className={cn(
            "relative px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed break-words shadow-xs",
            isCurrentUser
              ? "bg-[#6C63FF] text-white rounded-br-xs"
              : "bg-[#F1F5F9] text-[#0F172A] rounded-tl-xs"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* Time + Status */}
          <div
            className={cn(
              "flex items-center justify-end gap-1.5 mt-1 text-[10.5px] select-none font-medium",
              isCurrentUser ? "text-[#DDD6FE]" : "text-[#94A3B8]"
            )}
          >
            <span>{formatTime(message.createdAt)}</span>
            {isCurrentUser && (
              <CheckCheck className="w-3.5 h-3.5 text-[#DDD6FE]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
