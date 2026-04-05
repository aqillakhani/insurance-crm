"use client";

import { useEffect, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  office: string;
  status: string;
  lastLogin: string | null;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const roleColors: Record<string, string> = {
    Admin: "#1a5276",
    Manager: "#8e44ad",
    Producer: "#27ae60",
    CSR: "#f39c12",
  };

  if (loading) {
    return (
      <div className="p-3">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>User Management</h2>
        <div className="animate-pulse"><div className="h-8 bg-gray-200 rounded mb-2" /><div className="h-48 bg-gray-100 rounded" /></div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>User Management</h2>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{users.length} users total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr>
              {["Name", "Email", "Role", "Office", "Status", "Last Login"].map(h => (
                <th key={h} className="text-left px-2 py-1.5 font-bold" style={{ background: "var(--table-header-bg)", borderBottom: "1px solid var(--table-border)", fontSize: "11px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u.id} style={{ background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)" }}>
                <td className="px-2 py-1" style={{ fontWeight: "bold", color: "var(--link)" }}>{u.name}</td>
                <td className="px-2 py-1">{u.email}</td>
                <td className="px-2 py-1">
                  <span className="inline-block px-1.5 py-0.5 rounded-sm text-white" style={{ background: roleColors[u.role] || "#666", fontSize: "10px", fontWeight: "bold" }}>
                    {u.role}
                  </span>
                </td>
                <td className="px-2 py-1">{u.office}</td>
                <td className="px-2 py-1"><span style={{ color: u.status === "active" ? "#27ae60" : "#e74c3c", fontWeight: "bold" }}>{u.status}</span></td>
                <td className="px-2 py-1" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "Never"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
