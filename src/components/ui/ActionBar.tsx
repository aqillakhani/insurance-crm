"use client";

/**
 * ActionBar — Horizontal button bar within tabs, matching Agency Matrix
 * Reference: Screenshots 7, 8 (Notes tab), Screenshot 4 (Attachments tab)
 * Style: Small text buttons, closely spaced, blue/teal style
 */

interface ActionButton {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "primary" | "danger";
  disabled?: boolean;
}

interface ActionBarProps {
  actions: ActionButton[];
}

export default function ActionBar({ actions }: ActionBarProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-0.5 px-2 py-1"
      style={{
        background: "#e8eef4",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          disabled={action.disabled}
          className="px-2 py-0.5 text-xs font-medium transition-colors"
          style={{
            background:
              action.variant === "primary"
                ? "var(--action-btn-bg)"
                : action.variant === "danger"
                  ? "#e74c3c"
                  : "var(--action-btn-bg)",
            color: "var(--action-btn-text)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "2px",
            cursor: action.disabled ? "not-allowed" : "pointer",
            opacity: action.disabled ? 0.5 : 1,
            fontSize: "11px",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            if (!action.disabled)
              (e.target as HTMLElement).style.background = "var(--action-btn-hover)";
          }}
          onMouseLeave={(e) => {
            if (!action.disabled)
              (e.target as HTMLElement).style.background = "var(--action-btn-bg)";
          }}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
