"use client";

import React, { useState } from "react";
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
import { setIsMobileSidebarOpen } from "@/store/chat.store";
import { MessageSquare, LogOut, Code, BookOpen, Sparkles, X } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

export const ChatLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();
  const { conversations, activeConversation, activeConversationId, selectConversation, isLoading } =
    useConversations();
  const { messages, isLoading: isMessagesLoading, replyTo, sendMessage, reactToMessage, setReplyTo } =
    useMessages();
  const { sendTypingEvent } = useRealtimeMessages();
  const isMobileSidebarOpen = useAppSelector((s) => s.chat.isMobileSidebarOpen);

  const handleSelectConv = (id: string) => {
    selectConversation(id);
    dispatch(setIsMobileSidebarOpen(false));
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* LEFT PRIMARY MINI NAV BAR */}
      <aside className="w-16 bg-slate-950 border-r border-slate-800/80 flex flex-col items-center justify-between py-4 z-40 hidden sm:flex">
        <div className="flex flex-col items-center gap-6">
          <a
            href={ROUTES.LANDING}
            title="PulseChat Home"
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5" />
          </a>

          <div className="flex flex-col items-center gap-2">
            <a
              href={ROUTES.CHAT}
              title="Chat Workspace"
              className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600/20 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <a
              href={ROUTES.API_DOCS}
              title="API Documentation Explorer"
              className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
            >
              <BookOpen className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* User Profile & Logout */}
        <div className="flex flex-col items-center gap-3">
          <Avatar
            src={user?.avatarUrl}
            name={user?.name || "User"}
            size="sm"
            isOnline={true}
            showStatus
            className="ring-2 ring-blue-500/30 cursor-pointer"
          />
          <button
            onClick={logout}
            title="Sign Out"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* CONVERSATION LIST SIDEBAR */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-80 bg-slate-950 border-r border-slate-800/80 flex flex-col transition-transform duration-300 md:static md:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header inside sidebar */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold sm:hidden">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Messages</h2>
              <p className="text-[11px] text-slate-400">All Conversations</p>
            </div>
          </div>

          <button
            onClick={() => dispatch(setIsMobileSidebarOpen(false))}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Tabs */}
        <ChatSearch />

        {/* Conversation List */}
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          isLoading={isLoading}
          onSelectConversation={handleSelectConv}
        />

        {/* Bottom Current User Card in Sidebar */}
        {user && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                src={user.avatarUrl}
                name={user.name}
                size="sm"
                isOnline={true}
                showStatus
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-100 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.phone}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Backing overlay for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => dispatch(setIsMobileSidebarOpen(false))}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-20 md:hidden"
        />
      )}

      {/* MAIN CHAT CONVERSATION WINDOW */}
      <main className="flex-1 flex flex-col h-full bg-slate-950 relative min-w-0">
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
