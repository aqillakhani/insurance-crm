import Link from "next/link";
import { getDashboardData } from "@/modules/dashboard/queries";

/**
 * Dashboard — Sales + Operations Command Center with REAL data
 */
export default async function DashboardPage() {
  const data = await getDashboardData();

  const KPI_CARDS = [
    { label: "Active Policies", value: data.totalPolicies.toLocaleString(), color: "var(--status-active)", delta: "In force" },
    { label: "Active Customers", value: data.totalCustomers.toLocaleString(), color: "var(--link)", delta: "Total accounts" },
    { label: "Open Tasks", value: data.openTasks.toLocaleString(), color: "var(--status-pending)", delta: `${data.overdueTasks} overdue` },
    { label: "Pending Quotes", value: data.pendingQuotes.toLocaleString(), color: "var(--header-bg)", delta: "Awaiting response" },
    { label: "Renewals Due (30d)", value: data.renewalsDue.toLocaleString(), color: "#8e44ad", delta: "Next 30 days" },
    { label: "Offices", value: data.offices.length.toLocaleString(), color: "var(--btn-green-bg)", delta: "Active locations" },
  ];

  return (
    <div className="p-3">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-6 gap-2 mb-3" data-tour="kpi-cards">
        {KPI_CARDS.map((kpi) => (
          <div
            key={kpi.label}
            className="p-2"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: `3px solid ${kpi.color}` }}
          >
            <div style={{ fontSize: "22px", fontWeight: "bold", color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text)" }}>{kpi.label}</div>
            <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>{kpi.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* LEFT COLUMN */}
        <div>
          {/* Producer Leaderboard */}
          <div className="am-section-green" data-tour="leaderboard">Producer Leaderboard</div>
          <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: "none" }}>
            <table className="w-full" style={{ fontSize: "11px", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["#", "Producer", "Office", "Policies", "Quotes", "Tasks"].map((h) => (
                    <th key={h} className="px-2 py-1 text-left font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", fontSize: "10px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.leaderboard.map((p, idx) => (
                  <tr key={p.name} style={{ background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)" }}>
                    <td className="px-2 py-1 font-bold">
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                    </td>
                    <td className="px-2 py-1 font-bold">{p.name}</td>
                    <td className="px-2 py-1" style={{ color: "var(--text-secondary)" }}>{p.office}</td>
                    <td className="px-2 py-1 text-center" style={{ fontWeight: "bold", color: "var(--status-active)" }}>{p.policiesSold}</td>
                    <td className="px-2 py-1 text-center">{p.quotes}</td>
                    <td className="px-2 py-1 text-center">{p.tasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-2 py-1 text-right" style={{ borderTop: "1px solid var(--border-light)" }}>
              <Link href="/reports/leaderboard" style={{ fontSize: "11px", color: "var(--link)" }}>View Full Leaderboard →</Link>
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="mt-3">
            <div className="am-section-green" data-tour="open-tasks">Open Tasks ({data.tasksList.length})</div>
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: "none" }}>
              {data.tasksList.length === 0 ? (
                <div className="p-4 text-center" style={{ color: "var(--text-muted)", fontSize: "12px" }}>No pending tasks</div>
              ) : (
                <table className="w-full" style={{ fontSize: "11px", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Task", "Customer", "Priority", "Assigned", "Due"].map((h) => (
                        <th key={h} className="px-2 py-1 text-left font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", fontSize: "10px" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.tasksList.map((t, idx) => {
                      const isOverdue = t.dueDate && t.dueDate < new Date();
                      return (
                        <tr key={t.id} style={{ background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)" }}>
                          <td className="px-2 py-1" style={{ color: "var(--link)" }}>{t.title}</td>
                          <td className="px-2 py-1">{t.customer ? `${t.customer.lastName}, ${t.customer.firstName}` : ""}</td>
                          <td className="px-2 py-1">
                            <span style={{ color: t.priority === "high" ? "#e74c3c" : "var(--text)", fontWeight: t.priority === "high" ? "bold" : "normal" }}>
                              {t.priority}
                            </span>
                          </td>
                          <td className="px-2 py-1">{t.assignedTo ? `${t.assignedTo.firstName} ${t.assignedTo.lastName.charAt(0)}.` : ""}</td>
                          <td className="px-2 py-1">
                            <span style={{ color: isOverdue ? "#e74c3c" : "var(--text)", fontWeight: isOverdue ? "bold" : "normal" }}>
                              {isOverdue ? "Overdue" : t.dueDate ? t.dueDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }) : ""}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* Recent Payments */}
          <div className="am-section-green" data-tour="recent-payments">Recent Payments</div>
          <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: "none" }}>
            <table className="w-full" style={{ fontSize: "11px", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Customer", "Carrier", "Amount", "Date"].map((h) => (
                    <th key={h} className="px-2 py-1 text-left font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", fontSize: "10px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recentPayments.slice(0, 8).map((p, idx) => (
                  <tr key={p.id} style={{ background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)" }}>
                    <td className="px-2 py-1 font-bold" style={{ color: "var(--link)" }}>
                      {p.customer ? `${p.customer.lastName}, ${p.customer.firstName}` : ""}
                    </td>
                    <td className="px-2 py-1">{p.carrier?.name || ""}</td>
                    <td className="px-2 py-1 text-right font-bold">${p.amountTendered.toFixed(2)}</td>
                    <td className="px-2 py-1">{p.paymentDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className="mt-3">
            <div className="am-section-green" data-tour="quick-actions">Quick Actions</div>
            <div className="flex flex-wrap gap-2 p-3" style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: "none" }}>
              {[
                { label: "Add Customer", href: "/customers/new", green: true },
                { label: "Search Customers", href: "/customers" },
                { label: "SMS Campaign", href: "/communications/sms" },
                { label: "Reports", href: "/reports" },
                { label: "End Of Day", href: "/reports/eod" },
                { label: "Calendar", href: "/calendar" },
              ].map((action) => (
                <Link key={action.label} href={action.href}
                  className="px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: action.green ? "var(--btn-green-bg)" : "var(--action-btn-bg)",
                    color: "white",
                    border: `1px solid ${action.green ? "var(--btn-green-hover)" : "var(--action-btn-hover)"}`,
                    borderRadius: "2px",
                    textDecoration: "none",
                    fontSize: "11px",
                  }}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Branch Stats */}
          <div className="mt-3">
            <div className="am-section-green">Office Overview</div>
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: "none" }}>
              <table className="w-full" style={{ fontSize: "11px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Office", "Customers"].map((h) => (
                      <th key={h} className="px-2 py-1 text-left font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", fontSize: "10px" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.offices.map((o, idx) => (
                    <tr key={o.id} style={{ background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)" }}>
                      <td className="px-2 py-1 font-bold">{o.code || o.name}</td>
                      <td className="px-2 py-1 text-center">{o._count.customers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
