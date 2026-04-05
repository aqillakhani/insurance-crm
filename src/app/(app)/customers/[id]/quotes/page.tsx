import { getCustomerQuotes } from "@/modules/customers/queries";
import DataTable from "@/components/ui/DataTable";
import { formatDate, formatCurrency } from "@/lib/utils";

/**
 * Quotes / XDates Tab — real data from database
 * Reference: Screenshot 10
 */

interface QuoteDisplay {
  id: string;
  company: string;
  product: string;
  effDate: string;
  quoteDate: string;
  class: string;
  premium: string;
  quotePayment: string;
  monthlyFee: string;
  status: string;
  agentOfRecord: string;
}

export default async function QuotesXDatesTab({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quotes = await getCustomerQuotes(id);

  const displayData: QuoteDisplay[] = quotes.map((q) => ({
    id: q.id,
    company: q.carrier?.name || "",
    product: q.product || "",
    effDate: formatDate(q.effectiveDate),
    quoteDate: formatDate(q.quoteDate),
    class: q.class || "",
    premium: formatCurrency(q.premium),
    quotePayment: q.quotePayment ? formatCurrency(q.quotePayment) : "",
    monthlyFee: q.monthlyFee ? formatCurrency(q.monthlyFee) : "",
    status: q.status,
    agentOfRecord: q.agentOfRecord ? `${q.agentOfRecord.firstName} ${q.agentOfRecord.lastName}` : "",
  }));

  const columns = [
    { key: "company", header: "Company" },
    { key: "product", header: "Product" },
    { key: "effDate", header: "Eff Date" },
    { key: "quoteDate", header: "Quote Date" },
    { key: "class", header: "Class" },
    { key: "premium", header: "Premium", align: "right" as const },
    { key: "quotePayment", header: "Quote Payment", align: "right" as const },
    { key: "monthlyFee", header: "Monthly Fee", align: "right" as const },
    { key: "agentOfRecord", header: "Agent of Record" },
    {
      key: "status",
      header: "Status",
      render: (row: QuoteDisplay) => (
        <span style={{ color: row.status === "Pending" ? "var(--status-pending)" : "var(--status-active)", fontWeight: "bold" }}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex" style={{ borderBottom: "1px solid var(--border)", background: "#e8eef4" }}>
        <div className="px-4 py-1 text-xs font-medium" style={{ background: "var(--tab-active-bg)", color: "white", fontSize: "11px" }}>
          Quotes
        </div>
        <div className="px-4 py-1 text-xs font-medium" style={{ color: "var(--tab-text)", fontSize: "11px", cursor: "pointer" }}>
          XDates
        </div>
      </div>
      <DataTable<QuoteDisplay>
        columns={columns}
        data={displayData}
        emptyMessage="No Quotes Found"
        rowKey={(row) => row.id}
      />
    </div>
  );
}
