"use client";

import React from "react";
import { Conversation } from "@/types/conversation";
import { ConversationItem } from "./ConversationItem";
import { Skeleton } from "@/components/ui/Skeleton";
import { MessageSquareDashed } from "lucide-react";

export interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading?: boolean;
  onSelectConversation: (id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  isLoading = false,
  onSelectConversation,
}) => {
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto py-1 space-y-1 custom-scrollbar">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg"
          >
            {/* Avatar Skeleton */}
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />

            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between">
                {/* Title Skeleton */}
                <Skeleton className="h-3.5 w-28 rounded" />
                {/* Time Skeleton */}
                <Skeleton className="h-3 w-10 rounded" />
              </div>
              {/* Message Preview Skeleton */}
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#9CA3AF]">
        <MessageSquareDashed className="w-9 h-9 mb-2 text-[#CBD5E1]" />
        <p className="text-xs font-medium">No conversations found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto py-1 space-y-0.5 custom-scrollbar">
      {conversations.map((conv) => (
        <ConversationItem
          key={conv.id}
          conversation={conv}
          isActive={conv.id === activeConversationId}
          onClick={() => onSelectConversation(conv.id)}
        />
      ))}
    </div>
  );
};
