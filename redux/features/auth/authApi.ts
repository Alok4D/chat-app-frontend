import { baseApi } from "@/redux/api/baseApi";
import { LoginCredentials, AuthResponse, AuthUser } from "@/types/auth";
import { mapUser } from "@/lib/api/auth.api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any) => {
        const raw = response.data || response;
        const user = mapUser(raw.user || raw);
        const token = raw.token || "";
        return { user, token };
      },
      invalidatesTags: ["Auth", "Conversations"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "Conversations", "Messages"],
    }),

    getMe: builder.query<AuthUser, void>({
      query: () => "/auth/me",
      transformResponse: (response: any) => {
        const raw = response.data || response;
        return mapUser(raw);
      },
      providesTags: ["Auth"],
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;
