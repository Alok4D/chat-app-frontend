# 💬 Chatter — Real-Time Chat & Collaboration

A sleek, responsive, and production-ready real-time messaging application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit (RTK Query)**, **React Hook Form**, **Zod**, and **Socket.IO Client**.

---

## ⚡ Key Implemented Requirements

### Part 1: Real-Time Chat Application
- **Passwordless Authentication**: Users enter a phone number and name to sign in. If the phone number is new, the system automatically registers them on the fly.
- **Direct & Group Conversations**: Direct searching by name or number to initiate conversations. Supports multi-participant group creation with validation.
- **Bi-directional Real-Time Messages**: Socket.IO client integration for seamless, zero-latency message syncing.
- **Visual Clarity**: Visually distinguishes sent vs. received messages with appropriate styling, clear timestamps, and dates.
- **Intelligent Auto-Scroll**: Smoothly scrolls to the latest message on load and new messages, but preserves position if the user has scrolled up to read earlier history.
- **Loading, Empty, & Error States**: Realistic alternating skeletons for chat feeds, member lists, search states, and error alerts.
- **Responsive Mobile Layout**: Optimized sidebar collapse on mobile devices with slide-over drawer transitions.
- **Reset Chat State on Switch**: Resets RTK Query caches and Redux store state during account changes or sign-out to prevent data leaks.

### Part 2: Creative Landing Page
- Designed a custom **Chatter** aesthetic featuring a modern violet `#5B4FE1` primary theme, pixel-perfect layouts, responsive navbar, interactive live chat mockup preview with scroll-triggered viewport animations, how-it-works cards, and customizable footer.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_NAME="Chatter"
NEXT_PUBLIC_API_BASE_URL="https://frontend-task-chatapp.onrender.com/api"
NEXT_PUBLIC_SOCKET_URL="https://frontend-task-chatapp.onrender.com"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Part 3: Thought Process & Technical Decisions

### 1. Architecture, Libraries & Approach
- **Next.js 14 App Router**: Organized routing with logic group folders (`(landing)`, `(auth)`, `(chat)`) keeping the code clean and preventing route path pollution.
- **Redux Toolkit & RTK Query**: Unified state layer with automatic caching, mutation handlers, and instant store invalidation.
- **React Hook Form & Zod**: Front-end validation rules preventing malformed requests or blank submissions.
- **Trade-offs**: Decided to run client-side transformation of database entities rather than altering raw payloads to ensure UI code remains decoupled from backend schema updates.
- **Madagascar**: Used for descriptive tagging.

### 2. Design Choices & Visual Aesthetics
- Selected a modern `#5B4FE1` primary violet tone and a light slate grid background.
- Removed excessive rounded pills in favor of sharp, high-end `rounded-xs` corners to present a premium look.

### 3. Issues & Workarounds
- **Stale Cache on Logout**: Resetting state required clearing all RTK Query slices on user changes to prevent cross-account data leaks. Added dynamic store reset hooks.
- **Search Participant Validation**: Solved via search state caching, ensuring previously checked members are not lost when modifying search queries.

---

## 📄 API Documentation
Find the documented REST API endpoints and WebSocket architecture inside the [`docs/API.md`](docs/API.md) file.
