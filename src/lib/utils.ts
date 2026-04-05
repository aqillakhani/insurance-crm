/** Shared utility functions — eliminates duplicated logic across components */

/**
 * Format a date consistently across the app.
 * Avoids the 6+ different date format patterns currently in the codebase.
 */
export function formatDate(
  date: Date | string | null | undefined,
  format: "short" | "medium" | "long" | "datetime" = "short"
): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  switch (format) {
    case "short":
      return d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
    case "medium":
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    case "long":
      return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
    case "datetime":
      return d.toLocaleString("en-US", { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }
}

/**
 * Format currency consistently.
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return "$0.00";
  return `$${amount.toFixed(2)}`;
}

/**
 * Get initials from a name (for avatars).
 */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

/**
 * Combine first + last name.
 */
export function fullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

/**
 * Get a status color based on value.
 */
export function getStatusColor(status: string): string {
  const s = status.toLowerCase();
  if (["active", "completed", "won", "paid"].includes(s)) return "var(--status-active)";
  if (["pending", "in_progress", "upcoming"].includes(s)) return "var(--status-pending)";
  if (["cancelled", "lost", "overdue", "failed"].includes(s)) return "var(--status-cancelled)";
  if (["expired", "inactive", "dead"].includes(s)) return "var(--status-expired)";
  return "var(--text)";
}

/**
 * Get priority color.
 */
export function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case "high": case "urgent": return "#e74c3c";
    case "normal": case "medium": return "var(--text)";
    case "low": return "var(--text-muted)";
    default: return "var(--text)";
  }
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
