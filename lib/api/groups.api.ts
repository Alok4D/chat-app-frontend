import { apiClient } from "./client";
import { CreateGroupPayload, GroupDetails, UpdateGroupPayload } from "@/types/group";
import { Conversation } from "@/types/conversation";
import { MOCK_USERS } from "./users.api";
import { MOCK_CURRENT_USER } from "./auth.api";
import { MOCK_CONVERSATIONS } from "./conversations.api";
import { APP_CONFIG } from "../constants/config";

export const groupsApi = {
  async createGroup(payload: CreateGroupPayload): Promise<Conversation> {
    if (APP_CONFIG.enableMock) {
      await new Promise((res) => setTimeout(res, 300));
      const selectedUsers = MOCK_USERS.filter((u) => payload.participantIds.includes(u.id));
      const newGroupConv: Conversation = {
        id: `conv-group-${Date.now()}`,
        type: "group",
        name: payload.name,
        description: payload.description || "",
        avatarUrl:
          payload.avatarUrl ||
          `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80`,
        participants: [MOCK_CURRENT_USER, ...selectedUsers],
        unreadCount: 0,
        createdBy: MOCK_CURRENT_USER.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastMessage: {
          id: `msg-init-${Date.now()}`,
          conversationId: `conv-group-${Date.now()}`,
          senderId: MOCK_CURRENT_USER.id,
          content: `${MOCK_CURRENT_USER.name} created the group "${payload.name}"`,
          contentType: "text",
          status: "read",
          createdAt: new Date().toISOString(),
        },
      };

      MOCK_CONVERSATIONS.unshift(newGroupConv);
      return newGroupConv;
    }

    const response = await apiClient.post<Conversation>("/groups", payload);
    return response.data;
  },

  async getGroupDetails(groupId: string): Promise<GroupDetails> {
    if (APP_CONFIG.enableMock) {
      const conv = MOCK_CONVERSATIONS.find((c) => c.id === groupId);
      if (!conv) throw new Error("Group not found");
      return {
        id: conv.id,
        name: conv.name || "Group",
        description: conv.description,
        avatarUrl: conv.avatarUrl,
        adminIds: [MOCK_CURRENT_USER.id],
        members: conv.participants.map((p: any, idx: number) => ({
          ...p,
          role: idx === 0 ? "admin" : "member",
          joinedAt: conv.createdAt,
        })),
        createdAt: conv.createdAt,
      };
    }

    const response = await apiClient.get<GroupDetails>(`/groups/${groupId}`);
    return response.data;
  },

  async updateGroup(payload: UpdateGroupPayload): Promise<Conversation> {
    if (APP_CONFIG.enableMock) {
      const conv = MOCK_CONVERSATIONS.find((c) => c.id === payload.id);
      if (!conv) throw new Error("Group not found");
      if (payload.name) conv.name = payload.name;
      if (payload.description !== undefined) conv.description = payload.description;
      if (payload.avatarUrl) conv.avatarUrl = payload.avatarUrl;
      return conv;
    }

    const response = await apiClient.put<Conversation>(`/groups/${payload.id}`, payload);
    return response.data;
  },
};
