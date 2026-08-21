import { User } from "./user";

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed";
export type MessageContentType = "text";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  content: string;
  contentType: MessageContentType;
  status: MessageStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface SendMessagePayload {
  conversationId: string;
  content: string;
  contentType?: MessageContentType;
}
