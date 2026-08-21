"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage, setTyping, updateUserStatus } from "@/store/chat.store";
import { APP_CONFIG } from "@/lib/constants/config";
import { Message } from "@/types/message";

export function useRealtimeMessages() {
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null);
  const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!currentUser) return;

    if (!APP_CONFIG.enableMock) {
      const socket = io(APP_CONFIG.socketUrl, {
        auth: { token: localStorage.getItem("auth_token") },
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Realtime socket connected");
      });

      socket.on("message:received", (message: Message) => {
        dispatch(addMessage(message));
      });

      socket.on("typing:update", (data: { conversationId: string; userId: string; userName: string; isTyping: boolean }) => {
        dispatch(setTyping(data));
      });

      socket.on("user:status", (data: { userId: string; isOnline: boolean; lastSeen?: string }) => {
        dispatch(updateUserStatus(data));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [currentUser, dispatch]);

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
