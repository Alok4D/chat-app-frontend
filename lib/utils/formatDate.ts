import { format, isToday, isYesterday, isThisWeek, isThisYear } from "date-fns";

export function formatDate(dateInput: string | Date | number): string {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  if (isToday(date)) {
    return format(date, "h:mm a");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  if (isThisWeek(date)) {
    return format(date, "EEEE");
  }

  if (isThisYear(date)) {
    return format(date, "MMM d");
  }

  return format(date, "dd/MM/yyyy");
}

export function formatFullDate(dateInput: string | Date | number): string {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";
  return format(date, "MMMM d, yyyy 'at' h:mm a");
}
