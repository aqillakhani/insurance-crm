import { getCustomerPolicies } from "@/modules/customers/queries";
import ActionBar from "@/components/ui/ActionBar";
import DataTable from "@/components/ui/DataTable";

/**
 * Policies Tab — real data
 * Reference: Screenshot 6
 */

interface PolicyDisplay {
  id: string;
  company: string;
  status: string;
  type: string;
  class: string;
  policyNumber: string;
  version: number;
  dueDate: string;
  effDate: string;
  expCanDate: string;
  premium: string;
}

export default async function PoliciesTab({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const policies = await getCustomerPolicies(id);

  const displayData: PolicyDisplay[] = policies.map((p) => ({
    id: p.id,
    company: p.carrier?.name || "",
    status: p.status,
    type: p.type || "",
    class: p.class || "",
    policyNumber: p.policyNumber || "",
    version: p.version,
    dueDate: p.dueDate ? p.dueDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "",
    effDate: p.effectiveDate ? p.effectiveDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "",
    expCanDate: p.expirationCancelDate ? p.expirationCancelDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "",
    premium: `$${p.premium.toFixed(2)}`,
  }));

  const columns = [
    { key: "company", header: "Company" },
    {
      key: "status",
      header: "Status",
      render: (row: PolicyDisplay) => (
        <span style={{ color: row.status === "Active" ? "var(--status-active)" : "var(--text)", fontWeight: "bold" }}>
          {row.status}
        </span>
      ),
    },
    { key: "type", header: "Type" },
    { key: "class", header: "Class" },
    {
      key: "policyNumber",
      header: "Policy",
      render: (row: PolicyDisplay) => <span>{row.policyNumber} {row.version}</span>,
    },
    { key: "dueDate", header: "Due" },
    { key: "effDate", header: "Eff Date" },
    { key: "expCanDate", header: "Exp/Can Date" },
    { key: "premium", header: "Premium", align: "right" as const },
    {
      key: "edit",
      header: "Edit",
      width: "50px",
      render: () => (
        <button className="text-xs px-1" style={{ color: "var(--link)", background: "none", border: "1px solid var(--border)", cursor: "pointer", borderRadius: "2px" }}>
          Edit
        </button>
      ),
    },
    {
      key: "details",
      header: "Details",
      width: "55px",
      render: () => (
        <button className="text-xs px-1" style={{ color: "var(--link)", background: "none", border: "1px solid var(--border)", cursor: "pointer", borderRadius: "2px" }}>
          Details
        </button>
      ),
    },
  ];

  return (
    <div>
      <ActionBar actions={[{ label: "SL" }, { label: "Action ▼" }]} />
      <DataTable<PolicyDisplay>
        columns={columns}
        data={displayData}
        emptyMessage="No Policies Found"
        rowKey={(row) => row.id}
      />
    </div>
  );
}
