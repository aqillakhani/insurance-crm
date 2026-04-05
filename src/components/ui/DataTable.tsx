"use client";

import { memo } from "react";

/**
 * DataTable — Dense enterprise-style data table matching Agency Matrix.
 * Alternating row colors (white/light-green), compact density, action icons.
 * Memoized to prevent unnecessary rerenders.
 */

interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  emptyIcon?: string;
  onRowClick?: (row: T) => void;
  rowKey: (row: T) => string;
}

function DataTableInner<T>({
  columns,
  data,
  emptyMessage = "No records found",
  emptyIcon = "📋",
  onRowClick,
  rowKey,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="py-10 text-center">
        <div style={{ fontSize: "24px", marginBottom: "6px", opacity: 0.4 }}>{emptyIcon}</div>
        <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full" style={{ borderCollapse: "collapse", fontSize: "12px" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-2 py-1.5 font-bold"
                style={{
                  background: "var(--table-header-bg)",
                  color: "var(--table-header-text)",
                  borderBottom: "1px solid var(--table-border)",
                  borderRight: "1px solid var(--table-border)",
                  whiteSpace: "nowrap",
                  width: col.width,
                  textAlign: col.align || "left",
                  fontSize: "11px",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={rowKey(row)}
              className="transition-colors"
              style={{
                background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)",
                cursor: onRowClick ? "pointer" : "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--table-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)";
              }}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-2 py-1"
                  style={{
                    borderBottom: "1px solid var(--border-light)",
                    borderRight: "1px solid var(--border-light)",
                    whiteSpace: "nowrap",
                    textAlign: col.align || "left",
                  }}
                >
                  {col.render
                    ? col.render(row, idx)
                    : String((row as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const DataTable = memo(DataTableInner) as typeof DataTableInner;
export default DataTable;
