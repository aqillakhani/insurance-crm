"use client";

import ActionBar from "@/components/ui/ActionBar";
import DataTable from "@/components/ui/DataTable";

/**
 * Attachments Tab — matches Agency Matrix Attachments table
 * Reference: Screenshot 4
 * Action bar: Add Attachment | Scan Now | Add T-File Note | Communications
 * Columns: Email, Fax, Pin, Edit, Delete, Policy, Carrier, File Name, Type, Description, Text, Made on (Added By, Minutes, Date)
 */

const MOCK_ATTACHMENTS = [
  {
    id: "1",
    policy: "PPTX 00391100...",
    carrier: "Alpha Rts",
    fileName: "AMH 63.jpg",
    type: "Drivers",
    description: "",
    text: "✓",
    addedBy: "Zika Bhaidani",
    minutes: "No",
    date: "11-11-2025",
  },
  {
    id: "2",
    policy: "PPTX 00391148...",
    carrier: "Alpha Rts",
    fileName: "License.pdf",
    type: "License",
    description: "Application signed",
    text: "",
    addedBy: "",
    minutes: "",
    date: "",
  },
  {
    id: "3",
    policy: "PPTX 00391...",
    carrier: "Alpha Rts",
    fileName: "ID card Aim.pdf",
    type: "General",
    description: "XCP",
    text: "",
    addedBy: "Zika Bhaidani",
    minutes: "",
    date: "11-11-2025",
  },
  {
    id: "4",
    policy: "PPTX 00391180...",
    carrier: "Alpha Rts",
    fileName: "ID Card AMH...",
    type: "General",
    description: "XCP",
    text: "",
    addedBy: "",
    minutes: "",
    date: "",
  },
  {
    id: "5",
    policy: "T181611327",
    carrier: "The General",
    fileName: "2024 jul...",
    type: "",
    description: "Appraisal app...",
    text: "",
    addedBy: "",
    minutes: "",
    date: "",
  },
];

type AttachmentRow = (typeof MOCK_ATTACHMENTS)[number];

const ACTION_ICONS_RENDER = () => (
  <div className="flex gap-0.5">
    {["📧", "📠", "📌", "✏️", "🗑"].map((icon, i) => (
      <button
        key={i}
        className="text-xs"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0 1px",
        }}
      >
        {icon}
      </button>
    ))}
  </div>
);

const COLUMNS = [
  {
    key: "actions",
    header: "Email Fax Pin Edit Delete",
    width: "120px",
    render: ACTION_ICONS_RENDER,
  },
  { key: "policy", header: "Policy" },
  { key: "carrier", header: "Carrier" },
  {
    key: "fileName",
    header: "File Name",
    render: (row: AttachmentRow) => (
      <a href="#" style={{ color: "var(--link)" }}>
        {row.fileName}
      </a>
    ),
  },
  { key: "type", header: "Type" },
  { key: "description", header: "Description" },
  { key: "text", header: "Text" },
  { key: "addedBy", header: "Added By" },
  { key: "minutes", header: "Minutes" },
  { key: "date", header: "Date" },
];

export default function AttachmentsTab() {
  return (
    <div>
      <ActionBar
        actions={[
          { label: "Add Attachment" },
          { label: "Scan Now" },
          { label: "Add T-File Note" },
          { label: "Communications" },
        ]}
      />
      <div
        className="px-2 py-1"
        style={{
          fontSize: "11px",
          color: "var(--text-muted)",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        Showing all attachments
      </div>
      <DataTable<AttachmentRow>
        columns={COLUMNS}
        data={MOCK_ATTACHMENTS}
        emptyMessage="No Attachments Found"
        rowKey={(row) => row.id}
      />
    </div>
  );
}
