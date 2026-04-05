export const dynamic = "force-dynamic";

import { getOffices } from "@/modules/admin/queries";
import DataTable from "@/components/ui/DataTable";

/**
 * Office Management — real data from database
 */

interface OfficeDisplay {
  id: string;
  name: string;
  code: string;
  district: string;
  userCount: number;
  customerCount: number;
  status: string;
}

export default async function OfficesPage() {
  const offices = await getOffices();

  const displayData: OfficeDisplay[] = offices.map((o) => ({
    id: o.id,
    name: o.name,
    code: o.code || "—",
    district: o.district?.name || "—",
    userCount: o._count.users,
    customerCount: o._count.customers,
    status: o.isActive ? "Active" : "Inactive",
  }));

  const columns = [
    { key: "name", header: "Office Name", render: (row: OfficeDisplay) => <span style={{ fontWeight: "bold", color: "var(--link)" }}>{row.name}</span> },
    { key: "code", header: "Code" },
    { key: "district", header: "District" },
    { key: "userCount", header: "Users", align: "center" as const },
    { key: "customerCount", header: "Customers", align: "center" as const },
    {
      key: "status",
      header: "Status",
      render: (row: OfficeDisplay) => (
        <span style={{ color: row.status === "Active" ? "var(--status-active)" : "var(--status-cancelled)", fontWeight: "bold" }}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>
          Office Management
        </h2>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          {offices.length} offices
        </span>
      </div>

      <div className="am-section-green mb-0">Branch Offices</div>
      <DataTable<OfficeDisplay>
        columns={columns}
        data={displayData}
        emptyMessage="No Offices Found"
        rowKey={(row) => row.id}
      />
    </div>
  );
}
