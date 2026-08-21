import { apiClient } from "./client";
import { User, UserFilterParams } from "@/types/user";
import { APP_CONFIG } from "../constants/config";
import { mapUser } from "./auth.api";

export const usersApi = {
  async getUsers(params?: UserFilterParams): Promise<User[]> {
    if (APP_CONFIG.enableMock) {
      return [];
    }

    const searchTerm = params?.search || "";
    if (!searchTerm.trim()) {
      return []; // Return empty if search query is empty to avoid fetching all
    }

    const response = await apiClient.get<any[]>(`/users/search?q=${encodeURIComponent(searchTerm)}`);
    return (response.data || []).map(mapUser);
  },

  async getUserById(id: string): Promise<User | null> {
    if (APP_CONFIG.enableMock) {
      return null;
    }
    try {
      // In the backend, there is no direct /users/:id endpoint, but we can search for them or return them.
      // We can fallback to user search or just map a raw user if details are provided.
      const response = await apiClient.get<any[]>(`/users/search?q=${encodeURIComponent(id)}`);
      const matched = response.data?.find((u: any) => u._id === id || u.id === id);
      return matched ? mapUser(matched) : null;
    } catch {
      return null;
    }
  },
};
