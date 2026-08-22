"use client";

import React from "react";
import { Message } from "@/types/message";
import { MessageBubble } from "./MessageBubble";
import { Skeleton } from "@/components/ui/Skeleton";
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
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#F7F8FA]">
        {/* Date Chip Skeleton */}
        <div className="flex justify-center my-2">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* 1. Received Message Skeleton */}
        <div className="flex flex-col items-start max-w-[70%] space-y-1">
          <Skeleton className="h-3 w-20 rounded pl-0.5" />
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-lg space-y-2 w-56 sm:w-72">
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-3/4 rounded" />
          </div>
          <Skeleton className="h-2.5 w-10 rounded pl-0.5" />
        </div>

        {/* 2. Sent Message Skeleton */}
        <div className="flex flex-col items-end max-w-[70%] ml-auto space-y-1">
          <div className="p-3 bg-[#EDE9FE] rounded-lg space-y-2 w-48 sm:w-60">
            <Skeleton className="h-3.5 w-full rounded bg-[#DDD6FE]" />
          </div>
          <Skeleton className="h-2.5 w-10 rounded pr-0.5" />
        </div>

        {/* 3. Received Message Skeleton (Short) */}
        <div className="flex flex-col items-start max-w-[70%] space-y-1">
          <Skeleton className="h-3 w-24 rounded pl-0.5" />
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-lg space-y-1.5 w-40 sm:w-52">
            <Skeleton className="h-3.5 w-full rounded" />
          </div>
          <Skeleton className="h-2.5 w-10 rounded pl-0.5" />
        </div>

        {/* 4. Sent Message Skeleton (Longer) */}
        <div className="flex flex-col items-end max-w-[70%] ml-auto space-y-1">
          <div className="p-3 bg-[#EDE9FE] rounded-lg space-y-2 w-56 sm:w-80">
            <Skeleton className="h-3.5 w-full rounded bg-[#DDD6FE]" />
            <Skeleton className="h-3.5 w-2/3 rounded bg-[#DDD6FE]" />
          </div>
          <Skeleton className="h-2.5 w-10 rounded pr-0.5" />
        </div>
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
        <div className="h-48 flex flex-col items-center justify-center text-center text-[#9CA3AF] py-8">
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
