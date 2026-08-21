import { format } from "date-fns";

export function formatTime(dateInput: string | Date | number): string {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";
  return format(date, "h:mm a");
}

export function formatLastSeen(lastSeen?: string, isOnline?: boolean): string {
  if (isOnline) return "Online";
  if (!lastSeen) return "Offline";
  const date = new Date(lastSeen);
  if (isNaN(date.getTime())) return "Offline";
  return `Last seen ${format(date, "MMM d, h:mm a")}`;
}
