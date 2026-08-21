import { User } from "./user";

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed";
export type MessageContentType = "text" | "image" | "file" | "audio" | "video" | "location";

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[]; // user IDs
}

export interface MessageAttachment {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  thumbnailUrl?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  content: string;
  contentType: MessageContentType;
  attachments?: MessageAttachment[];
  status: MessageStatus;
  reactions?: MessageReaction[];
  replyToId?: string;
  replyTo?: {
    id: string;
    senderName: string;
    content: string;
  };
  isEdited?: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface SendMessagePayload {
  conversationId: string;
  content: string;
  contentType?: MessageContentType;
  attachments?: MessageAttachment[];
  replyToId?: string;
}
