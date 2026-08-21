# PulseChat API Documentation

PulseChat provides high-performance RESTful HTTP endpoints and WebSocket events for real-time messaging.

## Base URL
- **REST API Base URL:** `http://localhost:5000/api`
- **WebSocket Gateway:** `ws://localhost:5000`

---

## 1. Authentication Endpoints

### 1.1 User Login
- **Endpoint:** `POST /api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "phone": "+1 555-0199",
  "password": "password123",
  "otp": "123456"
}
```
- **Response (200 OK):**
```json
{
  "user": {
    "id": "user-current-001",
    "name": "Alex Morgan",
    "phone": "+1 555-0199",
    "avatarUrl": "https://images.unsplash.com/...",
    "isOnline": true,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.2 Get Current User Profile
- **Endpoint:** `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
```json
{
  "id": "user-current-001",
  "name": "Alex Morgan",
  "phone": "+1 555-0199",
  "statusMessage": "Building great conversational UX 🚀",
  "isOnline": true
}
```

---

## 2. Conversation & Channel Endpoints

### 2.1 List Conversations
- **Endpoint:** `GET /api/conversations?type=all&search=`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** Array of Conversation objects.

### 2.2 Create Direct Conversation
- **Endpoint:** `POST /api/conversations/direct`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "userId": "user-002"
}
```

### 2.3 Create Group Conversation
- **Endpoint:** `POST /api/groups`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "name": "Design & Frontend Core",
  "description": "Coordination between UI design and frontend architecture",
  "participantIds": ["user-002", "user-003", "user-004"]
}
```

---

## 3. Message Endpoints

### 3.1 Fetch Messages for Conversation
- **Endpoint:** `GET /api/conversations/:conversationId/messages`
- **Headers:** `Authorization: Bearer <token>`

### 3.2 Send Message
- **Endpoint:** `POST /api/conversations/:conversationId/messages`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "content": "Hello team!",
  "contentType": "text",
  "replyToId": "msg-001"
}
```

---

## 4. Real-time WebSocket Protocol

- **Connect:** Pass `{ auth: { token: "<jwt>" } }` on handshake.
- **Client -> Server Events:**
  - `message:send` -> `{ conversationId, content, contentType }`
  - `typing` -> `{ conversationId, isTyping: true|false }`
- **Server -> Client Events:**
  - `message:received` -> Full Message object
  - `typing:update` -> `{ conversationId, userId, userName, isTyping }`
  - `user:status` -> `{ userId, isOnline, lastSeen }`
