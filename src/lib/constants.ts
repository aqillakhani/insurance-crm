/** Application-wide constants — eliminates magic numbers and strings */

// Query limits
export const CUSTOMER_SEARCH_LIMIT = 100;
export const DASHBOARD_TASK_LIMIT = 8;
export const DASHBOARD_PAYMENT_LIMIT = 10;
export const DEFAULT_PAGE_SIZE = 25;

// Session
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const SESSION_COOKIE_NAME = "crm-session";

// Status values
export const CUSTOMER_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  PROSPECT: "Prospect",
} as const;

export const POLICY_STATUS = {
  ACTIVE: "Active",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
  PENDING: "Pending",
} as const;

export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const TASK_PRIORITY = {
  HIGH: "high",
  NORMAL: "normal",
  LOW: "low",
} as const;

export const NOTE_TYPE = {
  NOTE: "note",
  ALERT: "alert",
  SYSTEM: "system",
} as const;

// Customer types
export const CUSTOMER_TYPE = {
  PERSONAL: "Personal Lines",
  COMMERCIAL: "Commercial Lines",
} as const;

export const ACCOUNT_TYPE = {
  CUSTOMER: "Customer",
  PROSPECT: "Prospect",
} as const;

// Policy classes
export const POLICY_CLASS = {
  AUTO: "AUTO",
  HOME: "HOME",
  RENTERS: "RENTERS",
  LIFE: "LIFE",
  COMMERCIAL: "COMMERCIAL",
  UMBRELLA: "UMBRELLA",
} as const;
