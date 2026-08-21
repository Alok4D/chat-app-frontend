import { baseApi } from "@/redux/api/baseApi";
import { Message, SendMessagePayload } from "@/types/message";
import { mapMessage } from "@/lib/api/messages.api";

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], string>({
      query: (conversationId) => `/conversations/${conversationId}/messages`,
      transformResponse: (response: any) => {
        const rawMessages = response.messages || response.data || (Array.isArray(response) ? response : []);
        return rawMessages.map((m: any) => mapMessage(m));
      },
      providesTags: (_result, _error, conversationId) => [
        { type: "Messages", id: conversationId },
      ],
    }),

    sendMessage: builder.mutation<Message, SendMessagePayload>({
      query: (payload) => ({
        url: "/messages",
        method: "POST",
        body: {
          conversationId: payload.conversationId,
          text: payload.content,
        },
      }),
      transformResponse: (response: any) => {
        const raw = response.data || response;
        return mapMessage(raw);
      },
      invalidatesTags: (_result, _error, payload) => [
        { type: "Messages", id: payload.conversationId },
        { type: "Conversations", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApi;
