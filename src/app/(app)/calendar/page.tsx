"use client";

import { useState } from "react";

/**
 * Calendar — Per-producer appointment calendar
 * Client priority: Built-in calendar, appointment booking, show/close rates
 */

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MOCK_APPOINTMENTS = [
  { day: 4, time: "9:00 AM", customer: "John Smith", type: "Quote Review", producer: "Ahmed B." },
  { day: 4, time: "11:00 AM", customer: "Maria Garcia", type: "Renewal", producer: "Zika B." },
  { day: 4, time: "2:00 PM", customer: "New Lead — Web", type: "Initial Call", producer: "Ahmed B." },
  { day: 7, time: "10:00 AM", customer: "Robert Chen", type: "Policy Review", producer: "Sarah M." },
  { day: 8, time: "3:00 PM", customer: "Lisa Park", type: "Claim Follow-up", producer: "James W." },
  { day: 9, time: "9:30 AM", customer: "Walk-in", type: "New Quote", producer: "Zika B." },
];

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("week");

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>
          Calendar — April 2026
        </h2>
        <div className="flex gap-2">
          {(["day", "week", "month"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 py-1 text-xs font-medium capitalize"
              style={{
                background: view === v ? "var(--action-btn-bg)" : "var(--tab-bg)",
                color: view === v ? "white" : "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              {v}
            </button>
          ))}
          <button className="px-3 py-1 text-xs font-bold" style={{ background: "var(--btn-green-bg)", color: "white", border: "1px solid var(--btn-green-hover)", borderRadius: "2px", cursor: "pointer" }}>
            + New Appointment
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {[
          { label: "Appointments Today", value: "3", color: "var(--link)" },
          { label: "This Week", value: "14", color: "var(--status-active)" },
          { label: "Show Rate", value: "87%", color: "var(--btn-green-bg)" },
          { label: "Close Rate (from appts)", value: "42%", color: "var(--status-pending)" },
        ].map((kpi) => (
          <div key={kpi.label} className="p-2" style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: `3px solid ${kpi.color}` }}>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {/* Calendar grid */}
        <div className="col-span-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          <div className="am-section-green" style={{ cursor: "default" }}>Week of April 4 - 10, 2026</div>
          <table className="w-full" style={{ fontSize: "11px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {DAYS.map((d) => (
                  <th key={d} className="px-2 py-1 text-center font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", borderRight: "1px solid var(--table-border)" }}>
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Array.from({ length: 7 }, (_, i) => i + 4).map((day) => {
                  const dayAppts = MOCK_APPOINTMENTS.filter((a) => a.day === day);
                  return (
                    <td key={day} className="px-1 py-1 align-top" style={{ borderRight: "1px solid var(--table-border)", borderBottom: "1px solid var(--table-border)", minHeight: "120px", width: "14.28%" }}>
                      <div style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "4px", color: day === 4 ? "var(--link)" : "var(--text)" }}>
                        {day}
                      </div>
                      {dayAppts.map((a, idx) => (
                        <div key={idx} className="mb-1 px-1 py-0.5 rounded-sm cursor-pointer" style={{ background: "#e8f4fd", fontSize: "10px", border: "1px solid #bee3f8" }}>
                          <div style={{ fontWeight: "bold" }}>{a.time}</div>
                          <div>{a.customer}</div>
                          <div style={{ color: "var(--text-muted)" }}>{a.type}</div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Today's Schedule sidebar */}
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          <div className="am-section-green" style={{ cursor: "default" }}>Today&apos;s Schedule</div>
          {MOCK_APPOINTMENTS.filter((a) => a.day === 4).map((a, idx) => (
            <div key={idx} className="p-2" style={{ borderBottom: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "var(--link)" }}>{a.time}</div>
              <div style={{ fontSize: "12px", fontWeight: "bold" }}>{a.customer}</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{a.type}</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Producer: {a.producer}</div>
            </div>
          ))}
          {MOCK_APPOINTMENTS.filter((a) => a.day === 4).length === 0 && (
            <div className="p-4 text-center" style={{ color: "var(--text-muted)", fontSize: "12px" }}>
              No appointments today
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
