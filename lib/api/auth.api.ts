import { apiClient } from "./client";
import { AuthResponse, AuthUser, LoginCredentials } from "@/types/auth";
import { APP_CONFIG } from "../constants/config";

export function mapUser(apiUser: any): AuthUser {
  if (!apiUser) return null as any;
  const id = apiUser.id || apiUser._id;
  return {
    id,
    name: apiUser.name || "Unknown",
    phone: apiUser.phone || "",
    avatarUrl: apiUser.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(apiUser.name || id)}`,
    statusMessage: apiUser.statusMessage || "",
    isOnline: apiUser.isOnline !== undefined ? apiUser.isOnline : true,
    createdAt: apiUser.createdAt || new Date().toISOString(),
  };
}

export const authApi = {
  async login(credentials: LoginCredentials & { name?: string }): Promise<AuthResponse> {
    if (APP_CONFIG.enableMock) {
      await new Promise((res) => setTimeout(res, APP_CONFIG.mockDelayMs));
      const user: AuthUser = {
        id: "mock-user-001",
        name: credentials.name || "Alex Morgan",
        phone: credentials.phone,
        avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(credentials.name || "Alex")}`,
        statusMessage: "Using PulseChat in Mock Mode",
        isOnline: true,
        createdAt: new Date().toISOString(),
      };
      const token = "mock_jwt_token_" + Date.now();
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
      }
      return { user, token };
    }

    const payload = {
      phone: credentials.phone,
      name: credentials.name || "User",
    };

    const response = await apiClient.post<any>("/auth/login", payload);
    const mappedUser = mapUser(response.data.user);
    const token = response.data.token;

    if (token && typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(mappedUser));
    }

    return {
      user: mappedUser,
      token,
    };
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // ignore
        }
      }
    }

    if (APP_CONFIG.enableMock) {
      return null;
    }

    try {
      const response = await apiClient.get<any>("/auth/me");
      const mappedUser = mapUser(response.data);
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_user", JSON.stringify(mappedUser));
      }
      return mappedUser;
    } catch {
      return null;
    }
  },

  async logout(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  },
};
