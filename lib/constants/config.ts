export const APP_CONFIG = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "PulseChat",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
  enableMock: process.env.NEXT_PUBLIC_ENABLE_MOCK !== "false",
  maxGroupParticipants: 50,
  maxAttachmentSizeBytes: 10 * 1024 * 1024, // 10MB
  typingTimeoutMs: 2500,
  mockDelayMs: 400,
};
