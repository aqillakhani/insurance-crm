/**
 * EmptyState — Standardized empty state across all tables and lists.
 * Replaces the 6+ different "No X Found" patterns in the codebase.
 */

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  title,
  message = "No records found",
  icon = "📋",
  action,
}: EmptyStateProps) {
  return (
    <div className="py-10 text-center">
      <div style={{ fontSize: "28px", marginBottom: "8px", opacity: 0.5 }}>{icon}</div>
      {title && (
        <div style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)", marginBottom: "4px" }}>
          {title}
        </div>
      )}
      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{message}</div>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-3 px-3 py-1.5 text-xs font-medium"
          style={{
            background: "var(--action-btn-bg)",
            color: "white",
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
