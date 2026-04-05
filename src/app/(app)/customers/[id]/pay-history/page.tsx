import { getCustomerPayments } from "@/modules/customers/queries";
import DataTable from "@/components/ui/DataTable";

/**
 * Pay History Tab — real data
 * Reference: Screenshot 11
 */

interface PaymentDisplay {
  id: string;
  receiptRef: string;
  office: string;
  company: string;
  policy: string;
  status: string;
  amountBilled: string;
  amountTendered: string;
  date: string;
}

export default async function PayHistoryTab({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payments = await getCustomerPayments(id);

  const displayData: PaymentDisplay[] = payments.map((p) => ({
    id: p.id,
    receiptRef: p.receiptRef || "",
    office: p.office?.code || "",
    company: p.carrier?.name || "",
    policy: p.policy?.policyNumber || "",
    status: p.status,
    amountBilled: `$${p.amountBilled.toFixed(2)}`,
    amountTendered: `$${p.amountTendered.toFixed(2)}`,
    date: p.paymentDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
  }));

  const columns = [
    { key: "receiptRef", header: "Receipt#/Ref" },
    { key: "office", header: "Office" },
    { key: "company", header: "Company" },
    { key: "policy", header: "Policy" },
    {
      key: "status",
      header: "Status",
      render: (row: PaymentDisplay) => (
        <span style={{ color: "var(--status-active)" }}>{row.status}</span>
      ),
    },
    { key: "amountBilled", header: "Amount Billed", align: "right" as const },
    { key: "amountTendered", header: "Amount Tendered", align: "right" as const },
    { key: "date", header: "Date" },
  ];

  return (
    <div>
      <div className="px-2 py-1" style={{ background: "#e8eef4", borderBottom: "1px solid var(--border)", fontSize: "12px", fontWeight: "bold" }}>
        Payment History
      </div>
      <DataTable<PaymentDisplay>
        columns={columns}
        data={displayData}
        emptyMessage="No Payment History Found"
        rowKey={(row) => row.id}
      />
    </div>
  );
}
