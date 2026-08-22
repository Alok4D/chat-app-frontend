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
  MessageCircle,
  Store,
  MessageSquareText,
  Archive,
  SquarePen,
  X,
  UserPlus,
  PanelLeftClose,
  PanelLeft,
  LogOut,
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
  const [activeNavTab, setActiveNavTab] = useState<"chats" | "marketplace" | "requests" | "archive">("chats");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Total unread count
  const totalUnreadCount = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

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
      {/* ── 1. MESSENGER STYLE LEFT NAVIGATION RAIL ── */}
      <aside
        className={cn(
          "hidden sm:flex flex-col justify-between py-4 bg-[#F0F2F5] border-r border-[#E4E6EB] z-40 shrink-0 transition-all duration-200 select-none",
          isSidebarExpanded ? "w-[210px] px-3" : "w-[68px] items-center px-2"
        )}
      >
        {/* Top Section: Nav Tabs + Toggle */}
        <div className="flex flex-col gap-2 w-full">
          {/* Header Toggle */}
          <div className={cn("flex items-center mb-1", isSidebarExpanded ? "justify-between px-2" : "justify-center")}>
            {isSidebarExpanded && (
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#65676B]">Menu</span>
            )}
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              title={isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
              className="p-1.5 rounded-lg text-[#65676B] hover:text-[#050505] hover:bg-[#E4E6EB] transition-colors cursor-pointer"
            >
              {isSidebarExpanded ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Chats Tab */}
          <button
            onClick={() => setActiveNavTab("chats")}
            title="Chats"
            className={cn(
              "flex items-center rounded-xl transition-all font-semibold text-[14px] relative cursor-pointer",
              isSidebarExpanded ? "gap-3 px-3.5 py-2.5 w-full" : "justify-center w-11 h-11 mx-auto",
              activeNavTab === "chats"
                ? "bg-[#E4E6EB] text-[#050505] shadow-2xs"
                : "text-[#65676B] hover:bg-[#E4E6EB]/60 hover:text-[#050505]"
            )}
          >
            <div className="relative shrink-0">
              <MessageCircle className="w-5 h-5 fill-current" />
              {totalUnreadCount > 0 && !isSidebarExpanded && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#1877F2] ring-2 ring-[#F0F2F5]" />
              )}
            </div>
            {isSidebarExpanded && (
              <>
                <span className="truncate flex-1 text-left">Chats</span>
                {totalUnreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#1877F2] text-white text-[11px] font-bold">
                    {totalUnreadCount}
                  </span>
                )}
              </>
            )}
          </button>

          {/* Marketplace Tab */}
          <button
            onClick={() => setActiveNavTab("marketplace")}
            title="Marketplace"
            className={cn(
              "flex items-center rounded-xl transition-all font-semibold text-[14px] cursor-pointer",
              isSidebarExpanded ? "gap-3 px-3.5 py-2.5 w-full" : "justify-center w-11 h-11 mx-auto",
              activeNavTab === "marketplace"
                ? "bg-[#E4E6EB] text-[#050505] shadow-2xs"
                : "text-[#65676B] hover:bg-[#E4E6EB]/60 hover:text-[#050505]"
            )}
          >
            <Store className="w-5 h-5 shrink-0" />
            {isSidebarExpanded && <span className="truncate flex-1 text-left">Marketplace</span>}
          </button>

          {/* Requests Tab */}
          <button
            onClick={() => setActiveNavTab("requests")}
            title="Requests"
            className={cn(
              "flex items-center rounded-xl transition-all font-semibold text-[14px] cursor-pointer",
              isSidebarExpanded ? "gap-3 px-3.5 py-2.5 w-full" : "justify-center w-11 h-11 mx-auto",
              activeNavTab === "requests"
                ? "bg-[#E4E6EB] text-[#050505] shadow-2xs"
                : "text-[#65676B] hover:bg-[#E4E6EB]/60 hover:text-[#050505]"
            )}
          >
            <MessageSquareText className="w-5 h-5 shrink-0" />
            {isSidebarExpanded && <span className="truncate flex-1 text-left">Requests</span>}
          </button>

          {/* Archive Tab */}
          <button
            onClick={() => setActiveNavTab("archive")}
            title="Archive"
            className={cn(
              "flex items-center rounded-xl transition-all font-semibold text-[14px] cursor-pointer",
              isSidebarExpanded ? "gap-3 px-3.5 py-2.5 w-full" : "justify-center w-11 h-11 mx-auto",
              activeNavTab === "archive"
                ? "bg-[#E4E6EB] text-[#050505] shadow-2xs"
                : "text-[#65676B] hover:bg-[#E4E6EB]/60 hover:text-[#050505]"
            )}
          >
            <Archive className="w-5 h-5 shrink-0" />
            {isSidebarExpanded && <span className="truncate flex-1 text-left">Archive</span>}
          </button>
        </div>

        {/* ── Bottom Section (Target Design: Profile + Log out Button) ── */}
        <div className="w-full">
          {isSidebarExpanded ? (
            <div className="flex flex-col gap-2.5 w-full pt-3 border-t border-[#E4E6EB]">
              {/* User Profile Card */}
              <div className="flex items-center gap-3 px-1">
                <Avatar
                  src={user?.avatarUrl}
                  name={user?.name || "Prime Alok"}
                  size="md"
                  isOnline={true}
                  showStatus
                  className="ring-2 ring-white shadow-2xs"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold text-[#0F172A] truncate leading-tight">
                    {user?.name || "Prime Alok"}
                  </p>
                  <p className="text-[12px] text-[#64748B] font-medium truncate mt-0.5">
                    User
                  </p>
                </div>
              </div>

              {/* Log out Button */}
              <button
                onClick={logout}
                title="Log out"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[13px] font-medium text-[#475569] hover:text-[#0F172A] transition-all shadow-2xs cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-[#64748B]" />
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5 w-full pt-3 border-t border-[#E4E6EB]">
              {/* Centered Avatar */}
              <Avatar
                src={user?.avatarUrl}
                name={user?.name || "Prime Alok"}
                size="md"
                isOnline={true}
                showStatus
                className="ring-2 ring-white shadow-2xs"
              />

              {/* Compact Log out Icon Button */}
              <button
                onClick={logout}
                title="Log out"
                className="w-10 h-10 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] transition-all shadow-2xs cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
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
              className="p-2 rounded-xl text-[#0F172A] hover:text-[#6C63FF] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              <SquarePen className="w-5 h-5" />
            </button>
            <button
              onClick={() => dispatch(setIsMobileSidebarOpen(false))}
              className="md:hidden p-2 rounded-xl text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all cursor-pointer"
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

      {/* ── 4. RIGHT CONVERSATION INFO DRAWER ── */}
      {activeConversation && isInfoPanelOpen && (
        <ConversationInfo conversation={activeConversation} />
      )}

      {/* Create Group Modal */}
      <CreateGroupModal />
    </div>
  );
};
