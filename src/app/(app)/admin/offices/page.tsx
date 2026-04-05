"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

/**
 * Office Management — client component to avoid server/client serialization issues
 */

interface OfficeData {
  id: string;
  name: string;
  code: string;
  district: string;
  userCount: number;
  customerCount: number;
  status: string;
}

export default function OfficesPage() {
  const [offices, setOffices] = useState<OfficeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/offices")
      .then(r => r.json())
      .then(data => { setOffices(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-3">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>Office Management</h2>
        <div className="animate-pulse"><div className="h-8 bg-gray-200 rounded mb-2" /><div className="h-40 bg-gray-100 rounded" /></div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>Office Management</h2>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{offices.length} offices</span>
      </div>

      <div className="am-section-green mb-0">Branch Offices</div>
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr>
              {["Office Name", "Code", "District", "Users", "Customers", "Status"].map(h => (
                <th key={h} className="text-left px-2 py-1.5 font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", fontSize: "11px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {offices.map((o, idx) => (
              <tr key={o.id} style={{ background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)" }}>
                <td className="px-2 py-1" style={{ fontWeight: "bold", color: "var(--link)" }}>{o.name}</td>
                <td className="px-2 py-1">{o.code}</td>
                <td className="px-2 py-1">{o.district}</td>
                <td className="px-2 py-1 text-center">{o.userCount}</td>
                <td className="px-2 py-1 text-center">{o.customerCount}</td>
                <td className="px-2 py-1"><span style={{ color: "var(--status-active)", fontWeight: "bold" }}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
