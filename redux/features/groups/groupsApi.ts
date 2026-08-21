import { baseApi } from "@/redux/api/baseApi";
import { CreateGroupPayload, UpdateGroupPayload, GroupDetails } from "@/types/group";
import { Conversation } from "@/types/conversation";
import { mapConversation } from "@/lib/api/conversations.api";

export const groupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<Conversation, CreateGroupPayload>({
      query: (payload) => ({
        url: "/conversations/group",
        method: "POST",
        body: {
          name: payload.name,
          participantIds: payload.participantIds,
        },
      }),
      transformResponse: (response: any) => {
        const currentStoredUser = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
        const currentUserId = currentStoredUser ? JSON.parse(currentStoredUser).id : "";
        const raw = response.data || response;
        return mapConversation(raw, currentUserId);
      },
      invalidatesTags: [{ type: "Conversations", id: "LIST" }],
    }),

    updateGroup: builder.mutation<Conversation, UpdateGroupPayload>({
      query: (payload) => ({
        url: `/conversations/${payload.id}`,
        method: "PATCH",
        body: { name: payload.name },
      }),
      transformResponse: (response: any) => {
        const currentStoredUser = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
        const currentUserId = currentStoredUser ? JSON.parse(currentStoredUser).id : "";
        const raw = response.data || response;
        return mapConversation(raw, currentUserId);
      },
      invalidatesTags: (_result, _error, payload) => [
        { type: "Conversations", id: payload.id },
        { type: "Conversations", id: "LIST" },
      ],
    }),

    addParticipants: builder.mutation<any, { groupId: string; userIds: string[] }>({
      query: ({ groupId, userIds }) => ({
        url: `/conversations/${groupId}/participants`,
        method: "POST",
        body: { userIds },
      }),
      invalidatesTags: (_result, _error, { groupId }) => [
        { type: "Conversations", id: groupId },
        { type: "Conversations", id: "LIST" },
      ],
    }),

    removeParticipant: builder.mutation<any, { groupId: string; userId: string }>({
      query: ({ groupId, userId }) => ({
        url: `/conversations/${groupId}/participants/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { groupId }) => [
        { type: "Conversations", id: groupId },
        { type: "Conversations", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useAddParticipantsMutation,
  useRemoveParticipantMutation,
} = groupsApi;
