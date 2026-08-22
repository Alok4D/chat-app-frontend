import { apiClient } from "./client";
import { Conversation, ConversationFilterParams } from "@/types/conversation";
import { APP_CONFIG } from "../constants/config";
import { mapUser } from "./auth.api";
import { Message } from "@/types/message";

export function mapConversation(apiConv: any, currentUserId: string): Conversation {
  if (!apiConv) return null as any;
  const id = apiConv.id || apiConv._id;

  let participants = (apiConv.participants || []).map(mapUser);
  if (apiConv.participant) {
    participants = [mapUser(apiConv.participant)];
  }

  let lastMessage: Message | undefined;
  if (apiConv.lastMessage && apiConv.lastMessage.text !== undefined) {
    lastMessage = {
      id: apiConv.lastMessage._id || `last-msg-${id}`,
      conversationId: id,
      senderId: apiConv.lastMessage.sender,
      content: apiConv.lastMessage.text || "",
      contentType: "text",
      status: "read",
      createdAt: apiConv.lastMessage.createdAt || apiConv.updatedAt || new Date().toISOString(),
    };
  }

  // Ensure conversation has a default name if it is group and none is set
  const name = apiConv.name || (apiConv.type === "group" ? "Group Conversation" : undefined);

  return {
    id,
    type: apiConv.type || "direct",
    name,
    description: apiConv.description || "",
    participants,
    lastMessage,
    unreadCount: apiConv.unreadCount || 0,
    admins: apiConv.admins || (apiConv.createdBy ? [apiConv.createdBy] : []),
    createdBy: apiConv.createdBy,
    createdAt: apiConv.createdAt || new Date().toISOString(),
    updatedAt: apiConv.updatedAt || new Date().toISOString(),
  };
}

export const conversationsApi = {
  async getConversations(params?: ConversationFilterParams): Promise<Conversation[]> {
    if (APP_CONFIG.enableMock) {
      return [];
    }

    const currentStoredUser = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
    const currentUserId = currentStoredUser ? JSON.parse(currentStoredUser).id : "";

    // The backend lists conversations at GET /conversations
    const response = await apiClient.get<any>("/conversations");
    const rawList = response.data?.data || [];
    
    let list = rawList.map((c: any) => mapConversation(c, currentUserId));

    // Client-side filtering by type and search query
    if (params?.type && params.type !== "all") {
      list = list.filter((c: any) => c.type === params.type);
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter((c: any) => {
        if (c.type === "group") {
          return c.name?.toLowerCase().includes(q);
        }
        return c.participants.some((p: any) => p.name.toLowerCase().includes(q) || p.phone.includes(q));
      });
    }

    return list;
  },

  async getConversationById(id: string): Promise<Conversation | null> {
    if (APP_CONFIG.enableMock) {
      return null;
    }
    const currentStoredUser = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
    const currentUserId = currentStoredUser ? JSON.parse(currentStoredUser).id : "";

    // The backend does not have GET /conversations/:id directly in the routes list (or does it? yes, the swagger documents /conversations/{id}/messages and PATCH /conversations/{id}).
    // Let's fetch all and find the matching one, or call GET /conversations.
    const conversations = await this.getConversations();
    return conversations.find((c) => c.id === id) || null;
  },

  async createDirectConversation(userId: string): Promise<Conversation> {
    if (APP_CONFIG.enableMock) {
      throw new Error("Mock direct conversation not supported");
    }

    const currentStoredUser = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
    const currentUserId = currentStoredUser ? JSON.parse(currentStoredUser).id : "";

    // Start direct conversation: POST /conversations with { userId }
    const response = await apiClient.post<any>("/conversations", { userId });
    return mapConversation(response.data, currentUserId);
  },

  async markAsRead(conversationId: string): Promise<void> {
    if (APP_CONFIG.enableMock) {
      return;
    }
    // Note: Swagger doesn't list an explicit markAsRead PUT endpoint. Let's make it a no-op to prevent exceptions.
  },
};
