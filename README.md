# PulseChat — Real-Time Chat Application Frontend

A modern, responsive, real-time messaging application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit**, **React Hook Form**, **Zod**, and **Socket.IO Client**.

---

## 🚀 Key Features

- **⚡ Real-Time Socket Architecture**: Real-time message broadcasting, typing indicators, and presence updates.
- **🎨 Glassmorphic Dark UI**: Custom-tailored design system with micro-animations and zero-clutter focus.
- **👥 1-on-1 & Multi-User Groups**: Full group creation modal with participant filter and role management.
- **🔒 Phone & OTP Authentication**: Form validation powered by Zod and React Hook Form with quick demo presets.
- **📦 Redux State Synchronization**: Clean slice architecture managing conversations, contacts, and message history.
- **📖 OpenAPI Explorer**: Interactive API documentation viewer for REST & WebSocket endpoints.
- **🔄 Dual Engine / Mock Mode**: Seamless built-in mock fallback allowing instant interactive use out-of-the-box.

---

## 📁 Project Structure

```
chat-app-frontend/
├── app/
│   ├── (auth)/
│   │   ├── _components/ (LoginForm, PhoneInput)
│   │   └── login/
│   ├── (chat)/
│   │   ├── _components/ (ChatLayout, ChatHeader, ConversationList, MessageList, MessageBubble, MessageInput, group/)
│   │   └── chat/
│   ├── landing/
│   │   ├── _components/ (Navbar, Hero, Features, ChatPreview, CTA, Footer)
│   │   └── page.tsx
│   ├── api-docs/
│   │   ├── _components/ (ApiEndpoint, ApiMethod, ApiResponse)
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/ (Button, Input, Modal, Avatar, Badge, Card)
│   ├── feedback/ (LoadingSpinner, ErrorState, EmptyState)
│   └── providers/ (AppProviders)
├── hooks/
│   ├── useAuth.ts, useConversations.ts, useMessages.ts, useUsers.ts, useGroups.ts, useRealtimeMessages.ts, useAutoScroll.ts
├── lib/
│   ├── api/ (client.ts, auth.api.ts, users.api.ts, conversations.api.ts, messages.api.ts, groups.api.ts)
│   ├── utils/ (cn.ts, formatDate.ts, formatTime.ts, validation.ts)
│   └── constants/ (routes.ts, config.ts)
├── store/
│   ├── auth.store.ts, chat.store.ts, hooks.ts, index.ts
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

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
