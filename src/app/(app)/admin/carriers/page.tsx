"use client";

import { useEffect, useState } from "react";

interface CarrierData {
  id: string;
  name: string;
  code: string;
  linesOffered: string;
  appointmentStatus: string;
  policyCount: number;
}

export default function CarriersPage() {
  const [carriers, setCarriers] = useState<CarrierData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/carriers")
      .then(r => r.json())
      .then(data => { setCarriers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-3">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>Carrier Management</h2>
        <div className="animate-pulse"><div className="h-8 bg-gray-200 rounded mb-2" /><div className="h-40 bg-gray-100 rounded" /></div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>Carrier Management</h2>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{carriers.length} carriers</span>
      </div>

      <div className="am-section-green mb-0">Appointed Carriers</div>
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr>
              {["Carrier Name", "Code", "Lines Offered", "Status", "Policies"].map(h => (
                <th key={h} className="text-left px-2 py-1.5 font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", fontSize: "11px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {carriers.map((c, idx) => (
              <tr key={c.id} style={{ background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)" }}>
                <td className="px-2 py-1" style={{ fontWeight: "bold", color: "var(--link)" }}>{c.name}</td>
                <td className="px-2 py-1">{c.code}</td>
                <td className="px-2 py-1">{c.linesOffered}</td>
                <td className="px-2 py-1"><span style={{ color: "#27ae60", fontWeight: "bold" }}>{c.appointmentStatus}</span></td>
                <td className="px-2 py-1 text-center">{c.policyCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
