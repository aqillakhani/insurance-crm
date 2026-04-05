export const dynamic = "force-dynamic";

import { getCarriers } from "@/modules/admin/queries";
import DataTable from "@/components/ui/DataTable";

/**
 * Carrier Management — real data
 */

interface CarrierDisplay {
  id: string;
  name: string;
  code: string;
  linesOffered: string;
  appointmentStatus: string;
  policyCount: number;
}

export default async function CarriersPage() {
  const carriers = await getCarriers();

  const displayData: CarrierDisplay[] = carriers.map((c) => ({
    id: c.id,
    name: c.name,
    code: c.code || "—",
    linesOffered: c.linesOffered || "—",
    appointmentStatus: c.appointmentStatus,
    policyCount: c._count.policies,
  }));

  const columns = [
    { key: "name", header: "Carrier Name", render: (row: CarrierDisplay) => <span style={{ fontWeight: "bold", color: "var(--link)" }}>{row.name}</span> },
    { key: "code", header: "Code" },
    { key: "linesOffered", header: "Lines Offered" },
    {
      key: "appointmentStatus",
      header: "Status",
      render: (row: CarrierDisplay) => (
        <span style={{ color: row.appointmentStatus === "active" ? "var(--status-active)" : "var(--text-muted)", fontWeight: "bold" }}>
          {row.appointmentStatus}
        </span>
      ),
    },
    { key: "policyCount", header: "Policies", align: "center" as const },
  ];

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>
          Carrier Management
        </h2>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          {carriers.length} carriers
        </span>
      </div>

      <div className="am-section-green mb-0">Appointed Carriers</div>
      <DataTable<CarrierDisplay>
        columns={columns}
        data={displayData}
        emptyMessage="No Carriers Found"
        rowKey={(row) => row.id}
      />
    </div>
  );
}
