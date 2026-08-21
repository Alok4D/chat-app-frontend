# Chatter — Real-Time Chat Application Frontend

A modern, responsive, real-time messaging application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit (RTK Query)**, **React Hook Form**, **Zod**, and **Socket.IO Client**.

---

## 🚀 Implemented Features Overview

### Part 1: Real-Time Chat Application
- **⚡ Authentication**: Phone number + name login with automatic registration for new users (no password required).
- **🔍 Conversation Discovery**: Real-time directory search by phone number or name to initiate 1:1 direct conversations.
- **👥 Multi-Participant Groups**: Dedicated group creation flow with persistent multi-member selection and validation.
- **💬 Real-Time Messaging**: Instant WebSocket bi-directional communication powered by Socket.IO.
- **🎨 Visual Distinction**: Sent messages (violet `#6C63FF` with delivery receipts) vs. received messages (light slate `#F1F5F9` with avatar).
- **⏰ Smart Timestamps & Date Chips**: Every message is formatted with exact time, plus a centered "Today" separator.
- **🛡️ Form & Input Protection**: Whitespace-only or empty messages cannot be sent.
- **⏳ Loading, Empty & Error States**: Comprehensive feedback across all lists, searches, messages, and network requests.
- **📜 Intelligent Auto-Scroll**: Automatically scrolls to latest message by default; preserves scroll position if the user has scrolled up to read history.
- **ℹ️ Conversation Info Drawer**: 4-column layout including right-side details panel (media gallery, status, mute notifications, member list).

### Part 2: Creative Landing Page
- Responsive showcase landing page featuring Navbar, Hero, Feature highlights, Step-by-step How It Works flow, Interactive Chat Mockup preview, CTA, and Footer.

---

## 📁 Project Structure

```
chat-app-frontend/
├── app/
│   ├── (auth)/
│   │   ├── _components/ (LoginForm)
│   │   └── login/page.tsx
│   ├── (chat)/
│   │   ├── _components/
│   │   │   ├── ChatLayout.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── ChatSearch.tsx
│   │   │   ├── ConversationList.tsx
│   │   │   ├── ConversationItem.tsx
│   │   │   ├── ConversationInfo.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── EmptyChat.tsx
│   │   │   └── group/ (CreateGroupModal, GroupForm, ParticipantSelector, ParticipantItem)
│   │   └── chat/page.tsx
│   ├── landing/
│   │   ├── _components/ (Navbar, Hero, Features, HowItWorks, ChatPreview, CTA, Footer)
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/ (Button, Input, Modal, Avatar, Badge, Card)
│   ├── feedback/ (LoadingSpinner)
│   └── providers/ (AppProviders)
├── redux/
│   ├── api/ (baseApi.ts)
│   ├── features/
│   │   ├── auth/ (authApi.ts)
│   │   ├── conversations/ (conversationsApi.ts)
│   │   ├── messages/ (messagesApi.ts)
│   │   ├── groups/ (groupsApi.ts)
│   │   └── users/ (usersApi.ts)
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── chatSlice.ts
│   ├── hooks.ts
│   └── store.ts
├── hooks/
│   ├── useAuth.ts, useConversations.ts, useMessages.ts, useUsers.ts, useGroups.ts, useRealtimeMessages.ts, useAutoScroll.ts
├── types/
│   ├── auth.ts, user.ts, conversation.ts, message.ts, group.ts
└── docs/
    └── API.md
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_APP_NAME="Chatter"
NEXT_PUBLIC_API_BASE_URL="https://frontend-task-chatapp.onrender.com/api"
NEXT_PUBLIC_SOCKET_URL="https://frontend-task-chatapp.onrender.com"
NEXT_PUBLIC_ENABLE_MOCK="false"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🧠 Part 3: Thought Process Write-up

### 1. Architecture, Libraries & Approach (Part 1)
- **Framework (Next.js 14 App Router)**: Next.js App Router was chosen for its file-system routing, automatic code splitting, optimized static generation, and clean route grouping (`(auth)`, `(chat)`, `landing`).
- **State Management & Data Fetching (Redux Toolkit & RTK Query)**: We organized the state layer using a feature-based architecture (`redux/api`, `redux/features`, `redux/slices`). RTK Query provides automatic request caching, tag-based cache invalidation, and seamless integration with client slices. Madagascar.
- **Form Management & Validation**: Used `react-hook-form` with `zod` schema resolvers for input type-safety and instant validation before network dispatch.
- **Trade-offs**: Normalized client-side entity mapping was used to translate backend MongoDB `_id` and legacy fields into standardized TypeScript frontend interfaces without polluting UI components.

### 2. Design Choices & Visual Aesthetics (Part 2)
- Designed a custom **Chatter** aesthetic featuring a modern violet `#6C63FF` primary palette, clean white backgrounds, and a high-contrast dark navy `#0F172A` navigation rail.
- Crafted a 4-column layout (Rail + Conversations + Chat + Details) matching modern desktop messaging applications.

### 3. AI Tools Usage & Collaboration
- **Boilerplate & Architecture Scaffolding**: Utilized AI commands to structure folders, create TypeScript schemas, and build reusable UI tokens.
- **API Mapping & Documentation**: Extracted OpenAPI/Swagger endpoint schemas into [`docs/API.md`](docs/API.md).
- **Manual Refinement**: Custom error interceptors, scroll threshold detection logic, multi-participant selection caching, and WebSocket event synchronization were implemented and thoroughly tested.

### 4. Any Issues You Ran Into & Workarounds
- **Group Creation Participant Validation**: The backend requires at least 3 total members for a group (`participantIds` array must have $\ge 2$ members besides the creator). We added client-side validation to enforce selecting at least 2 participants and updated the API client to surface nested `data.error.details[0].message` error messages.
- **Participant Search Persistence**: When searching for multiple participants sequentially, unmounted search results cleared previously selected members. We resolved this by implementing an in-memory selection cache so selected users remain visible across searches.
- **WebSocket Reconnection & Sync**: Handled token retrieval directly from `localStorage` in the WebSocket handshake with automatic resynchronization on reconnection.

### 5. Future Improvements
- Implement paginated virtualized message history (`@tanstack/react-virtual`).
- Add client-side image compression for rich media uploads.
