"use client";

import { useState } from "react";

/**
 * SectionHeader — Green collapsible section header matching Agency Matrix
 * Reference: Screenshots 1, 3, 5, 9 — "General", "Favorites", "Customer Relationships"
 */

interface SectionHeaderProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  variant?: "green" | "blue" | "grey";
}

export default function SectionHeader({
  title,
  defaultExpanded = true,
  children,
  variant = "green",
}: SectionHeaderProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const bgColors = {
    green: "var(--section-header-bg)",
    blue: "var(--tab-active-bg)",
    grey: "var(--table-header-bg)",
  };

  const textColors = {
    green: "var(--section-header-text)",
    blue: "#ffffff",
    grey: "var(--text)",
  };

  return (
    <div>
      <div
        className="flex items-center justify-between px-2 py-1 cursor-pointer select-none"
        style={{
          background: bgColors[variant],
          color: textColors[variant],
          fontSize: "13px",
          fontWeight: "bold",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <span>
          {expanded ? "▼" : "►"} {title}
        </span>
      </div>
      {expanded && <div>{children}</div>}
    </div>
  );
}
