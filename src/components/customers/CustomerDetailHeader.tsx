"use client";

import FormField from "@/components/ui/FormField";

/**
 * CustomerDetailHeader — Two-column layout matching Agency Matrix
 * Left column: Name, address, phones, emails, personal info
 * Right column: Customer ID, type, status, agent, office, source, DOB, DL, Do Not flags
 * Reference: Screenshot 5, 6
 */

interface CustomerData {
  firstName: string;
  lastName: string;
  customerIdDisplay: string;
  customerType: string;
  accountType: string;
  status: string;
  primarySubStatus: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  addressValidated: boolean;
  mailingAddress: string;
  email: string;
  email2: string;
  cell: string;
  home: string;
  work: string;
  other: string;
  language: string;
  preferredContact: string;
  ssnTaxId: string;
  maritalStatus: string;
  gender: string;
  agentOfRecord: string;
  enteredBy: string;
  keyedBy: string;
  office: string;
  source: string;
  subSource: string;
  dateAdded: string;
  dob: string;
  dl: string;
  dlState: string;
  dateLicensed: string;
  doNotEmail: boolean;
  doNotText: boolean;
  doNotCall: boolean;
  doNotMail: boolean;
  doNotMarket: boolean;
  doNotCaptureEmail: boolean;
}

interface CustomerDetailHeaderProps {
  customer: CustomerData;
}

export default function CustomerDetailHeader({ customer }: CustomerDetailHeaderProps) {
  return (
    <div
      className="grid grid-cols-2 gap-4 px-4 py-2"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      {/* Left Column — Personal Info */}
      <div>
        {/* Name — prominent */}
        <div
          className="mb-1"
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            color: "var(--link)",
          }}
        >
          {customer.firstName} {customer.lastName}
        </div>

        <FormField label="Address">
          <span>
            {customer.address}
            <br />
            {customer.city} {customer.state} {customer.zip}
            {customer.addressValidated && (
              <span
                style={{ color: "var(--status-active)", marginLeft: "8px", fontSize: "11px" }}
              >
                ✓ Validated Address
              </span>
            )}
          </span>
        </FormField>

        <FormField label="Mailing Address" value={customer.mailingAddress || ""} />

        <div className="mt-1" />
        <FormField label="Email">
          <a href={`mailto:${customer.email}`} style={{ color: "var(--link)" }}>
            {customer.email}
          </a>
        </FormField>
        <FormField label="Email 2" value={customer.email2} />
        <FormField label="Cell" value={customer.cell} />
        <FormField label="Home" value={customer.home} />
        <FormField label="Work" value={customer.work} />
        <FormField label="Other" value={customer.other} />

        <div className="mt-1" />
        <FormField label="Language" value={customer.language} />
        <FormField label="Preferred Contact" value={customer.preferredContact} />
        <FormField label="SSN/Tax ID" value={customer.ssnTaxId} />
        <FormField label="Marital Status" value={customer.maritalStatus} />
        <FormField label="Gender" value={customer.gender} />
      </div>

      {/* Right Column — System/Status Info */}
      <div>
        <FormField label="Customer ID">
          <span style={{ fontWeight: "bold" }}>{customer.customerIdDisplay}</span>
          <button
            className="ml-2"
            style={{
              fontSize: "10px",
              color: "var(--link)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            title="Copy ID"
            onClick={() => navigator.clipboard.writeText(customer.customerIdDisplay)}
          >
            📋
          </button>
        </FormField>
        <FormField label="Customer Type" value={customer.customerType} />
        <FormField label="Account Type" value={customer.accountType} />
        <FormField label="Status">
          <span style={{ color: "var(--status-active)", fontWeight: "bold" }}>
            {customer.status}
          </span>
        </FormField>
        <FormField label="Primary Sub Status" value={customer.primarySubStatus} />

        <div className="mt-1" />
        <FormField label="Customer Agent of Record" value={customer.agentOfRecord} />
        <FormField label="Entered By" value={customer.enteredBy} />
        <FormField label="Keyed By" value={customer.keyedBy} />
        <FormField label="Office" value={customer.office} />
        <FormField label="Source" value={customer.source} />
        <FormField label="Sub Source" value={customer.subSource} />
        <FormField label="Date Added" value={customer.dateAdded} />

        <div className="mt-1" />
        <FormField label="DOB" value={customer.dob} />
        <FormField label="DL" value={customer.dl} />
        <FormField label="DL State" value={customer.dlState} />
        <FormField label="Date Licensed" value={customer.dateLicensed} />

        <div className="mt-1" />
        <FormField label="Do Not Email" value={customer.doNotEmail ? "Yes" : "No"} />
        <FormField label="Do Not Text" value={customer.doNotText ? "Yes" : "No"} />
        <FormField label="Do Not Call" value={customer.doNotCall ? "Yes" : "No"} />
        <FormField label="Do Not Mail" value={customer.doNotMail ? "Yes" : "No"} />
        <FormField label="Do Not Market" value={customer.doNotMarket ? "Yes" : "No"} />
        <FormField label="Do Not Capture Email" value={customer.doNotCaptureEmail ? "Yes" : "No"} />
      </div>
    </div>
  );
}
