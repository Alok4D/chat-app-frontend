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
    avatarUrl: apiUser.avatarUrl && !apiUser.avatarUrl.includes("dicebear") ? apiUser.avatarUrl : "",
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
        avatarUrl: "",
        statusMessage: "Using Chatter in Mock Mode",
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
    const data = response.data;
    const user = mapUser(data.user || data);
    const token = data.token;

    if (typeof window !== "undefined" && token) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
    }

    return { user, token };
  },

  async logout(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Error parsing stored auth_user:", e);
        }
      }
    }
    return null;
  },
};
