import { notFound } from "next/navigation";
import { getCustomerById } from "@/modules/customers/queries";
import TabBar from "@/components/ui/TabBar";
import CustomerDetailHeader from "@/components/customers/CustomerDetailHeader";
import CustomerRelationships from "@/components/customers/CustomerRelationships";
import CustomerTags from "@/components/customers/CustomerTags";
import CustomerComments from "@/components/customers/CustomerComments";
import ToolsPanel from "@/components/ui/ToolsPanel";

/**
 * Customer Detail Layout — real data from database
 * Reference: Screenshots 5-11
 */
export default async function CustomerDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: customerId } = await params;
  const customer = await getCustomerById(customerId);

  if (!customer) {
    notFound();
  }

  const basePath = `/customers/${customerId}`;

  const tabs = [
    { label: "Policies", href: `${basePath}/policies`, count: customer._count.policies },
    { label: "Finance", href: `${basePath}/finance`, count: 0 },
    { label: "Tasks", href: `${basePath}/tasks`, count: customer._count.tasks },
    { label: "Notes", href: `${basePath}/notes`, count: customer._count.notes },
    { label: "Roles", href: `${basePath}/roles`, count: customer._count.roleAssignments ?? 0 },
    { label: "Pay History", href: `${basePath}/pay-history`, count: customer._count.payments },
    { label: "Attachments", href: `${basePath}/attachments`, count: customer._count.attachments },
    { label: "Quotes / XDates", href: `${basePath}/quotes`, count: customer._count.quotes },
    { label: "HH Members", href: `${basePath}/hh-members`, count: customer._count.householdPrimary },
    { label: "Claims", href: `${basePath}/claims`, count: customer._count.claims },
    { label: "Diary", href: `${basePath}/diary`, count: customer._count.diaryEntries },
  ];

  const agentName = customer.agentOfRecord
    ? `${customer.agentOfRecord.firstName} ${customer.agentOfRecord.lastName}`
    : "";
  const enteredByName = customer.enteredBy
    ? `${customer.enteredBy.firstName} ${customer.enteredBy.lastName}`
    : "";
  const keyedByName = customer.keyedBy
    ? `${customer.keyedBy.firstName} ${customer.keyedBy.lastName}`
    : "";

  const displayData = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    customerIdDisplay: customer.customerIdDisplay,
    customerType: customer.customerType,
    accountType: customer.accountType,
    status: customer.status,
    primarySubStatus: customer.primarySubStatus || "",
    address: customer.addressStreet || "",
    city: customer.addressCity || "",
    state: customer.addressState || "",
    zip: customer.addressZip || "",
    addressValidated: customer.addressValidated,
    mailingAddress: customer.mailingAddress || "",
    email: customer.email || "",
    email2: customer.email2 || "",
    cell: customer.cell || "",
    home: customer.home || "",
    work: customer.work || "",
    other: customer.otherPhone || "",
    language: customer.language || "English",
    preferredContact: customer.preferredContact || "",
    ssnTaxId: customer.ssnEncrypted || "xxx-xx-0000",
    maritalStatus: customer.maritalStatus || "",
    gender: customer.gender || "",
    agentOfRecord: agentName,
    enteredBy: enteredByName,
    keyedBy: keyedByName,
    office: customer.office?.code || customer.office?.name || "",
    source: customer.source || "",
    subSource: customer.subSource || "",
    dateAdded: customer.dateAdded.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
    dob: customer.dob ? customer.dob.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "",
    dl: customer.dlNumber || "",
    dlState: customer.dlState || "",
    dateLicensed: customer.dateLicensed ? customer.dateLicensed.toLocaleDateString("en-US") : "",
    doNotEmail: customer.doNotEmail,
    doNotText: customer.doNotText,
    doNotCall: customer.doNotCall,
    doNotMail: customer.doNotMail,
    doNotMarket: customer.doNotMarket,
    doNotCaptureEmail: customer.doNotCaptureEmail,
    comments: customer.comments || "",
  };

  return (
    <div>
      <div
        className="flex items-center justify-between px-3 py-1"
        style={{ background: "#e8eef4", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)" }}>
            Personal Lines Customer Details
          </span>
          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            (#{customer.customerIdDisplay})
          </span>
        </div>
        <ToolsPanel customerId={customerId} />
      </div>

      <CustomerDetailHeader customer={displayData} />
      <CustomerComments comments={displayData.comments} />
      <CustomerRelationships />
      <CustomerTags />
      <TabBar tabs={tabs} />

      <div style={{ border: "1px solid var(--border)", borderTop: "none", background: "var(--bg)", minHeight: "300px" }}>
        {children}
      </div>
    </div>
  );
}
