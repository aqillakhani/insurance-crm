"use client";

import { useState, useRef, useEffect } from "react";

/**
 * ToolsPanel — Right-side dropdown/flyout matching Agency Matrix "Tools" panel
 * Reference: Screenshot 5 — shows ACORD/Custom Forms, Add New Policy, Add Note, etc.
 */

interface ToolsPanelProps {
  customerId: string;
}

const TOOLS = [
  { label: "ACORD/Custom Forms", action: "acord" },
  { label: "Add New Policy", action: "add-policy" },
  { label: "Add Note", action: "add-note" },
  { label: "Thank You Letter", action: "thank-you" },
  { label: "Add Change Request", action: "change-request" },
  { label: "Mailing Services", action: "mailing" },
  { label: "Custom Letter", action: "custom-letter" },
];

export default function ToolsPanel({ customerId }: ToolsPanelProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 text-xs font-medium"
        style={{
          background: "var(--action-btn-bg)",
          color: "var(--action-btn-text)",
          border: "1px solid var(--action-btn-hover)",
          borderRadius: "2px",
          cursor: "pointer",
          fontSize: "11px",
        }}
      >
        Tools ▼
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 py-1"
          style={{
            background: "#ffffff",
            border: "1px solid var(--border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            minWidth: "200px",
          }}
        >
          <div
            className="px-3 py-1 font-bold"
            style={{
              fontSize: "12px",
              color: "var(--text)",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            Tools
          </div>
          {TOOLS.map((tool) => (
            <button
              key={tool.action}
              className="block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-xs"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--link)",
                fontSize: "12px",
              }}
              onClick={() => {
                // Tool actions will be implemented per action type
                setOpen(false);
              }}
            >
              {tool.label}
            </button>
          ))}

          {/* Custom Letter dropdown */}
          <div
            className="px-3 py-1.5"
            style={{
              borderTop: "1px solid var(--border-light)",
              fontSize: "12px",
            }}
          >
            <span style={{ color: "var(--text)", fontSize: "11px" }}>Custom Letter:</span>
            <select
              className="w-full mt-1 px-1 py-0.5"
              style={{
                fontSize: "11px",
                border: "1px solid var(--border)",
                borderRadius: "2px",
              }}
            >
              <option>Select A Letter</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
