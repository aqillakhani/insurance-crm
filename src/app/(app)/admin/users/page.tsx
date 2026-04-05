export const dynamic = "force-dynamic";

import { getUsers } from "@/modules/admin/queries";
import DataTable from "@/components/ui/DataTable";
import { formatDate } from "@/lib/utils";

/**
 * User Management — real data from database
 */

interface UserDisplay {
  id: string;
  name: string;
  email: string;
  role: string;
  office: string;
  status: string;
  lastLogin: string;
}

export default async function UsersPage() {
  const users = await getUsers();

  const displayData: UserDisplay[] = users.map((u) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    role: u.role?.name || "—",
    office: u.office?.code || u.office?.name || "—",
    status: u.status,
    lastLogin: u.lastLoginAt ? formatDate(u.lastLoginAt, "datetime") : "Never",
  }));

  const columns = [
    { key: "name", header: "Name", render: (row: UserDisplay) => <span style={{ fontWeight: "bold", color: "var(--link)" }}>{row.name}</span> },
    { key: "email", header: "Email" },
    {
      key: "role",
      header: "Role",
      render: (row: UserDisplay) => (
        <span
          className="inline-block px-1.5 py-0.5 rounded-sm"
          style={{
            background: row.role === "Admin" ? "#1a5276" : row.role === "Manager" ? "#8e44ad" : row.role === "Producer" ? "var(--status-active)" : "var(--status-pending)",
            color: "white",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        >
          {row.role}
        </span>
      ),
    },
    { key: "office", header: "Office" },
    {
      key: "status",
      header: "Status",
      render: (row: UserDisplay) => (
        <span style={{ color: row.status === "active" ? "var(--status-active)" : "var(--status-cancelled)", fontWeight: "bold" }}>
          {row.status}
        </span>
      ),
    },
    { key: "lastLogin", header: "Last Login" },
  ];

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>
          User Management
        </h2>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          {users.length} users total
        </span>
      </div>

      <DataTable<UserDisplay>
        columns={columns}
        data={displayData}
        emptyMessage="No Users Found"
        rowKey={(row) => row.id}
      />
    </div>
  );
}
