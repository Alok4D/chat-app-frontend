import { apiClient, ApiResponse } from "./client";
import { AuthResponse, AuthUser, LoginCredentials } from "@/types/auth";
import { APP_CONFIG } from "../constants/config";

// Mock Current User
export const MOCK_CURRENT_USER: AuthUser = {
  id: "user-current-001",
  name: "Alex Morgan",
  phone: "+1 555-0199",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  statusMessage: "Building great conversational UX 🚀",
  isOnline: true,
  createdAt: new Date().toISOString(),
};

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (APP_CONFIG.enableMock) {
      await new Promise((res) => setTimeout(res, APP_CONFIG.mockDelayMs));
      const user = {
        ...MOCK_CURRENT_USER,
        phone: credentials.phone || MOCK_CURRENT_USER.phone,
      };
      const token = "mock_jwt_token_" + Date.now();
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
      }
      return {
        user,
        token,
      };
    }

    const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
    if (response.data?.token && typeof window !== "undefined") {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("auth_user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return MOCK_CURRENT_USER;
        }
      }
    }

    if (APP_CONFIG.enableMock) {
      return MOCK_CURRENT_USER;
    }

    try {
      const response = await apiClient.get<AuthUser>("/auth/me");
      return response.data;
    } catch {
      return null;
    }
  },

  async logout(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
    if (!APP_CONFIG.enableMock) {
      try {
        await apiClient.post("/auth/logout");
      } catch (e) {
        // ignore logout failure
      }
    }
  },
};
