import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "@/types/conversation";
import { Message } from "@/types/message";
import { User } from "@/types/user";

interface TypingUser {
  conversationId: string;
  userId: string;
  userName: string;
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Record<string, Message[]>; // keyed by conversationId
  typingUsers: TypingUser[];
  users: User[];
  searchQuery: string;
  filterType: "all" | "direct" | "group";
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isCreateGroupModalOpen: boolean;
  isMobileSidebarOpen: boolean;
  replyToMessage: Message | null;
}

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  messages: {},
  typingUsers: [],
  users: [],
  searchQuery: "",
  filterType: "all",
  isLoadingConversations: false,
  isLoadingMessages: false,
  isCreateGroupModalOpen: false,
  isMobileSidebarOpen: true,
  replyToMessage: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations(state, action: PayloadAction<Conversation[]>) {
      state.conversations = action.payload;
    },
    addConversation(state, action: PayloadAction<Conversation>) {
      const exists = state.conversations.some((c) => c.id === action.payload.id);
      if (!exists) {
        state.conversations.unshift(action.payload);
      }
    },
    setActiveConversationId(state, action: PayloadAction<string | null>) {
      state.activeConversationId = action.payload;
      // Mark as read in local state
      if (action.payload) {
        const conv = state.conversations.find((c) => c.id === action.payload);
        if (conv) conv.unreadCount = 0;
      }
    },
    setMessages(
      state,
      action: PayloadAction<{ conversationId: string; messages: Message[] }>
    ) {
      state.messages[action.payload.conversationId] = action.payload.messages;
    },
    addMessage(state, action: PayloadAction<Message>) {
      const convId = action.payload.conversationId;
      if (!state.messages[convId]) {
        state.messages[convId] = [];
      }
      // avoid duplicates
      const exists = state.messages[convId].some((m) => m.id === action.payload.id);
      if (!exists) {
        state.messages[convId].push(action.payload);
      }

      // Update conversation lastMessage & move to top
      const convIdx = state.conversations.findIndex((c) => c.id === convId);
      if (convIdx !== -1) {
        const updatedConv = {
          ...state.conversations[convIdx],
          lastMessage: action.payload,
          updatedAt: action.payload.createdAt,
          unreadCount:
            state.activeConversationId === convId
              ? 0
              : state.conversations[convIdx].unreadCount + 1,
        };
        state.conversations.splice(convIdx, 1);
        state.conversations.unshift(updatedConv);
      }
    },
    addReaction(
      state,
      action: PayloadAction<{ messageId: string; conversationId: string; emoji: string; userId: string }>
    ) {
      const { messageId, conversationId, emoji, userId } = action.payload;
      const msgs = state.messages[conversationId];
      if (msgs) {
        const msg = msgs.find((m) => m.id === messageId);
        if (msg) {
          if (!msg.reactions) msg.reactions = [];
          const reaction = msg.reactions.find((r) => r.emoji === emoji);
          if (reaction) {
            if (!reaction.users.includes(userId)) {
              reaction.users.push(userId);
              reaction.count += 1;
            }
          } else {
            msg.reactions.push({ emoji, count: 1, users: [userId] });
          }
        }
      }
    },
    setTyping(
      state,
      action: PayloadAction<{ conversationId: string; userId: string; userName: string; isTyping: boolean }>
    ) {
      const { conversationId, userId, userName, isTyping } = action.payload;
      if (isTyping) {
        const exists = state.typingUsers.some(
          (t) => t.conversationId === conversationId && t.userId === userId
        );
        if (!exists) {
          state.typingUsers.push({ conversationId, userId, userName });
        }
      } else {
        state.typingUsers = state.typingUsers.filter(
          (t) => !(t.conversationId === conversationId && t.userId === userId)
        );
      }
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    updateUserStatus(
      state,
      action: PayloadAction<{ userId: string; isOnline: boolean; lastSeen?: string }>
    ) {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        user.isOnline = action.payload.isOnline;
        if (action.payload.lastSeen) user.lastSeen = action.payload.lastSeen;
      }
      // Update in conversations as well
      state.conversations.forEach((conv) => {
        const p = conv.participants.find((part) => part.id === action.payload.userId);
        if (p) {
          p.isOnline = action.payload.isOnline;
          if (action.payload.lastSeen) p.lastSeen = action.payload.lastSeen;
        }
      });
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setFilterType(state, action: PayloadAction<"all" | "direct" | "group">) {
      state.filterType = action.payload;
    },
    setIsLoadingConversations(state, action: PayloadAction<boolean>) {
      state.isLoadingConversations = action.payload;
    },
    setIsLoadingMessages(state, action: PayloadAction<boolean>) {
      state.isLoadingMessages = action.payload;
    },
    setIsCreateGroupModalOpen(state, action: PayloadAction<boolean>) {
      state.isCreateGroupModalOpen = action.payload;
    },
    setIsMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isMobileSidebarOpen = action.payload;
    },
    setReplyToMessage(state, action: PayloadAction<Message | null>) {
      state.replyToMessage = action.payload;
    },
  },
});

export const {
  setConversations,
  addConversation,
  setActiveConversationId,
  setMessages,
  addMessage,
  addReaction,
  setTyping,
  setUsers,
  updateUserStatus,
  setSearchQuery,
  setFilterType,
  setIsLoadingConversations,
  setIsLoadingMessages,
  setIsCreateGroupModalOpen,
  setIsMobileSidebarOpen,
  setReplyToMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
