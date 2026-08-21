"use client";

import React, { useState, useEffect } from "react";
import { ChatSearch } from "./ChatSearch";
import { ConversationList } from "./ConversationList";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { EmptyChat } from "./EmptyChat";
import { CreateGroupModal } from "./group/CreateGroupModal";
import { Avatar } from "@/components/ui/Avatar";
import { useConversations } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsMobileSidebarOpen, setIsCreateGroupModalOpen } from "@/store/chat.store";
import {
  MessageSquareMore,
  LogOut,
  BookOpen,
  X,
  UserPlus,
  Settings,
  Users,
  Plus,
} from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import { usersApi } from "@/lib/api/users.api";
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
  const { messages, isLoading: isMessagesLoading, replyTo, sendMessage, reactToMessage, setReplyTo } =
    useMessages();
  const { sendTypingEvent } = useRealtimeMessages();
  const isMobileSidebarOpen = useAppSelector((s) => s.chat.isMobileSidebarOpen);

  const [globalContacts, setGlobalContacts] = useState<User[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setGlobalContacts([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      setLoadingContacts(true);
      try {
        const res = await usersApi.getUsers({ search: searchQuery });
        setGlobalContacts(res.filter((u) => u.id !== user?.id));
      } catch (err) {
        console.error("Global search error:", err);
      } finally {
        setLoadingContacts(false);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, user]);

  const handleSelectConv = (id: string) => {
    selectConversation(id);
    dispatch(setIsMobileSidebarOpen(false));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0D1117] text-[#E6EDF3]">

      {/* ── ICON RAIL (leftmost, dark) ── */}
      <aside className="hidden sm:flex w-[60px] bg-[#0D1117] border-r border-[#21262D] flex-col items-center justify-between py-4 z-40 shrink-0">
        {/* Top: Brand + Nav icons */}
        <div className="flex flex-col items-center gap-5">
          {/* Brand */}
          <a
            href={ROUTES.LANDING}
            title="Chatter"
            className="w-10 h-10 rounded-2xl bg-[#6C63FF] flex items-center justify-center text-white shadow-lg shadow-[#6C63FF]/30 hover:scale-105 transition-transform"
          >
            <MessageSquareMore className="w-5 h-5" />
          </a>

          {/* Nav icons */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <button
              title="Messages"
              className="p-2.5 rounded-xl bg-[#6C63FF]/15 text-[#6C63FF] border border-[#6C63FF]/25 hover:bg-[#6C63FF]/25 transition-all"
            >
              <MessageSquareMore className="w-5 h-5" />
            </button>
            <button
              title="Contacts"
              className="p-2.5 rounded-xl text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#161B22] transition-all"
            >
              <Users className="w-5 h-5" />
            </button>
            <a
              href={ROUTES.API_DOCS}
              title="API Docs"
              className="p-2.5 rounded-xl text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#161B22] transition-all"
            >
              <BookOpen className="w-5 h-5" />
            </a>
            <button
              title="Settings"
              className="p-2.5 rounded-xl text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#161B22] transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom: User avatar + logout */}
        <div className="flex flex-col items-center gap-3">
          <Avatar
            src={user?.avatarUrl}
            name={user?.name || "User"}
            size="sm"
            isOnline={true}
            showStatus
            className="ring-2 ring-[#6C63FF]/30 cursor-pointer hover:ring-[#6C63FF]/60 transition-all"
          />
          <button
            onClick={logout}
            title="Sign Out"
            className="p-2 rounded-xl text-[#8B949E] hover:text-[#FF7070] hover:bg-[#FF7070]/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ── CONVERSATIONS SIDEBAR ── */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-[280px] bg-[#111827] border-r border-[#21262D] flex flex-col transition-transform duration-300 md:static md:translate-x-0 shrink-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="px-4 pt-4 pb-2 border-b border-[#21262D] flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-[#E6EDF3]">Conversations</h2>
          </div>
          <button
            onClick={() => dispatch(setIsMobileSidebarOpen(false))}
            className="md:hidden p-1.5 rounded-lg text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Tabs */}
        <ChatSearch />

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            isLoading={isLoading}
            onSelectConversation={handleSelectConv}
          />

          {/* Global Contacts from Search */}
          {(globalContacts.length > 0 || loadingContacts) && (
            <div className="border-t border-[#21262D] pt-2 pb-4">
              <div className="px-4 py-2 flex items-center gap-1.5">
                <UserPlus className="w-3 h-3 text-[#6C63FF]" />
                <span className="text-[10.5px] uppercase tracking-wider font-bold text-[#8B949E]">
                  Global Contacts
                </span>
              </div>
              <div className="space-y-0 px-2">
                {loadingContacts ? (
                  <p className="text-[12px] text-[#8B949E] text-center py-4">Searching...</p>
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
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#21262D] transition-colors"
                    >
                      <Avatar src={contact.avatarUrl} name={contact.name} size="sm" />
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-semibold text-[#E6EDF3] truncate">{contact.name}</p>
                        <p className="text-[11px] text-[#8B949E] truncate">{contact.phone}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom: New Conversation Button */}
        <div className="p-3 border-t border-[#21262D]">
          <button
            onClick={() => dispatch(setIsCreateGroupModalOpen(true))}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#6C63FF] hover:bg-[#5a52e8] text-white text-[13px] font-semibold shadow-md shadow-[#6C63FF]/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            New Conversation
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => dispatch(setIsMobileSidebarOpen(false))}
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
        />
      )}

      {/* ── MAIN CHAT WINDOW ── */}
      <main className="flex-1 flex flex-col h-full bg-[#0D1117] relative min-w-0 overflow-hidden">
        {activeConversation ? (
          <>
            <ChatHeader conversation={activeConversation} />
            <MessageList
              messages={messages}
              isLoading={isMessagesLoading}
              onReact={reactToMessage}
              onReply={(msg) => setReplyTo(msg)}
            />
            <MessageInput
              onSendMessage={async (text) => {
                await sendMessage({ content: text, contentType: "text" });
              }}
              replyTo={replyTo}
              onCancelReply={() => setReplyTo(null)}
              onTyping={sendTypingEvent}
            />
          </>
        ) : (
          <EmptyChat />
        )}
      </main>

      {/* Create Group Modal */}
      <CreateGroupModal />
    </div>
  );
};
