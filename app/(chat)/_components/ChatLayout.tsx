"use client";

import React, { useState, useEffect } from "react";
import { ChatSearch } from "./ChatSearch";
import { ConversationList } from "./ConversationList";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { EmptyChat } from "./EmptyChat";
import { ConversationInfo } from "./ConversationInfo";
import { CreateGroupModal } from "./group/CreateGroupModal";
import { Avatar } from "@/components/ui/Avatar";
import { useConversations } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsMobileSidebarOpen, setIsCreateGroupModalOpen } from "@/redux/slices/chatSlice";
import { usersApi } from "@/redux/features/users/usersApi";
import {
  MessageSquare,
  Users,
  User as UserIcon,
  Bell,
  Settings,
  SquarePen,
  X,
  UserPlus,
} from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import { User } from "@/types/user";

export const ChatLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();
  const {
    conversations,
    activeConversation,
    activeConversationId,
    selectConversation,
    startDirectConversation,
    searchQuery,
    isLoading,
  } = useConversations();
  const { messages, isLoading: isMessagesLoading, sendMessage } = useMessages();
  useRealtimeMessages();
  const isMobileSidebarOpen = useAppSelector((s) => s.chat.isMobileSidebarOpen);
  const isInfoPanelOpen = useAppSelector((s) => s.chat.isInfoPanelOpen);

  const [globalContacts, setGlobalContacts] = useState<User[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<"chat" | "groups" | "contacts" | "notifications" | "settings">("chat");

  useEffect(() => {
    if (!searchQuery.trim()) {
      setGlobalContacts([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      setLoadingContacts(true);
      try {
        const res = await dispatch(
          usersApi.endpoints.searchUsers.initiate(searchQuery, { forceRefetch: true })
        ).unwrap();
        setGlobalContacts(res.filter((u) => u.id !== user?.id));
      } catch (err) {
        console.error("Global search error:", err);
      } finally {
        setLoadingContacts(false);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, user, dispatch]);

  const handleSelectConv = (id: string) => {
    selectConversation(id);
    dispatch(setIsMobileSidebarOpen(false));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-[#0F172A] font-sans">
      {/* ── 1. LEFT DARK ICON RAIL (exact color from screenshot #0F172A) ── */}
      <aside className="hidden sm:flex w-[68px] bg-[#0F172A] flex-col items-center justify-between py-5 z-40 shrink-0 border-r border-[#1E293B]">
        {/* Top Logo + Nav items */}
        <div className="flex flex-col items-center gap-6 w-full px-2">
          {/* Brand Logo Button */}
          <a
            href={ROUTES.LANDING}
            title="Chatter"
            className="w-11 h-11 rounded-2xl bg-[#6C63FF] flex items-center justify-center text-white shadow-lg shadow-[#6C63FF]/30 hover:scale-105 transition-transform"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
          </a>

          {/* Navigation Items */}
          <div className="flex flex-col items-center gap-3 w-full">
            <button
              onClick={() => setActiveNavTab("chat")}
              title="Chats"
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                activeNavTab === "chat"
                  ? "bg-[#1E293B] text-[#6C63FF]"
                  : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/60"
              )}
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setActiveNavTab("groups");
                dispatch(setIsCreateGroupModalOpen(true));
              }}
              title="Groups"
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                activeNavTab === "groups"
                  ? "bg-[#1E293B] text-[#6C63FF]"
                  : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/60"
              )}
            >
              <Users className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveNavTab("contacts")}
              title="Contacts"
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                activeNavTab === "contacts"
                  ? "bg-[#1E293B] text-[#6C63FF]"
                  : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/60"
              )}
            >
              <UserIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveNavTab("notifications")}
              title="Notifications"
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                activeNavTab === "notifications"
                  ? "bg-[#1E293B] text-[#6C63FF]"
                  : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/60"
              )}
            >
              <Bell className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveNavTab("settings")}
              title="Settings"
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                activeNavTab === "settings"
                  ? "bg-[#1E293B] text-[#6C63FF]"
                  : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/60"
              )}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Current User Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative group cursor-pointer" onClick={logout} title="Click to Logout">
            <Avatar
              src={user?.avatarUrl}
              name={user?.name || "User"}
              size="md"
              isOnline={true}
              showStatus
              className="ring-2 ring-[#6C63FF]/40 group-hover:ring-red-400 transition-all"
            />
          </div>
        </div>
      </aside>

      {/* ── 2. CONVERSATIONS LIST SIDEBAR (Light white/slate) ── */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-[300px] sm:w-[320px] bg-white border-r border-[#F1F5F9] flex flex-col transition-transform duration-300 md:static md:translate-x-0 shrink-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header: "Conversations" + New Group/Chat Icon */}
        <div className="px-5 pt-5 pb-2.5 flex items-center justify-between bg-white">
          <h2 className="text-[19px] font-bold text-[#0F172A] tracking-tight">Conversations</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => dispatch(setIsCreateGroupModalOpen(true))}
              title="New Conversation / Group"
              className="p-2 rounded-xl text-[#0F172A] hover:text-[#6C63FF] hover:bg-[#F8FAFC] transition-colors"
            >
              <SquarePen className="w-5 h-5" />
            </button>
            <button
              onClick={() => dispatch(setIsMobileSidebarOpen(false))}
              className="md:hidden p-2 rounded-xl text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Pills */}
        <ChatSearch />

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            isLoading={isLoading}
            onSelectConversation={handleSelectConv}
          />

          {/* Directory Search Results */}
          {(globalContacts.length > 0 || loadingContacts || (searchQuery.trim().length > 0 && globalContacts.length === 0)) && (
            <div className="border-t border-[#F1F5F9] pt-3 pb-4 px-2">
              <div className="px-3 py-1 flex items-center gap-1.5 mb-1">
                <UserPlus className="w-3.5 h-3.5 text-[#6C63FF]" />
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#94A3B8]">
                  Global Users Found
                </span>
              </div>
              <div className="space-y-0.5">
                {loadingContacts ? (
                  <p className="text-[12px] text-[#94A3B8] text-center py-4">Searching...</p>
                ) : globalContacts.length === 0 ? (
                  <p className="text-[12px] text-[#94A3B8] text-center py-4">No users found</p>
                ) : (
                  globalContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={async () => {
                        try {
                          const conv = await startDirectConversation(contact.id);
                          handleSelectConv(conv.id);
                        } catch (e) {
                          console.error("Failed to start chat:", e);
                        }
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                    >
                      <Avatar src={contact.avatarUrl} name={contact.name} size="sm" />
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-[#0F172A] truncate">{contact.name}</p>
                        <p className="text-[11.5px] text-[#64748B] truncate">{contact.phone}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => dispatch(setIsMobileSidebarOpen(false))}
          className="fixed inset-0 bg-black/40 z-20 md:hidden backdrop-blur-2xs"
        />
      )}

      {/* ── 3. MAIN CHAT WINDOW (Clean White #FFFFFF) ── */}
      <main className="flex-1 flex flex-col h-full bg-white relative min-w-0 overflow-hidden">
        {activeConversation ? (
          <>
            <ChatHeader conversation={activeConversation} />
            <MessageList
              messages={messages}
              isLoading={isMessagesLoading}
            />
            <MessageInput
              onSendMessage={async (text) => {
                await sendMessage({ content: text, contentType: "text" });
              }}
            />
          </>
        ) : (
          <EmptyChat />
        )}
      </main>

      {/* ── 4. RIGHT CONVERSATION INFO DRAWER (Optional on desktop / toggled) ── */}
      {activeConversation && isInfoPanelOpen && (
        <ConversationInfo conversation={activeConversation} />
      )}

      {/* Create Group Modal */}
      <CreateGroupModal />
    </div>
  );
};
