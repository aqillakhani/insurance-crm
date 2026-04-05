"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * TabBar — Horizontal tabs with counts, matching Agency Matrix customer detail tabs
 * Reference: Screenshots 4, 6, 7, 8, 10, 11
 * Format: "Tab Name (count)" with active tab highlighted in blue
 */

interface TabItem {
  label: string;
  href: string;
  count?: number | string;
}

interface TabBarProps {
  tabs: TabItem[];
  basePath?: string;
}

export default function TabBar({ tabs }: TabBarProps) {
  const pathname = usePathname();

  function isActive(tab: TabItem): boolean {
    return pathname === tab.href || pathname.startsWith(tab.href + "/");
  }

  return (
    <div
      className="flex flex-wrap"
      style={{
        borderBottom: "2px solid var(--tab-active-bg)",
        background: "var(--bg)",
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="px-3 py-1.5 text-xs font-medium border-r"
            style={{
              background: active ? "var(--tab-active-bg)" : "var(--tab-bg)",
              color: active ? "var(--tab-active-text)" : "var(--tab-text)",
              borderColor: "var(--tab-border)",
              borderTop: "1px solid var(--tab-border)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              fontSize: "11px",
            }}
            onMouseEnter={(e) => {
              if (!active)
                (e.target as HTMLElement).style.background = "var(--tab-hover)";
            }}
            onMouseLeave={(e) => {
              if (!active)
                (e.target as HTMLElement).style.background = "var(--tab-bg)";
            }}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span style={{ marginLeft: "3px" }}>({tab.count})</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
