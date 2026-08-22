"use client";

import React from "react";
import { Message } from "@/types/message";
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
        "group relative flex flex-col max-w-[85%] sm:max-w-[70%]",
        isCurrentUser ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      {/* Sender name for received messages */}
      {!isCurrentUser && message.sender?.name && (
        <span className="text-[11.5px] font-semibold text-[#4F46E5] pl-0.5 mb-1 select-none">
          {message.sender.name}
        </span>
      )}

      {/* Message Bubble Container */}
      <div
        className={cn(
          "relative px-4 py-2 text-[13.5px] leading-relaxed break-words rounded-lg",
          isCurrentUser
            ? "bg-[#5B4FE1] text-white"
            : "bg-white border border-[#E5E7EB] text-[#111827]"
        )}
      >
        <p className="whitespace-pre-wrap font-normal">{message.content}</p>

        {/* Time + Status (Sent messages) */}
        {isCurrentUser && (
          <div className="flex items-center justify-end gap-1 mt-1 text-[10px] select-none font-medium text-[#DDD6FE]">
            <span>{formatTime(message.createdAt)}</span>
            <CheckCheck className="w-3 h-3 text-[#DDD6FE]" />
          </div>
        )}
      </div>

      {/* Time (Received messages) */}
      {!isCurrentUser && (
        <span className="text-[10px] text-[#9CA3AF] font-medium pl-0.5 mt-1 select-none">
          {formatTime(message.createdAt)}
        </span>
      )}
    </div>
  );
};
