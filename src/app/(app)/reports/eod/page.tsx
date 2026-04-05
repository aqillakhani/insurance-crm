"use client";

/**
 * End Of Day Report — matches Agency Matrix EOD page
 * Reference: Screenshot 2
 * Structure Selection (Territory > Division > Region > District > Office)
 * Customer Type Selection (Type, Sub Type)
 * Report Selection (Employee, Date Range, Start/End Date, Report Type)
 */

export default function EODReportPage() {
  return (
    <div className="p-3">
      <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>
        End Of Day
      </h2>

      <div style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
        {/* Structure Selection */}
        <div className="am-section-green" style={{ cursor: "default" }}>
          Structure Selection
        </div>
        <div className="grid grid-cols-2 gap-3 p-3">
          <div>
            <label className="am-label block mb-1">Territory:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>Default</option>
            </select>
          </div>
          <div>
            <label className="am-label block mb-1">Division:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>All</option>
            </select>
          </div>
          <div>
            <label className="am-label block mb-1">Region:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>United States</option>
            </select>
          </div>
          <div>
            <label className="am-label block mb-1">District:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>All</option>
              <option>BADESTORE</option>
              <option>MONTFORT</option>
              <option>PEACHTREE</option>
              <option>POLK</option>
            </select>
          </div>
          <div>
            <label className="am-label block mb-1">Office:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>All</option>
              <option>California</option>
            </select>
          </div>
        </div>

        {/* Customer Type Selection */}
        <div className="am-section-green" style={{ cursor: "default" }}>
          Customer Type Selection
        </div>
        <div className="grid grid-cols-2 gap-3 p-3">
          <div>
            <label className="am-label block mb-1">Type:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>— Select a Type —</option>
              <option>Personal Lines</option>
              <option>Commercial Lines</option>
            </select>
          </div>
          <div>
            <label className="am-label block mb-1">Sub Type:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>— Select a Sub Type —</option>
            </select>
          </div>
        </div>

        {/* Report Selection */}
        <div className="am-section-green" style={{ cursor: "default" }}>
          Report Selection
        </div>
        <div className="grid grid-cols-2 gap-3 p-3">
          <div>
            <label className="am-label block mb-1">Employee:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>All Employees</option>
            </select>
          </div>
          <div>
            <label className="am-label block mb-1">Date Range:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>Date Range</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div>
            <label className="am-label block mb-1">Start Date:</label>
            <input
              type="date"
              defaultValue="2026-04-04"
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            />
          </div>
          <div>
            <label className="am-label block mb-1">End Date:</label>
            <input
              type="date"
              defaultValue="2026-04-04"
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            />
          </div>
          <div>
            <label className="am-label block mb-1">Report Type:</label>
            <select
              className="w-full px-2 py-1"
              style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}
            >
              <option>Summary</option>
              <option>Detail</option>
            </select>
          </div>
        </div>

        {/* Run button */}
        <div className="p-3 flex justify-end">
          <button
            className="px-4 py-1.5 text-xs font-bold"
            style={{
              background: "var(--btn-green-bg)",
              color: "var(--btn-green-text)",
              border: "1px solid var(--btn-green-hover)",
              borderRadius: "2px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Run Report
          </button>
        </div>
      </div>
    </div>
  );
}
