export interface User {
  id: string;
  phone: string;
  name: string;
  avatarUrl?: string;
  statusMessage?: string;
  isOnline: boolean;
  lastSeen?: string;
  customStatus?: "available" | "busy" | "away" | "offline";
  createdAt: string;
}

export interface UserFilterParams {
  search?: string;
  onlineOnly?: boolean;
}
