import { apiClient } from "./client";
import { Conversation, ConversationFilterParams } from "@/types/conversation";
import { MOCK_USERS } from "./users.api";
import { MOCK_CURRENT_USER } from "./auth.api";
import { APP_CONFIG } from "../constants/config";

export let MOCK_CONVERSATIONS: any[] = [
  {
    id: "conv-001",
    type: "direct",
    participants: [MOCK_CURRENT_USER, MOCK_USERS[0]], // Sarah Chen
    unreadCount: 2,
    isPinned: true,
    lastMessage: {
      id: "msg-101",
      conversationId: "conv-001",
      senderId: MOCK_USERS[0].id,
      content: "Hey Alex! Just checked out the new design system components. They look pristine! 🌟",
      contentType: "text",
      status: "delivered",
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "conv-002",
    type: "group",
    name: "Design & Frontend Core",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    description: "Coordination between UI design and frontend architecture",
    participants: [MOCK_CURRENT_USER, MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[3]],
    unreadCount: 0,
    isPinned: true,
    lastMessage: {
      id: "msg-201",
      conversationId: "conv-002",
      senderId: MOCK_USERS[1].id,
      content: "Marcus: We'll push the real-time websocket microservice updates by EOD.",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    },
    createdAt: "2024-02-03T10:00:00Z",
    updatedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  },
  {
    id: "conv-003",
    type: "direct",
    participants: [MOCK_CURRENT_USER, MOCK_USERS[1]], // Marcus Vance
    unreadCount: 0,
    isPinned: false,
    lastMessage: {
      id: "msg-301",
      conversationId: "conv-003",
      senderId: MOCK_CURRENT_USER.id,
      content: "Got it, I will prepare the client-side event handlers.",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    },
    createdAt: "2024-02-05T12:00:00Z",
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: "conv-004",
    type: "direct",
    participants: [MOCK_CURRENT_USER, MOCK_USERS[2]], // Elena Rostova
    unreadCount: 1,
    isPinned: false,
    lastMessage: {
      id: "msg-401",
      conversationId: "conv-004",
      senderId: MOCK_USERS[2].id,
      content: "Sent over the benchmark comparison charts for the latency audit.",
      contentType: "text",
      status: "delivered",
      createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    },
    createdAt: "2024-02-06T14:00:00Z",
    updatedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    id: "conv-005",
    type: "direct",
    participants: [MOCK_CURRENT_USER, MOCK_USERS[3]], // David Kim
    unreadCount: 0,
    isPinned: false,
    lastMessage: {
      id: "msg-501",
      conversationId: "conv-005",
      senderId: MOCK_USERS[3].id,
      content: "Let me know when you're free for a quick code review.",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    createdAt: "2024-02-07T09:00:00Z",
    updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

export const conversationsApi = {
  async getConversations(params?: ConversationFilterParams): Promise<any[]> {
    if (APP_CONFIG.enableMock) {
      await new Promise((res) => setTimeout(res, 200));
      let list = [...MOCK_CONVERSATIONS];
      if (params?.type && params.type !== "all") {
        list = list.filter((c) => c.type === params.type);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter((c) => {
          if (c.type === "group") {
            return c.name?.toLowerCase().includes(q);
          }
          const other = c.participants.find((p: any) => p.id !== MOCK_CURRENT_USER.id);
          return other?.name.toLowerCase().includes(q) || other?.phone.includes(q);
        });
      }
      return list;
    }

    const query = new URLSearchParams();
    if (params?.type && params.type !== "all") query.set("type", params.type);
    if (params?.search) query.set("search", params.search);

    const response = await apiClient.get<any[]>(`/conversations?${query.toString()}`);
    return response.data;
  },

  async getConversationById(id: string): Promise<any | null> {
    if (APP_CONFIG.enableMock) {
      return MOCK_CONVERSATIONS.find((c) => c.id === id) || null;
    }
    const response = await apiClient.get<any>(`/conversations/${id}`);
    return response.data;
  },

  async createDirectConversation(userId: string): Promise<any> {
    if (APP_CONFIG.enableMock) {
      const existing = MOCK_CONVERSATIONS.find(
        (c) => c.type === "direct" && c.participants.some((p: any) => p.id === userId)
      );
      if (existing) return existing;

      const targetUser = MOCK_USERS.find((u) => u.id === userId);
      if (!targetUser) throw new Error("User not found");

      const newConv = {
        id: `conv-direct-${Date.now()}`,
        type: "direct" as const,
        participants: [MOCK_CURRENT_USER, targetUser],
        unreadCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      MOCK_CONVERSATIONS.unshift(newConv);
      return newConv;
    }

    const response = await apiClient.post<any>("/conversations/direct", { userId });
    return response.data;
  },

  async markAsRead(conversationId: string): Promise<void> {
    if (APP_CONFIG.enableMock) {
      const conv = MOCK_CONVERSATIONS.find((c) => c.id === conversationId);
      if (conv) conv.unreadCount = 0;
      return;
    }
    await apiClient.put(`/conversations/${conversationId}/read`);
  },
};
