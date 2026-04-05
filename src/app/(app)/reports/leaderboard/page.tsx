/**
 * Producer Leaderboard — Full activity tracker and performance ranking
 * Client priority: "THIS IS HUGE" — calls, quotes, policies, follow-ups, missed tasks, conversion rate
 */
export default function LeaderboardPage() {
  const PRODUCERS = [
    { rank: 1, name: "Ahmed Bukhouri", office: "ADDISON/CPT", calls: 47, quotes: 18, policiesSold: 12, followUps: 35, missedTasks: 1, premium: "$14,200", convRate: "67%", score: 94 },
    { rank: 2, name: "Zika Bhaidani", office: "MONTFORT", calls: 42, quotes: 15, policiesSold: 10, followUps: 28, missedTasks: 3, premium: "$11,800", convRate: "67%", score: 87 },
    { rank: 3, name: "Sarah Martinez", office: "PEACHTREE", calls: 38, quotes: 14, policiesSold: 9, followUps: 32, missedTasks: 2, premium: "$10,500", convRate: "64%", score: 82 },
    { rank: 4, name: "James Wilson", office: "POLK", calls: 35, quotes: 11, policiesSold: 7, followUps: 22, missedTasks: 5, premium: "$8,900", convRate: "64%", score: 74 },
    { rank: 5, name: "Maria Lopez", office: "BADESTORE", calls: 29, quotes: 9, policiesSold: 6, followUps: 18, missedTasks: 4, premium: "$7,200", convRate: "67%", score: 68 },
    { rank: 6, name: "David Kim", office: "MONTFORT", calls: 25, quotes: 8, policiesSold: 5, followUps: 15, missedTasks: 6, premium: "$6,100", convRate: "63%", score: 62 },
    { rank: 7, name: "Jennifer Adams", office: "PEACHTREE", calls: 22, quotes: 7, policiesSold: 4, followUps: 12, missedTasks: 7, premium: "$4,800", convRate: "57%", score: 55 },
    { rank: 8, name: "Carlos Rivera", office: "POLK", calls: 18, quotes: 5, policiesSold: 3, followUps: 10, missedTasks: 8, premium: "$3,500", convRate: "60%", score: 48 },
  ];

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>
          Producer Leaderboard &amp; Activity Tracker
        </h2>
        <div className="flex gap-2">
          <select className="px-2 py-1" style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}>
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <select className="px-2 py-1" style={{ border: "1px solid var(--border)", fontSize: "12px", borderRadius: "2px" }}>
            <option>All Offices</option>
            <option>MONTFORT</option>
            <option>ADDISON/CPT</option>
            <option>PEACHTREE</option>
            <option>POLK</option>
            <option>BADESTORE</option>
          </select>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-6 gap-2 mb-3">
        {[
          { label: "Total Calls", value: "256", color: "var(--link)" },
          { label: "Total Quotes", value: "87", color: "var(--status-pending)" },
          { label: "Policies Sold", value: "56", color: "var(--status-active)" },
          { label: "Total Premium", value: "$67,000", color: "var(--btn-green-bg)" },
          { label: "Avg Conversion", value: "64%", color: "#8e44ad" },
          { label: "Missed Tasks", value: "36", color: "#e74c3c" },
        ].map((kpi) => (
          <div key={kpi.label} className="p-2" style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: `3px solid ${kpi.color}` }}>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Full leaderboard table */}
      <div style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
        <div className="am-section-green" style={{ cursor: "default" }}>
          Rankings — April 2026
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "12px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Rank", "Producer", "Office", "Calls Made", "Quotes Done", "Policies Sold", "Follow-ups", "Missed Tasks", "Written Premium", "Conversion Rate", "Activity Score"].map((h) => (
                  <th key={h} className="px-2 py-1.5 text-left font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", borderRight: "1px solid var(--table-border)", fontSize: "10px", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCERS.map((p, idx) => (
                <tr key={p.rank} style={{ background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)" }}>
                  <td className="px-2 py-1.5 text-center" style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : p.rank === 3 ? "🥉" : p.rank}
                  </td>
                  <td className="px-2 py-1.5" style={{ fontWeight: "bold", color: "var(--link)" }}>{p.name}</td>
                  <td className="px-2 py-1.5" style={{ color: "var(--text-secondary)" }}>{p.office}</td>
                  <td className="px-2 py-1.5 text-center">{p.calls}</td>
                  <td className="px-2 py-1.5 text-center">{p.quotes}</td>
                  <td className="px-2 py-1.5 text-center" style={{ fontWeight: "bold", color: "var(--status-active)" }}>{p.policiesSold}</td>
                  <td className="px-2 py-1.5 text-center">{p.followUps}</td>
                  <td className="px-2 py-1.5 text-center" style={{ color: p.missedTasks > 5 ? "#e74c3c" : "var(--text)", fontWeight: p.missedTasks > 5 ? "bold" : "normal" }}>
                    {p.missedTasks}
                  </td>
                  <td className="px-2 py-1.5 text-right" style={{ fontWeight: "bold" }}>{p.premium}</td>
                  <td className="px-2 py-1.5 text-center">{p.convRate}</td>
                  <td className="px-2 py-1.5 text-center">
                    <span className="inline-block px-2 py-0.5 text-white rounded-sm" style={{
                      background: p.score >= 90 ? "var(--status-active)" : p.score >= 70 ? "var(--status-pending)" : p.score >= 50 ? "#e67e22" : "#e74c3c",
                      fontSize: "11px", fontWeight: "bold",
                    }}>
                      {p.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
