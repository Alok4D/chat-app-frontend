"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setMessages,
  addMessage,
  setIsLoadingMessages,
} from "@/store/chat.store";
import { messagesApi } from "@/lib/api/messages.api";
import { SendMessagePayload } from "@/types/message";
import toast from "react-hot-toast";

export function useMessages(conversationId?: string | null) {
  const dispatch = useAppDispatch();
  const currentConvId = conversationId || useAppSelector((s) => s.chat.activeConversationId);
  const messages = useAppSelector((s) => (currentConvId ? s.chat.messages[currentConvId] || [] : []));
  const isLoading = useAppSelector((s) => s.chat.isLoadingMessages);

  const fetchMessages = useCallback(
    async (cId: string) => {
      dispatch(setIsLoadingMessages(true));
      try {
        const msgs = await messagesApi.getMessages(cId);
        dispatch(setMessages({ conversationId: cId, messages: msgs }));
      } catch (error: any) {
        toast.error(error?.message || "Failed to load messages");
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
        });

        dispatch(addMessage(sentMsg));
        return sentMsg;
      } catch (error: any) {
        toast.error(error?.message || "Failed to send message");
        throw error;
      }
    },
    [currentConvId, dispatch]
  );

  return {
    messages,
    isLoading,
    sendMessage,
    refreshMessages: () => currentConvId && fetchMessages(currentConvId),
  };
}
