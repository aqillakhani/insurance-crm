"use client";

/**
 * CustomerTags — Tag section with selector matching Agency Matrix
 * Reference: Screenshots 4, 6 — "No Customer Tags Found" with "Select A Tag" dropdown
 */
export default function CustomerTags() {
  return (
    <div className="mx-3 my-1">
      <div
        className="px-2 py-1"
        style={{
          background: "#cce5ff",
          border: "1px solid #b8daff",
          fontSize: "12px",
          color: "#004085",
        }}
      >
        <div className="flex items-center justify-between">
          <span>
            <strong>Customer Tags:</strong> No Customer Tags Found
          </span>
          <div className="flex items-center gap-1">
            <select
              className="px-2 py-0.5"
              style={{
                fontSize: "11px",
                border: "1px solid var(--border)",
                borderRadius: "2px",
              }}
            >
              <option>Select A Tag</option>
            </select>
            <button
              className="px-1"
              style={{
                fontSize: "14px",
                background: "var(--btn-green-bg)",
                color: "white",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                lineHeight: "1",
                padding: "2px 6px",
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
