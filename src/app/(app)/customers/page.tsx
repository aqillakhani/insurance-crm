import Link from "next/link";
import { getCustomers } from "@/modules/customers/queries";
import DataTable from "@/components/ui/DataTable";
import CustomerSearchBar from "@/components/customers/CustomerSearchBar";

/**
 * Customer List / Search — server component with real data
 */

interface CustomerRow {
  id: string;
  customerIdDisplay: string;
  firstName: string;
  lastName: string;
  customerType: string;
  status: string;
  email: string | null;
  cell: string | null;
  officeName: string;
  agentName: string;
  dateAdded: string;
  policyCount: number;
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const search = params.q || "";
  const rawCustomers = await getCustomers(search || undefined);

  const customers: CustomerRow[] = rawCustomers.map((c) => ({
    id: c.id,
    customerIdDisplay: c.customerIdDisplay,
    firstName: c.firstName,
    lastName: c.lastName,
    customerType: c.customerType,
    status: c.status,
    email: c.email,
    cell: c.cell,
    officeName: c.office?.code || c.office?.name || "",
    agentName: c.agentOfRecord ? `${c.agentOfRecord.firstName} ${c.agentOfRecord.lastName}` : "",
    dateAdded: c.dateAdded.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
    policyCount: c._count.policies,
  }));

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}>
          Customer Search
        </h2>
        <Link
          href="/customers/new"
          className="px-3 py-1 text-xs font-bold"
          style={{
            background: "var(--btn-green-bg)",
            color: "var(--btn-green-text)",
            border: "1px solid var(--btn-green-hover)",
            borderRadius: "2px",
            textDecoration: "none",
            fontSize: "12px",
          }}
        >
          Add Customer
        </Link>
      </div>

      <CustomerSearchBar initialSearch={search} />

      <CustomerTable customers={customers} />
    </div>
  );
}

function CustomerTable({ customers }: { customers: CustomerRow[] }) {
  const columns = [
    {
      key: "customerIdDisplay",
      header: "Customer ID",
      render: (row: CustomerRow) => (
        <Link href={`/customers/${row.id}/policies`} style={{ color: "var(--link)", fontWeight: "bold" }}>
          {row.customerIdDisplay}
        </Link>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (row: CustomerRow) => (
        <Link href={`/customers/${row.id}/policies`} style={{ color: "var(--link)" }}>
          {row.lastName}, {row.firstName}
        </Link>
      ),
    },
    { key: "customerType", header: "Type" },
    {
      key: "status",
      header: "Status",
      render: (row: CustomerRow) => (
        <span style={{ color: row.status === "Active" ? "var(--status-active)" : "var(--text)", fontWeight: "bold" }}>
          {row.status}
        </span>
      ),
    },
    { key: "email", header: "Email" },
    { key: "cell", header: "Cell" },
    { key: "officeName", header: "Office" },
    { key: "agentName", header: "Agent of Record" },
    { key: "policyCount", header: "Policies", align: "center" as const },
    { key: "dateAdded", header: "Date Added" },
  ];

  return (
    <DataTable<CustomerRow>
      columns={columns}
      data={customers}
      emptyMessage="No Customers Found"
      rowKey={(row) => row.id}
    />
  );
}
