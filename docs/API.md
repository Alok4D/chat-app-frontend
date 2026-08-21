# Render Chat API Documentation

PulseChat integrates directly with the live Render Chat backend API.

## Base URL
- **REST API Base URL:** `https://frontend-task-chatapp.onrender.com/api`
- **WebSocket Gateway:** `https://frontend-task-chatapp.onrender.com` (connect to root)

---

## 1. Authentication Endpoints

### 1.1 User Login or Register
- **Endpoint:** `POST /api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "phone": "+1234567890",
  "name": "Ada Lovelace"
}
```
- **Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "665f0c2a9b1e4a0012ab34cd",
    "name": "Ada Lovelace",
    "phone": "+1234567890",
    "createdAt": "2026-08-21T10:51:42.987Z"
  }
}
```

### 1.2 Get Current Profile
- **Endpoint:** `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
```json
{
  "_id": "665f0c2a9b1e4a0012ab34cd",
  "name": "Ada Lovelace",
  "phone": "+1234567890",
  "createdAt": "2026-08-21T10:51:42.987Z"
}
```

---

## 2. Contact Searching

### 2.1 Search Users by Name or Phone
- **Endpoint:** `GET /api/users/search?q=<search_term>`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** Array of matched User profiles:
```json
[
  {
    "_id": "665f0c2a9b1e4a0012ab34ce",
    "name": "Sarah Chen",
    "phone": "+15551234568"
  }
]
```

---

## 3. Conversations

### 3.1 List My Conversations
- **Endpoint:** `GET /api/conversations`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
```json
{
  "data": [
    {
      "_id": "6a88540ee5d6aac97522489c",
      "type": "group",
      "name": "Project Team",
      "createdBy": "6a882dbee5d6aac97521e819",
      "admins": ["6a882dbee5d6aac97521e819"],
      "participants": [
        {
          "_id": "6a882dbee5d6aac97521e819",
          "name": "Ada Lovelace",
          "phone": "+1234567890"
        }
      ],
      "lastMessage": {
        "text": "Hello!",
        "sender": "6a882dbee5d6aac97521e819",
        "createdAt": "2026-08-21T13:35:10.824Z"
      },
      "updatedAt": "2026-08-21T13:35:10.824Z"
    },
    {
      "_id": "6a885409e5d6aac975224897",
      "type": "direct",
      "lastMessage": {},
      "updatedAt": "2026-08-21T13:35:05.467Z",
      "participant": {
        "_id": "6a8826d5e5d6aac97521e2b4",
        "name": "anikur",
        "phone": "01750885871"
      }
    }
  ]
}
```

### 3.2 Start Direct Conversation
- **Endpoint:** `POST /api/conversations`
- **Headers:** `Authorization: Bearer <token>, Content-Type: application/json`
- **Request Body:**
```json
{
  "userId": "6a8826d5e5d6aac97521e2b4"
}
```
- **Response (201 Created):**
```json
{
  "_id": "6a885409e5d6aac975224897",
  "participants": ["6a882dbee5d6aac97521e819", "6a8826d5e5d6aac97521e2b4"],
  "createdAt": "2026-08-21T13:35:05.467Z"
}
```

### 3.3 Create Group Conversation
- **Endpoint:** `POST /api/conversations/group`
- **Headers:** `Authorization: Bearer <token>, Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Test Group",
  "participantIds": ["6a8826d5e5d6aac97521e2b4", "6a8827c4e5d6aac97521e3ec"]
}
```

---

## 4. Messages

### 4.1 Get Conversation Message History
- **Endpoint:** `GET /api/conversations/:id/messages?limit=20&before=<messageId>`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
```json
{
  "messages": [
    {
      "_id": "6a8858b2e5d6aac975225b07",
      "conversation": "6a885409e5d6aac975224897",
      "sender": "6a882dbee5d6aac97521e819",
      "text": "Hello world!",
      "createdAt": "2026-08-21T13:54:58.405Z"
    }
  ],
  "hasMore": false
}
```

### 4.2 Send Message
- **Endpoint:** `POST /api/messages`
- **Headers:** `Authorization: Bearer <token>, Content-Type: application/json`
- **Request Body:**
```json
{
  "conversationId": "6a885409e5d6aac975224897",
  "text": "Hello world!"
}
```

---

## 5. Group Admin Actions

### 5.1 Add Group Members
- **Endpoint:** `POST /api/conversations/:id/participants`
- **Request Body:** `{ "userIds": ["6a8826d5e5d6aac97521e2b4"] }`

### 5.2 Remove Group Member / Leave Group
- **Endpoint:** `DELETE /api/conversations/:id/participants/:userId`

### 5.3 Promote Member to Admin
- **Endpoint:** `POST /api/conversations/:id/admins`
- **Request Body:** `{ "userId": "6a8826d5e5d6aac97521e2b4" }`

### 5.4 Rename Group
- **Endpoint:** `PATCH /api/conversations/:id`
- **Request Body:** `{ "name": "New Group Name" }`

---

## 6. Real-Time WebSockets (Socket.IO)

- **Connect:** Connect to server root `https://frontend-task-chatapp.onrender.com`
- **Auth Handshake:** Pass `{ auth: { token: "<JWT_TOKEN>" } }` on connection.
- **Client -> Server Events:**
  - `message:send` -> `{ conversationId, text }` (Optional callback ack)
- **Server -> Client Events:**
  - `message:new` -> Message payload object.
  - `conversation:updated` -> Group info changed or created.
