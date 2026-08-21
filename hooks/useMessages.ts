"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setMessages,
  addMessage,
  addReaction,
  setIsLoadingMessages,
  setReplyToMessage,
} from "@/store/chat.store";
import { messagesApi } from "@/lib/api/messages.api";
import { SendMessagePayload, Message } from "@/types/message";
import toast from "react-hot-toast";

export function useMessages(conversationId?: string | null) {
  const dispatch = useAppDispatch();
  const currentConvId = conversationId || useAppSelector((s) => s.chat.activeConversationId);
  const messages = useAppSelector((s) => (currentConvId ? s.chat.messages[currentConvId] || [] : []));
  const isLoading = useAppSelector((s) => s.chat.isLoadingMessages);
  const replyTo = useAppSelector((s) => s.chat.replyToMessage);
  const currentUser = useAppSelector((s) => s.auth.user);

  const fetchMessages = useCallback(
    async (cId: string) => {
      dispatch(setIsLoadingMessages(true));
      try {
        const msgs = await messagesApi.getMessages(cId);
        dispatch(setMessages({ conversationId: cId, messages: msgs }));
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        dispatch(setIsLoadingMessages(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (currentConvId) {
      fetchMessages(currentConvId);
    }
  }, [currentConvId, fetchMessages]);

  const sendMessage = useCallback(
    async (payload: Omit<SendMessagePayload, "conversationId">) => {
      if (!currentConvId) return;

      try {
        const sentMsg = await messagesApi.sendMessage({
          ...payload,
          conversationId: currentConvId,
          replyToId: replyTo?.id,
        });

        dispatch(addMessage(sentMsg));
        dispatch(setReplyToMessage(null));

        // Trigger an automated mock reply if mock is active for realistic demo
        setTimeout(() => {
          const mockReplies = [
            "Sounds good! Let's ship it. 🚀",
            "Got it! I will review the updates now.",
            "That looks super clean! Great work.",
            "Thanks for the update! 💯",
          ];
          const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
          const replyMsg: Message = {
            id: `msg-reply-${Date.now()}`,
            conversationId: currentConvId,
            senderId: "user-002",
            content: randomReply,
            contentType: "text",
            status: "delivered",
            createdAt: new Date().toISOString(),
          };
          dispatch(addMessage(replyMsg));
        }, 1800);

        return sentMsg;
      } catch (error: any) {
        toast.error(error.message || "Failed to send message");
        throw error;
      }
    },
    [currentConvId, replyTo, dispatch]
  );

  const reactToMsg = useCallback(
    async (messageId: string, emoji: string) => {
      if (!currentConvId || !currentUser) return;
      dispatch(
        addReaction({
          messageId,
          conversationId: currentConvId,
          emoji,
          userId: currentUser.id,
        })
      );
      try {
        await messagesApi.reactToMessage(messageId, emoji);
      } catch {
        // silent fail for reaction mock
      }
    },
    [currentConvId, currentUser, dispatch]
  );

  return {
    messages,
    isLoading,
    replyTo,
    sendMessage,
    reactToMessage: reactToMsg,
    setReplyTo: (msg: Message | null) => dispatch(setReplyToMessage(msg)),
    refreshMessages: () => currentConvId && fetchMessages(currentConvId),
  };
}
