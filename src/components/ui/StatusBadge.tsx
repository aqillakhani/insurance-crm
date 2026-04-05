import { getStatusColor } from "@/lib/utils";

/**
 * StatusBadge — Consistent status display across the app.
 * Replaces inline status color logic scattered in 10+ files.
 */

interface StatusBadgeProps {
  status: string;
  variant?: "text" | "pill";
}

export default function StatusBadge({ status, variant = "text" }: StatusBadgeProps) {
  const color = getStatusColor(status);

  if (variant === "pill") {
    return (
      <span
        className="inline-block px-1.5 py-0.5 text-white rounded-sm"
        style={{
          background: color,
          fontSize: "10px",
          fontWeight: "bold",
        }}
      >
        {status}
      </span>
    );
  }

  return (
    <span style={{ color, fontWeight: "bold" }}>
      {status}
    </span>
  );
}
