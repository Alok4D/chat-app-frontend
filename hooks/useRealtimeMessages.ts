"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage, setConversations, setTyping, updateUserStatus } from "@/store/chat.store";
import { APP_CONFIG } from "@/lib/constants/config";
import { mapMessage } from "@/lib/api/messages.api";
import { conversationsApi } from "@/lib/api/conversations.api";

export function useRealtimeMessages() {
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null);
  const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);
  const currentUser = useAppSelector((state) => state.auth.user);
  const conversations = useAppSelector((state) => state.chat.conversations);

  useEffect(() => {
    if (!currentUser) return;

    if (!APP_CONFIG.enableMock) {
      const socket = io(APP_CONFIG.socketUrl, {
        auth: { token: localStorage.getItem("auth_token") },
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("WebSocket connected cleanly");
      });

      // Live event: message:new
      socket.on("message:new", (apiMessage: any) => {
        const conv = conversations.find(
          (c) => c.id === apiMessage.conversation
        );
        const participants = conv ? conv.participants : [];
        const mapped = mapMessage(apiMessage, participants);
        dispatch(addMessage(mapped));
      });

      // Live event: conversation:updated
      socket.on("conversation:updated", async () => {
        try {
          const list = await conversationsApi.getConversations();
          dispatch(setConversations(list));
        } catch (e) {
          console.error("Failed to sync conversations on websocket update:", e);
        }
      });

      // Optional status indicators fallback
      socket.on("user:status", (data: { userId: string; isOnline: boolean; lastSeen?: string }) => {
        dispatch(updateUserStatus(data));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [currentUser, conversations, dispatch]);

  const sendTypingEvent = (isTyping: boolean) => {
    if (socketRef.current && activeConversationId && currentUser) {
      socketRef.current.emit("typing", {
        conversationId: activeConversationId,
        userId: currentUser.id,
        userName: currentUser.name,
        isTyping,
      });
    }
  };

  return {
    socket: socketRef.current,
    sendTypingEvent,
  };
}
