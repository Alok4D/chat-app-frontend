import { apiClient } from "./client";
import { Message, SendMessagePayload } from "@/types/message";
import { APP_CONFIG } from "../constants/config";
import { mapUser } from "./auth.api";

export function mapMessage(apiMsg: any, participants: any[] = []): Message {
  if (!apiMsg) return null as any;
  const id = apiMsg.id || apiMsg._id;
  const senderId = apiMsg.sender;
  
  // Find sender object in participants list
  const senderUser = participants.find((p) => p.id === senderId || p._id === senderId);

  return {
    id,
    conversationId: apiMsg.conversation,
    senderId,
    sender: senderUser ? mapUser(senderUser) : {
      id: senderId,
      name: "User",
      phone: "",
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(senderId)}`,
      isOnline: false,
      createdAt: new Date().toISOString(),
    },
    content: apiMsg.text || "",
    contentType: "text",
    status: "read",
    createdAt: apiMsg.createdAt || new Date().toISOString(),
  };
}

export const messagesApi = {
  async getMessages(conversationId: string): Promise<Message[]> {
    if (APP_CONFIG.enableMock) {
      return [];
    }

    const conversationsRes = await apiClient.get<any>("/conversations");
    const rawConversations = conversationsRes.data?.data || [];
    const conversation = rawConversations.find(
      (c: any) => c._id === conversationId || c.id === conversationId
    );

    let participants: any[] = [];
    if (conversation) {
      participants = conversation.participants || [];
      if (conversation.participant) {
        participants = [conversation.participant];
      }
    }

    const response = await apiClient.get<any>(`/conversations/${conversationId}/messages`);
    const apiMessages = response.data?.messages || [];
    
    return apiMessages.map((m: any) => mapMessage(m, participants));
  },

  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    if (APP_CONFIG.enableMock) {
      throw new Error("Mock message sending not supported");
    }

    const response = await apiClient.post<any>("/messages", {
      conversationId: payload.conversationId,
      text: payload.content,
    });

    return mapMessage(response.data);
  },
};
