export interface AuthUser {
  id: string;
  phone: string;
  name: string;
  avatarUrl?: string;
  statusMessage?: string;
  isOnline: boolean;
  lastSeen?: string;
  createdAt: string;
}

export interface LoginCredentials {
  phone: string;
  password?: string;
  otp?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
