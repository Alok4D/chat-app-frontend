"use client";

import React from "react";
import { Message } from "@/types/message";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useAppSelector } from "@/store/hooks";

export interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onReact?: (messageId: string, emoji: string) => void;
  onReply?: (message: Message) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading = false,
  onReact,
  onReply,
}) => {
  const currentUser = useAppSelector((s) => s.auth.user);
  const activeConversationId = useAppSelector((s) => s.chat.activeConversationId);
  const typingUsers = useAppSelector((s) => s.chat.typingUsers);

  const scrollRef = useAutoScroll<HTMLDivElement>([messages.length, typingUsers.length]);

  const activeTypingUser = typingUsers.find(
    (t) => t.conversationId === activeConversationId && t.userId !== currentUser?.id
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading messages..." />
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-slate-950/40"
    >
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
          <p className="text-xs">No messages yet. Send a message to start the conversation! 👋</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUser?.id}
            onReact={onReact}
            onReply={onReply}
          />
        ))
      )}

      {activeTypingUser && (
        <div className="py-2">
          <TypingIndicator userName={activeTypingUser.userName} />
        </div>
      )}
    </div>
  );
};
