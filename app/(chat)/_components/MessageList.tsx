"use client";

import React from "react";
import { Message } from "@/types/message";
import { MessageBubble } from "./MessageBubble";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useAppSelector } from "@/redux/hooks";

export interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading = false,
}) => {
  const currentUser = useAppSelector((s) => s.auth.user);
  const scrollRef = useAutoScroll<HTMLDivElement>([messages.length]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7F8FA]">
        <LoadingSpinner size="lg" label="Loading messages..." />
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#F7F8FA]"
    >
      {/* Date Chip */}
      <div className="flex justify-center my-2">
        <span className="bg-white border border-[#E2E8F0] text-[#64748B] text-[11px] font-semibold px-3 py-1 rounded-full shadow-2xs select-none">
          Today
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="h-48 flex flex-col items-center justify-center text-center text-[#94A3B8] py-8">
          <p className="text-xs font-medium">No messages yet. Send a message to start the conversation! 👋</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUser?.id}
          />
        ))
      )}
    </div>
  );
};
