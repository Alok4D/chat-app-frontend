import { apiClient } from "./client";
import { User, UserFilterParams } from "@/types/user";
import { APP_CONFIG } from "../constants/config";

export const MOCK_USERS: User[] = [
  {
    id: "user-002",
    name: "Sarah Chen",
    phone: "+1 555-0102",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    statusMessage: "Product Designer @ Figma ✨",
    isOnline: true,
    customStatus: "available",
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "user-003",
    name: "Marcus Vance",
    phone: "+1 555-0103",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    statusMessage: "In a meeting until 4 PM 📊",
    isOnline: true,
    customStatus: "busy",
    createdAt: "2024-01-12T10:00:00Z",
  },
  {
    id: "user-004",
    name: "Elena Rostova",
    phone: "+1 555-0104",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    statusMessage: "Exploring next-gen LLM workflows 🤖",
    isOnline: false,
    lastSeen: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    customStatus: "offline",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-005",
    name: "David Kim",
    phone: "+1 555-0105",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    statusMessage: "Coding in Rust & TypeScript ⚡",
    isOnline: true,
    customStatus: "available",
    createdAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "user-006",
    name: "Sophia Martinez",
    phone: "+1 555-0106",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    statusMessage: "Away for lunch 🍜",
    isOnline: false,
    lastSeen: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    customStatus: "away",
    createdAt: "2024-01-20T10:00:00Z",
  },
];

export const usersApi = {
  async getUsers(params?: UserFilterParams): Promise<User[]> {
    if (APP_CONFIG.enableMock) {
      await new Promise((res) => setTimeout(res, 150));
      let list = [...MOCK_USERS];
      if (params?.search) {
        const query = params.search.toLowerCase();
        list = list.filter(
          (u) =>
            u.name.toLowerCase().includes(query) ||
            u.phone.includes(query) ||
            u.statusMessage?.toLowerCase().includes(query)
        );
      }
      if (params?.onlineOnly) {
        list = list.filter((u) => u.isOnline);
      }
      return list;
    }

    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.onlineOnly) query.set("onlineOnly", "true");

    const response = await apiClient.get<User[]>(`/users?${query.toString()}`);
    return response.data;
  },

  async getUserById(id: string): Promise<User | null> {
    if (APP_CONFIG.enableMock) {
      const user = MOCK_USERS.find((u) => u.id === id) || null;
      return user;
    }
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },
};
