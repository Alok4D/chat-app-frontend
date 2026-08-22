"use client";

import React, { useState, useEffect, useRef } from "react";
import { ConversationList } from "./ConversationList";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { EmptyChat } from "./EmptyChat";
import { ConversationInfo } from "./ConversationInfo";
import { CreateGroupModal } from "./group/CreateGroupModal";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { useConversations } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsCreateGroupModalOpen, toggleInfoPanel } from "@/redux/slices/chatSlice";
import { usersApi } from "@/redux/features/users/usersApi";
import {
  MessageSquare,
  Search,
  Plus,
  MoreVertical,
  X,
  UserPlus,
  Info,
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
    setSearch,
    refreshConversations,
    filterType,
    setFilterType,
    isLoading,
  } = useConversations();
  const { messages, isLoading: isMessagesLoading, sendMessage } = useMessages();
  useRealtimeMessages();

  const isInfoPanelOpen = useAppSelector((s) => s.chat.isInfoPanelOpen);

  // State for Header dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Global search contacts
  const [globalContacts, setGlobalContacts] = useState<User[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global search effect
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
    }, 350);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, user, dispatch]);

  const handleSelectConv = (id: string) => {
    selectConversation(id);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-[#111827] font-sans antialiased">
      {/* ── 1. LEFT SIDEBAR (Pure #FFFFFF Background) ── */}
      <aside className="w-[300px] lg:w-[320px] bg-[#FFFFFF] border-r border-[#E5E7EB] flex flex-col h-full shrink-0 z-30 select-none">
        
        {/* Header */}
        <div className="h-[60px] px-4 border-b border-[#E5E7EB] flex items-center justify-between relative bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#5B4FE1]">
              <MessageSquare className="w-4 h-4 text-[#5B4FE1]" />
            </div>
            <h1 className="text-[17px] font-bold text-[#111827] tracking-tight">Chat</h1>
          </div>

          {/* Three dots menu button with popup dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="Menu"
              className="p-1 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-9 w-32 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-50 animate-scaleUp">
                <a
                  href={ROUTES.LANDING}
                  className="block px-3 py-1.5 text-[12.5px] font-medium text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                >
                  Home
                </a>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-1.5 text-[12.5px] font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── SIDEBAR BODY ── */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Search Box & New Group */}
          <div className="p-3 pb-2.5 flex flex-col gap-2.5">
            {/* Search Box */}
            <div className="flex items-center h-10 px-3.5 bg-[#F1F3F7] rounded-lg transition-colors">
              <Search className="w-4 h-4 text-[#8E9AAC] shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-full bg-transparent text-[13px] text-[#111827] placeholder-[#8E9AAC] outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearch("")} className="text-[#8E9AAC] hover:text-[#111827]">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* + New Group Button */}
            <button
              onClick={() => dispatch(setIsCreateGroupModalOpen(true))}
              className="w-full h-9 rounded-lg border border-[#E2E6EE] bg-white hover:bg-[#F9FAFB] text-[13px] font-medium text-[#4B586E] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#4B586E]" />
              <span>New Group</span>
            </button>
          </div>

          {/* Filter Tabs [All] [Direct] [Groups] */}
          <div className="flex items-center gap-2 px-3 pb-2 select-none">
            {[
              { id: "all", label: "All" },
              { id: "direct", label: "Direct" },
              { id: "group", label: "Groups" },
            ].map((tab) => {
              const isActive = filterType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id as any)}
                  className={cn(
                    "px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
                    isActive
                      ? "bg-[#5B4FE1] text-white shadow-2xs"
                      : "bg-[#F1F3F7] text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#111827]"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Conversations Header + Refresh */}
          <div className="px-3.5 py-1.5 flex items-center justify-between text-[11px] font-bold text-[#9CA3AF] tracking-wider">
            <span>CONVERSATIONS</span>
            <button
              onClick={() => refreshConversations()}
              className="text-[#6366F1] hover:underline font-semibold tracking-normal cursor-pointer"
            >
              Refresh
            </button>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversationId}
              isLoading={isLoading}
              onSelectConversation={handleSelectConv}
            />

            {/* Global Search Results */}
            {(globalContacts.length > 0 || loadingContacts || (searchQuery.trim().length > 0 && globalContacts.length === 0)) && (
              <div className="border-t border-[#E5E7EB] pt-2 pb-3 px-2">
                <div className="px-2.5 py-1 flex items-center gap-1.5 mb-1">
                  <UserPlus className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span className="text-[10.5px] uppercase tracking-wider font-bold text-[#9CA3AF]">
                    Global Users Found
                  </span>
                </div>
                <div className="space-y-0.5">
                  {loadingContacts ? (
                    <div className="space-y-1 p-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-2.5 px-2.5 py-2">
                          <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                          <div className="flex-1 space-y-1.5">
                            <Skeleton className="h-3 w-24 rounded" />
                            <Skeleton className="h-2.5 w-32 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : globalContacts.length === 0 ? (
                    <p className="text-[12px] text-[#9CA3AF] text-center py-2.5">No users found</p>
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
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                      >
                        <Avatar src={contact.avatarUrl} name={contact.name} size="sm" />
                        <div className="min-w-0">
                          <p className="text-[12.5px] font-bold text-[#111827] truncate">{contact.name}</p>
                          <p className="text-[11px] text-[#6B7280] truncate">{contact.phone}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── SIDEBAR BOTTOM (Height: 60px aligned with input bar) ── */}
        <div className="h-[60px] px-3.5 border-t border-[#E5E7EB] bg-[#FFFFFF] flex items-center">
          <div className="flex items-center gap-2.5 w-full">
            <Avatar
              src={user?.avatarUrl}
              name={user?.name || "ABCD"}
              size="md"
              isOnline={true}
              showStatus
            />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-[#111827] truncate leading-tight">
                {user?.name || "ABCD"}
              </p>
              <p className="text-[11px] text-[#6B7280] truncate mt-0.5 font-medium">
                {user?.phone || "01719277951"}{" "}
                <span className="text-[#10B981] font-semibold">· Online</span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── 2. MAIN CHAT WINDOW (Background: #F7F8FA) ── */}
      <main className="flex-1 flex flex-col h-full bg-[#F7F8FA] relative min-w-0 overflow-hidden">
        {activeConversation ? (
          <>
            {/* Chat Top Header (Height: 60px) */}
            <div className="h-[60px] px-6 bg-white border-b border-[#E5E7EB] flex items-center justify-between shrink-0 z-20">
              <div className="flex items-center gap-3">
                <Avatar
                  src={activeConversation.avatarUrl}
                  name={activeConversation.name || "Chat"}
                  size="md"
                  isGroup={activeConversation.type === "group"}
                />
                <div>
                  <h3 className="text-[14.5px] font-bold text-[#111827] leading-tight">
                    {activeConversation.name ||
                      (activeConversation.type === "direct"
                        ? activeConversation.participants.find((p) => p.id !== user?.id)?.name || "User"
                        : "Group Chat")}
                  </h3>
                  <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">
                    {activeConversation.type === "group"
                      ? `${activeConversation.participants.length} members`
                      : "Online"}
                  </p>
                </div>
              </div>

              {/* Info Button ⓘ */}
              <button
                onClick={() => dispatch(toggleInfoPanel())}
                title="Conversation Details"
                className={cn(
                  "w-8.5 h-8.5 rounded-full border border-[#E5E7EB] flex items-center justify-center transition-colors cursor-pointer",
                  isInfoPanelOpen
                    ? "bg-[#EDE9FE] text-[#5B4FE1] border-[#5B4FE1]/30"
                    : "bg-white hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827]"
                )}
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Message List */}
            <MessageList
              messages={messages}
              isLoading={isMessagesLoading}
            />

            {/* Message Input Container (Height: 60px, border-t border-[#E5E7EB]) */}
            <div className="h-[60px] px-6 bg-white border-t border-[#E5E7EB] flex items-center shrink-0">
              <MessageInput
                onSendMessage={async (text) => {
                  await sendMessage({ content: text, contentType: "text" });
                }}
              />
            </div>
          </>
        ) : (
          <EmptyChat />
        )}
      </main>

      {/* ── 3. RIGHT CONVERSATION INFO DRAWER ── */}
      {activeConversation && isInfoPanelOpen && (
        <ConversationInfo conversation={activeConversation} />
      )}

      {/* ── 4. CREATE GROUP MODAL ── */}
      <CreateGroupModal />
    </div>
  );
};
