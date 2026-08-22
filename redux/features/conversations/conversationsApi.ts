import { baseApi } from "@/redux/api/baseApi";
import { Conversation, ConversationFilterParams } from "@/types/conversation";
import { mapConversation } from "@/lib/api/conversations.api";

export const conversationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[], ConversationFilterParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.set("search", params.search);
        if (params?.type && params.type !== "all") queryParams.set("type", params.type);
        const queryStr = queryParams.toString();
        return `/conversations${queryStr ? `?${queryStr}` : ""}`;
      },
      transformResponse: (response: any) => {
        const currentStoredUser = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
        const currentUserId = currentStoredUser ? JSON.parse(currentStoredUser).id : "";
        const rawList = Array.isArray(response) ? response : response.data || [];
        return rawList.map((c: any) => mapConversation(c, currentUserId));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Conversations" as const, id })),
              { type: "Conversations", id: "LIST" },
            ]
          : [{ type: "Conversations", id: "LIST" }],
    }),

    createDirectConversation: builder.mutation<Conversation, string>({
      query: (userId) => ({
        url: "/conversations",
        method: "POST",
        body: { userId },
      }),
      transformResponse: (response: any) => {
        const currentStoredUser = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
        const currentUserId = currentStoredUser ? JSON.parse(currentStoredUser).id : "";
        const raw = response.data || response;
        return mapConversation(raw, currentUserId);
      },
      invalidatesTags: [{ type: "Conversations", id: "LIST" }],
    }),

    markAsRead: builder.mutation<void, string>({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}`,
        method: "GET",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Conversations", id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetConversationsQuery,
  useCreateDirectConversationMutation,
  useMarkAsReadMutation,
} = conversationsApi;
