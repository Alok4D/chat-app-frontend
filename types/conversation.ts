import { User } from "./user";
import { Message } from "./message";

export type ConversationType = "direct" | "group";

export interface Conversation {
  id: string;
  type: ConversationType;
  name?: string;
  avatarUrl?: string;
  description?: string;
  participants: User[];
  admins?: string[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned?: boolean;
  isMuted?: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationFilterParams {
  type?: ConversationType | "all";
  search?: string;
}
