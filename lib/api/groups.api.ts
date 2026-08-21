import { apiClient } from "./client";
import { CreateGroupPayload, GroupDetails, UpdateGroupPayload } from "@/types/group";
import { Conversation } from "@/types/conversation";
import { APP_CONFIG } from "../constants/config";
import { mapConversation } from "./conversations.api";

export const groupsApi = {
  async createGroup(payload: CreateGroupPayload): Promise<Conversation> {
    if (APP_CONFIG.enableMock) {
      throw new Error("Mock group creation not supported");
    }

    const currentStoredUser = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
    const currentUserId = currentStoredUser ? JSON.parse(currentStoredUser).id : "";

    // The live endpoint is POST /conversations/group
    const response = await apiClient.post<any>("/conversations/group", {
      name: payload.name,
      participantIds: payload.participantIds,
    });

    return mapConversation(response.data, currentUserId);
  },

  async getGroupDetails(groupId: string): Promise<GroupDetails> {
    if (APP_CONFIG.enableMock) {
      throw new Error("Mock group details not supported");
    }

    // Since there's no direct GET /conversations/:id/details, we retrieve from conversation list
    const conversationsRes = await apiClient.get<any>("/conversations");
    const rawConversations = conversationsRes.data?.data || [];
    const conv = rawConversations.find((c: any) => c._id === groupId || c.id === groupId);
    
    if (!conv) {
      throw new Error("Group conversation not found");
    }

    const mappedConv = mapConversation(conv, "");
    
    const adminIds = conv.admins || [];
    const members = mappedConv.participants.map((p) => ({
      ...p,
      role: adminIds.includes(p.id) ? ("admin" as const) : ("member" as const),
      joinedAt: mappedConv.createdAt,
    }));

    return {
      id: mappedConv.id,
      name: mappedConv.name || "Group Chat",
      description: mappedConv.description,
      avatarUrl: mappedConv.avatarUrl,
      adminIds,
      members,
      createdAt: mappedConv.createdAt,
    };
  },

  async updateGroup(payload: UpdateGroupPayload): Promise<Conversation> {
    if (APP_CONFIG.enableMock) {
      throw new Error("Mock group update not supported");
    }

    const currentStoredUser = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
    const currentUserId = currentStoredUser ? JSON.parse(currentStoredUser).id : "";

    // Live endpoint: PATCH /conversations/:id
    const response = await apiClient.patch<any>(`/conversations/${payload.id}`, {
      name: payload.name,
    });

    return mapConversation(response.data, currentUserId);
  },

  async addParticipants(groupId: string, userIds: string[]): Promise<any> {
    const response = await apiClient.post<any>(`/conversations/${groupId}/participants`, { userIds });
    return response.data;
  },

  async removeParticipant(groupId: string, userId: string): Promise<any> {
    const response = await apiClient.delete<any>(`/conversations/${groupId}/participants/${userId}`);
    return response.data;
  },

  async promoteToAdmin(groupId: string, userId: string): Promise<any> {
    const response = await apiClient.post<any>(`/conversations/${groupId}/admins`, { userId });
    return response.data;
  },
};
