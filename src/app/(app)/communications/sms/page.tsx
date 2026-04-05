"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * SMS Campaigns — Bulk SMS sending system
 * Client priority: Communication Engine with bulk SMS, smart triggers, tag-based campaigns
 */
export default function SMSCampaignsPage() {
  const [selectedTag, setSelectedTag] = useState("");

  return (
    <div className="p-3">
      <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>
        SMS Campaigns
      </h2>

      <div className="grid grid-cols-3 gap-3 mb-3">
        {[
          { label: "Messages Sent (MTD)", value: "2,340", color: "var(--status-active)" },
          { label: "Delivery Rate", value: "98.2%", color: "var(--link)" },
          { label: "Response Rate", value: "34%", color: "var(--status-pending)" },
        ].map((kpi) => (
          <div key={kpi.label} className="p-2" style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: `3px solid ${kpi.color}` }}>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* New Campaign */}
        <div>
          <SectionHeader title="New Campaign" variant="green">
            <div className="p-3" style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: "none" }}>
              <div className="mb-2">
                <label className="am-label block mb-1">Campaign Name:</label>
                <input type="text" className="w-full px-2 py-1" placeholder="e.g., April Renewal Reminders" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }} />
              </div>
              <div className="mb-2">
                <label className="am-label block mb-1">Target Audience (Tag):</label>
                <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="w-full px-2 py-1" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }}>
                  <option value="">Select a tag...</option>
                  <option value="renewal-due">Renewal Due</option>
                  <option value="payment-overdue">Payment Overdue</option>
                  <option value="new-customers">New Customers</option>
                  <option value="auto-policy">Auto Policy Holders</option>
                  <option value="all-active">All Active Customers</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="am-label block mb-1">Message:</label>
                <textarea rows={4} className="w-full px-2 py-1" placeholder="Hi {firstName}, your policy renewal is coming up on {expirationDate}. Call us at (214) 555-0100 to review your options!" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px", resize: "vertical" }} />
                <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Variables: {"{firstName}"}, {"{lastName}"}, {"{policyNumber}"}, {"{expirationDate}"}, {"{amountDue}"}
                </div>
              </div>
              <div className="mb-2">
                <label className="am-label block mb-1">Schedule:</label>
                <div className="flex gap-2">
                  <select className="px-2 py-1" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }}>
                    <option>Send Now</option>
                    <option>Schedule for Later</option>
                  </select>
                  <input type="datetime-local" className="px-2 py-1" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }} />
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1.5 text-xs font-bold" style={{ background: "var(--btn-green-bg)", color: "var(--btn-green-text)", border: "1px solid var(--btn-green-hover)", borderRadius: "2px", cursor: "pointer" }}>
                  Send Campaign
                </button>
                <button className="px-3 py-1.5 text-xs" style={{ background: "var(--tab-bg)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer" }}>
                  Preview
                </button>
              </div>
            </div>
          </SectionHeader>
        </div>

        {/* Smart Triggers */}
        <div>
          <SectionHeader title="Active Smart Triggers" variant="green">
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderTop: "none" }}>
              <table className="w-full" style={{ fontSize: "11px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Trigger", "Message", "Status", "Sent (MTD)", ""].map((h) => (
                      <th key={h} className="px-2 py-1 text-left font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", fontSize: "10px" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { trigger: "Payment Due — 7 days", message: "Reminder: Your payment of {amountDue}...", status: "Active", sent: 89 },
                    { trigger: "Payment Due — 2 days", message: "Your policy payment is due in 2 days...", status: "Active", sent: 45 },
                    { trigger: "Payment Due — Same day", message: "URGENT: Payment due today for policy...", status: "Active", sent: 23 },
                    { trigger: "Missed Payment", message: "We noticed a missed payment on your...", status: "Active", sent: 12 },
                    { trigger: "Welcome New Customer", message: "Welcome to City Auto Insurance! Your...", status: "Active", sent: 67 },
                    { trigger: "Renewal — 30 days", message: "Your policy renews on {expirationDate}...", status: "Paused", sent: 0 },
                  ].map((t, idx) => (
                    <tr key={idx} style={{ background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)" }}>
                      <td className="px-2 py-1 font-bold">{t.trigger}</td>
                      <td className="px-2 py-1" style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.message}</td>
                      <td className="px-2 py-1">
                        <span style={{ color: t.status === "Active" ? "var(--status-active)" : "var(--text-muted)", fontWeight: "bold" }}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-2 py-1 text-center">{t.sent}</td>
                      <td className="px-2 py-1">
                        <button className="text-xs px-1" style={{ color: "var(--link)", background: "none", border: "1px solid var(--border)", cursor: "pointer", borderRadius: "2px" }}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionHeader>
        </div>
      </div>
    </div>
  );
}
