import { User } from "./user";

export interface CreateGroupPayload {
  name: string;
  description?: string;
  avatarUrl?: string;
  participantIds: string[];
}

export interface UpdateGroupPayload {
  id: string;
  name?: string;
  description?: string;
  avatarUrl?: string;
}

export interface GroupMember extends User {
  role: "admin" | "member";
  joinedAt: string;
}

export interface GroupDetails {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  adminIds: string[];
  members: GroupMember[];
  createdAt: string;
}
