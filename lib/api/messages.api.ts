import { apiClient } from "./client";
import { Message, SendMessagePayload } from "@/types/message";
import { MOCK_CURRENT_USER } from "./auth.api";
import { MOCK_USERS } from "./users.api";
import { MOCK_CONVERSATIONS } from "./conversations.api";
import { APP_CONFIG } from "../constants/config";

const INITIAL_MESSAGES: Record<string, Message[]> = {
  "conv-001": [
    {
      id: "m-001",
      conversationId: "conv-001",
      senderId: MOCK_CURRENT_USER.id,
      content: "Hi Sarah! Have you checked the new design mockup for the chat layout?",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    },
    {
      id: "m-002",
      conversationId: "conv-001",
      senderId: MOCK_USERS[0].id,
      sender: MOCK_USERS[0],
      content: "Yes! The glassmorphism accents and dark mode contrast are looking super clean.",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    },
    {
      id: "m-003",
      conversationId: "conv-001",
      senderId: MOCK_CURRENT_USER.id,
      content: "Awesome! I'm adding typing indicators and smooth auto-scroll hooks as well.",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    },
    {
      id: "m-004",
      conversationId: "conv-001",
      senderId: MOCK_USERS[0].id,
      sender: MOCK_USERS[0],
      content: "Hey Alex! Just checked out the new design system components. They look pristine! 🌟",
      contentType: "text",
      status: "delivered",
      reactions: [{ emoji: "🔥", count: 2, users: [MOCK_CURRENT_USER.id, MOCK_USERS[0].id] }],
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ],
  "conv-002": [
    {
      id: "m-101",
      conversationId: "conv-002",
      senderId: MOCK_USERS[0].id,
      sender: MOCK_USERS[0],
      content: "Team, we should align on the real-time websocket packet schemas.",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    },
    {
      id: "m-102",
      conversationId: "conv-002",
      senderId: MOCK_USERS[1].id,
      sender: MOCK_USERS[1],
      content: "Agreed. I have documented the events: 'message:send', 'typing:start', 'user:status'.",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
    {
      id: "m-103",
      conversationId: "conv-002",
      senderId: MOCK_CURRENT_USER.id,
      content: "Great, I will ensure Redux state updates optimistically upon emit.",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    },
    {
      id: "m-104",
      conversationId: "conv-002",
      senderId: MOCK_USERS[1].id,
      sender: MOCK_USERS[1],
      content: "Marcus: We'll push the real-time websocket microservice updates by EOD.",
      contentType: "text",
      status: "read",
      createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    },
  ],
};

const mockMessageStore: Record<string, Message[]> = { ...INITIAL_MESSAGES };

export const messagesApi = {
  async getMessages(conversationId: string): Promise<Message[]> {
    if (APP_CONFIG.enableMock) {
      await new Promise((res) => setTimeout(res, 180));
      return mockMessageStore[conversationId] || [];
    }

    const response = await apiClient.get<Message[]>(`/conversations/${conversationId}/messages`);
    return response.data;
  },

  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    if (APP_CONFIG.enableMock) {
      await new Promise((res) => setTimeout(res, 200));
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId: payload.conversationId,
        senderId: MOCK_CURRENT_USER.id,
        content: payload.content,
        contentType: payload.contentType || "text",
        attachments: payload.attachments,
        replyToId: payload.replyToId,
        status: "sent",
        createdAt: new Date().toISOString(),
      };

      if (!mockMessageStore[payload.conversationId]) {
        mockMessageStore[payload.conversationId] = [];
      }
      mockMessageStore[payload.conversationId].push(newMessage);

      // Update last message in mock conversation
      const conv = MOCK_CONVERSATIONS.find((c) => c.id === payload.conversationId);
      if (conv) {
        conv.lastMessage = newMessage;
        conv.updatedAt = newMessage.createdAt;
      }

      return newMessage;
    }

    const response = await apiClient.post<Message>(
      `/conversations/${payload.conversationId}/messages`,
      payload
    );
    return response.data;
  },

  async reactToMessage(messageId: string, emoji: string): Promise<void> {
    if (APP_CONFIG.enableMock) {
      for (const convId of Object.keys(mockMessageStore)) {
        const msg = mockMessageStore[convId].find((m) => m.id === messageId);
        if (msg) {
          if (!msg.reactions) msg.reactions = [];
          const existing = msg.reactions.find((r) => r.emoji === emoji);
          if (existing) {
            if (!existing.users.includes(MOCK_CURRENT_USER.id)) {
              existing.users.push(MOCK_CURRENT_USER.id);
              existing.count += 1;
            }
          } else {
            msg.reactions.push({ emoji, count: 1, users: [MOCK_CURRENT_USER.id] });
          }
          break;
        }
      }
      return;
    }
    await apiClient.post(`/messages/${messageId}/reactions`, { emoji });
  },
};
