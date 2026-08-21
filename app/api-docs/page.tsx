"use client";

import React, { useState } from "react";
import { ApiEndpoint } from "./_components/ApiEndpoint";
import { BookOpen, ArrowLeft, Terminal, Key, Radio, Layers } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

const ENDPOINTS: any[] = [
  {
    category: "Authentication",
    items: [
      {
        method: "POST",
        path: "/api/auth/login",
        title: "User Authentication",
        description: "Authenticates a user via phone number and password/OTP, returning a JWT access token.",
        authRequired: false,
        requestBody: {
          phone: "+1 555-0199",
          password: "password123",
          otp: "123456",
        },
        response: {
          status: 200,
          description: "Successful authentication",
          data: {
            user: {
              id: "user-current-001",
              name: "Alex Morgan",
              phone: "+1 555-0199",
              avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
              isOnline: true,
              createdAt: "2024-01-01T00:00:00Z",
            },
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
      {
        method: "GET",
        path: "/api/auth/me",
        title: "Get Current Profile",
        description: "Retrieves the authenticated user's profile and active session details.",
        authRequired: true,
        response: {
          status: 200,
          description: "Authenticated user object",
          data: {
            id: "user-current-001",
            name: "Alex Morgan",
            phone: "+1 555-0199",
            statusMessage: "Building great conversational UX 🚀",
            isOnline: true,
          },
        },
      },
    ],
  },
  {
    category: "Conversations & Channels",
    items: [
      {
        method: "GET",
        path: "/api/conversations",
        title: "List Conversations",
        description: "Fetches active 1-on-1 and group conversations with last message previews and unread badges.",
        authRequired: true,
        response: {
          status: 200,
          description: "Array of conversations",
          data: [
            {
              id: "conv-001",
              type: "direct",
              participants: [
                { id: "user-001", name: "Alex Morgan" },
                { id: "user-002", name: "Sarah Chen" },
              ],
              unreadCount: 2,
              lastMessage: {
                id: "msg-101",
                content: "Hey Alex! Just checked out the new design system.",
                createdAt: "2024-02-01T12:00:00Z",
              },
            },
          ],
        },
      },
      {
        method: "POST",
        path: "/api/conversations/direct",
        title: "Create Direct Message Conversation",
        description: "Initializes or fetches an existing 1-on-1 direct channel with a target user ID.",
        authRequired: true,
        requestBody: {
          userId: "user-002",
        },
        response: {
          status: 201,
          description: "Created/Retrieved conversation",
          data: {
            id: "conv-direct-171829000",
            type: "direct",
            participants: ["user-001", "user-002"],
            unreadCount: 0,
          },
        },
      },
      {
        method: "POST",
        path: "/api/groups",
        title: "Create Group Channel",
        description: "Creates a new multi-user group chat with custom title, description, and initial participants.",
        authRequired: true,
        requestBody: {
          name: "Design & Frontend Core",
          description: "Coordination between UI design and frontend architecture",
          participantIds: ["user-002", "user-003", "user-004"],
        },
        response: {
          status: 201,
          description: "Created group conversation",
          data: {
            id: "conv-group-171829100",
            type: "group",
            name: "Design & Frontend Core",
            participants: ["user-001", "user-002", "user-003", "user-004"],
          },
        },
      },
    ],
  },
  {
    category: "Messages & Real-time Events",
    items: [
      {
        method: "GET",
        path: "/api/conversations/:id/messages",
        title: "Fetch Message History",
        description: "Retrieves chronological message history for a specific conversation.",
        authRequired: true,
        response: {
          status: 200,
          description: "List of message objects",
          data: [
            {
              id: "msg-001",
              conversationId: "conv-001",
              senderId: "user-002",
              content: "The design updates look super clean!",
              contentType: "text",
              status: "read",
              createdAt: "2024-02-01T12:05:00Z",
            },
          ],
        },
      },
      {
        method: "POST",
        path: "/api/conversations/:id/messages",
        title: "Send Message",
        description: "Sends a new text message or media attachment to the conversation.",
        authRequired: true,
        requestBody: {
          content: "Agreed, shipping the update now.",
          contentType: "text",
          replyToId: "msg-001",
        },
        response: {
          status: 201,
          description: "Sent message object",
          data: {
            id: "msg-002",
            conversationId: "conv-001",
            senderId: "user-001",
            content: "Agreed, shipping the update now.",
            status: "sent",
            createdAt: "2024-02-01T12:06:00Z",
          },
        },
      },
      {
        method: "WS",
        path: "ws://localhost:5000 (Socket.IO)",
        title: "Real-Time WebSocket Protocol",
        description: "Bi-directional WebSocket protocol for real-time message delivery, typing indicator events, and presence updates.",
        authRequired: true,
        requestBody: {
          event: "message:send",
          data: {
            conversationId: "conv-001",
            content: "Real-time socket payload",
          },
        },
        response: {
          status: 200,
          description: "Broadcasted socket event 'message:received'",
          data: {
            event: "message:received",
            payload: {
              id: "msg-ws-001",
              content: "Real-time socket payload",
              senderId: "user-001",
            },
          },
        },
      },
    ],
  },
];

export default function ApiDocsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Authentication", "Conversations & Channels", "Messages & Real-time Events"];

  const filteredEndpoints =
    activeCategory === "All"
      ? ENDPOINTS
      : ENDPOINTS.filter((group) => group.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href={ROUTES.LANDING}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">PulseChat API Explorer</h1>
              <p className="text-[11px] text-slate-400">OpenAPI Specification & Live Protocol Documentation</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={ROUTES.CHAT}
            className="text-xs font-semibold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 shadow-md shadow-blue-500/20 transition-all"
          >
            Open Chat App
          </a>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 flex-1">
        {/* Info Banner */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 mb-8 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white mb-1">Interactive API & Real-Time Specifications</h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              All REST endpoints accept and return JSON. Authenticated requests require a Bearer token in the{" "}
              <code className="text-blue-400 font-mono">Authorization</code> header.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              API Version: v1.0
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Endpoints List */}
        <div className="space-y-8">
          {filteredEndpoints.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {group.category}
              </h3>
              <div className="space-y-3">
                {group.items.map((endpoint: any, itemIdx: number) => (
                  <ApiEndpoint key={itemIdx} {...endpoint} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
