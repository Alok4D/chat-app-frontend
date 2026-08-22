"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage, setConversations, updateUserStatus } from "@/redux/slices/chatSlice";
import { APP_CONFIG } from "@/lib/constants/config";
import { mapMessage } from "@/lib/api/messages.api";
import { conversationsApi } from "@/redux/features/conversations/conversationsApi";
import { playNotificationSound } from "@/lib/utils/sound";
import toast from "react-hot-toast";

export function useRealtimeMessages() {
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null);
  const currentUser = useAppSelector((state) => state.auth.user);
  const conversations = useAppSelector((state) => state.chat.conversations);
  const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);

  useEffect(() => {
    if (!currentUser) return;

    if (!APP_CONFIG.enableMock) {
      const socket = io(APP_CONFIG.socketUrl, {
        auth: { token: localStorage.getItem("auth_token") },
        transports: ["websocket"],
      });

      socketRef.current = socket;

      // Live event: message:new
      socket.on("message:new", (apiMessage: any) => {
        const conv = conversations.find(
          (c) => c.id === apiMessage.conversation
        );
        const participants = conv ? conv.participants : [];
        const mapped = mapMessage(apiMessage, participants);
        dispatch(addMessage(mapped));

        // Play incoming notification chime if message is from another user
        const senderId = apiMessage.sender;
        if (senderId && senderId !== currentUser.id) {
          playNotificationSound();

          // If message is in another conversation, show a notification toast
          if (activeConversationId !== apiMessage.conversation) {
            const senderName = mapped.sender?.name || "Someone";
            const convName = conv?.name ? `${conv.name} (${senderName})` : senderName;
            toast(
              `${convName}: ${mapped.content.length > 35 ? mapped.content.slice(0, 35) + "..." : mapped.content}`,
              {
                icon: "💬",
                duration: 4000,
              }
            );
          }
        }
      });

      // Live event: conversation:updated
      socket.on("conversation:updated", async () => {
        try {
          const list = await dispatch(
            conversationsApi.endpoints.getConversations.initiate(undefined, { forceRefetch: true })
          ).unwrap();
          dispatch(setConversations(list));
        } catch (e) {
          console.error("Failed to sync conversations on websocket update:", e);
        }
      });

      // Status indicator update
      socket.on("user:status", (data: { userId: string; isOnline: boolean; lastSeen?: string }) => {
        dispatch(updateUserStatus(data));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [currentUser, conversations, activeConversationId, dispatch]);

  return {
    socket: socketRef.current,
  };
}
