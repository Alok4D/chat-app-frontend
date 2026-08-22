import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "@/types/conversation";
import { Message } from "@/types/message";
import { User } from "@/types/user";

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Record<string, Message[]>; // keyed by conversationId
  users: User[];
  searchQuery: string;
  filterType: "all" | "direct" | "group";
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isCreateGroupModalOpen: boolean;
  isMobileSidebarOpen: boolean;
  isInfoPanelOpen: boolean;
}

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  messages: {},
  users: [],
  searchQuery: "",
  filterType: "all",
  isLoadingConversations: false,
  isLoadingMessages: false,
  isCreateGroupModalOpen: false,
  isMobileSidebarOpen: true,
  isInfoPanelOpen: false,
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
      if (action.payload) {
        const conv = state.conversations.find((c) => c.id === action.payload);
        if (conv) conv.unreadCount = 0;
      }
    },
    setMessages(
      state,
      action: PayloadAction<{ conversationId: string; messages: Message[] }>
    ) {
      const conv = state.conversations.find((c) => c.id === action.payload.conversationId);
      const participants = conv ? conv.participants : [];

      const enrichedMessages = action.payload.messages.map((m) => {
        if (!m.sender || m.sender.name === "User") {
          const participant = participants.find((p) => p.id === m.senderId);
          if (participant) {
            return { ...m, sender: participant };
          }
        }
        return m;
      });

      state.messages[action.payload.conversationId] = enrichedMessages.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    },
    addMessage(state, action: PayloadAction<Message>) {
      const convId = action.payload.conversationId;
      if (!state.messages[convId]) {
        state.messages[convId] = [];
      }
      const conv = state.conversations.find((c) => c.id === convId);
      const participants = conv ? conv.participants : [];
      let msg = action.payload;

      if (!msg.sender || msg.sender.name === "User") {
        const participant = participants.find((p) => p.id === msg.senderId);
        if (participant) {
          msg = { ...msg, sender: participant };
        }
      }

      const exists = state.messages[convId].some((m) => m.id === msg.id);
      if (!exists) {
        state.messages[convId].push(msg);
        state.messages[convId].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      // Update conversation lastMessage & move to top
      const convIdx = state.conversations.findIndex((c) => c.id === convId);
      if (convIdx !== -1) {
        const updatedConv = {
          ...state.conversations[convIdx],
          lastMessage: msg,
          updatedAt: msg.createdAt,
          unreadCount:
            state.activeConversationId === convId
              ? 0
              : state.conversations[convIdx].unreadCount + 1,
        };
        state.conversations.splice(convIdx, 1);
        state.conversations.unshift(updatedConv);
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
    toggleMobileSidebar(state) {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen;
    },
    setIsInfoPanelOpen(state, action: PayloadAction<boolean>) {
      state.isInfoPanelOpen = action.payload;
    },
    toggleInfoPanel(state) {
      state.isInfoPanelOpen = !state.isInfoPanelOpen;
    },
  },
});

export const {
  setConversations,
  addConversation,
  setActiveConversationId,
  setMessages,
  addMessage,
  setUsers,
  updateUserStatus,
  setSearchQuery,
  setFilterType,
  setIsLoadingConversations,
  setIsLoadingMessages,
  setIsCreateGroupModalOpen,
  setIsMobileSidebarOpen,
  toggleMobileSidebar,
  setIsInfoPanelOpen,
  toggleInfoPanel,
} = chatSlice.actions;

export default chatSlice.reducer;
