"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setMessages,
  addMessage,
  setIsLoadingMessages,
} from "@/redux/slices/chatSlice";
import { messagesApi } from "@/redux/features/messages/messagesApi";
import { SendMessagePayload } from "@/types/message";
import { playSentSound } from "@/lib/utils/sound";
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
        const msgs = await dispatch(
          messagesApi.endpoints.getMessages.initiate(cId, { forceRefetch: true })
        ).unwrap();
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
        const sentMsg = await dispatch(
          messagesApi.endpoints.sendMessage.initiate({
            ...payload,
            conversationId: currentConvId,
          })
        ).unwrap();

        dispatch(addMessage(sentMsg));
        playSentSound();
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
