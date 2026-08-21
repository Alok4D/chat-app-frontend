"use client";

import React from "react";
import { Conversation } from "@/types/conversation";
import { ConversationItem } from "./ConversationItem";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";
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
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <LoadingSpinner size="md" label="Loading chats..." />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#94A3B8] bg-white">
        <MessageSquareDashed className="w-9 h-9 mb-2 text-[#CBD5E1]" />
        <p className="text-xs font-medium">No conversations found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto py-2 space-y-0.5 custom-scrollbar bg-white">
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
