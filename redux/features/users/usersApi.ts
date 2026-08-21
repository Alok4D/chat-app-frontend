import { baseApi } from "@/redux/api/baseApi";
import { User, UserFilterParams } from "@/types/user";
import { mapUser } from "@/lib/api/auth.api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query<User[], string>({
      query: (search) => `/users/search?q=${encodeURIComponent(search)}`,
      transformResponse: (response: any) => {
        const rawList = Array.isArray(response) ? response : response.data || [];
        return rawList.map(mapUser);
      },
      providesTags: ["Users"],
    }),
  }),
  overrideExisting: true,
});

export const { useSearchUsersQuery, useLazySearchUsersQuery } = usersApi;
