"use client";

import React from "react";
import { Message } from "@/types/message";
import { MessageBubble } from "./MessageBubble";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useAppSelector } from "@/store/hooks";

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
      <div className="flex-1 flex items-center justify-center bg-[#0D1117]">
        <LoadingSpinner size="lg" label="Loading messages..." />
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar bg-[#0D1117]"
    >
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center text-[#8B949E] py-12">
          <p className="text-xs">No messages yet. Send a message to start the conversation! 👋</p>
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
