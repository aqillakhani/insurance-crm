"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * Reports Hub — matches Agency Matrix Reports mega-menu
 * Reference: Screenshots 1, 3, 9
 * Structure:
 *   Favorites section (tabbed: Employee Overview, End Of Day, Owner Overview, Tasks)
 *   General section (categorized mega-menu with ~50 report links)
 */

const FAVORITES_TABS = [
  "Favorites",
  "Employee Overview",
  "End Of Day",
  "Owner Overview",
  "Tasks",
];

const REPORT_CATEGORIES = {
  "Mobile Reports": [
    { label: "Mobile Device Main Menu", href: "#" },
  ],
  "Owner Reports": [
    { label: "Owner Overview", href: "#" },
    { label: "Activity Rollup - Prospects", href: "#" },
  ],
  "Download Reports": [
    { label: "Download Policy Activity", href: "#" },
    { label: "Download Transactions", href: "#" },
    { label: "Download Endorsements", href: "#" },
    { label: "Download Notes", href: "#" },
  ],
  "Mixed Policies": [
    { label: "Policies With Payments", href: "#" },
    { label: "Policies With Renewals", href: "#" },
    { label: "Expired Policies Info", href: "#" },
    { label: "Policies In Effect", href: "#" },
  ],
  "Marketing": [
    { label: "Customer", href: "#" },
    { label: "Customer New", href: "#" },
    { label: "Cross Selling", href: "#" },
    { label: "Do Not Contact", href: "#" },
    { label: "Dash History", href: "#" },
    { label: "Drip Marketing Campaign", href: "#" },
    { label: "Company Email History", href: "#" },
  ],
  "Employee / Broker": [
    { label: "Fee Commissions", href: "#" },
    { label: "Production Summary", href: "#" },
    { label: "Production Detail", href: "#" },
    { label: "Written Premium", href: "#" },
    { label: "Split Premium", href: "#" },
    { label: "Employee Overview", href: "#" },
    { label: "Employee Login", href: "#" },
    { label: "Employee Production", href: "#" },
    { label: "Comp Listing", href: "#" },
  ],
  "Imports / Exports": [
    { label: "Upload Customer Census", href: "#" },
    { label: "Export Customers", href: "#" },
    { label: "Export Policies", href: "#" },
  ],
  "Setup": [
    { label: "Update Agency Items", href: "#" },
    { label: "Schedule Agency Items", href: "#" },
    { label: "Items Without Tasks", href: "#" },
  ],
  "Auditing": [
    { label: "Data Integrity", href: "#" },
    { label: "Activity Logging", href: "#" },
  ],
  "Tracking": [
    { label: "Annual Rate Tracking", href: "#" },
  ],
  "UMS Messaging": [
    { label: "UMS Messaging", href: "#" },
  ],
  "Other": [
    { label: "Pixel Tasks", href: "#" },
    { label: "Email Tracking", href: "#" },
    { label: "Activity Rollup", href: "#" },
    { label: "ACH Batching", href: "#" },
    { label: "Data File List", href: "#" },
    { label: "Endorsement", href: "#" },
    { label: "Claims", href: "#" },
    { label: "Demographics", href: "#" },
    { label: "Invoice/Receipts", href: "#" },
    { label: "Payment Reports", href: "#" },
    { label: "Paper Retention", href: "#" },
    { label: "Event Reports", href: "#" },
  ],
};

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Favorites");

  return (
    <div className="p-2">
      {/* Reports Menu header */}
      <div
        className="flex items-center gap-2 px-2 py-1 mb-2"
        style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)" }}
      >
        Reports Menu
        <span
          style={{
            fontSize: "12px",
            color: "var(--link)",
            cursor: "pointer",
          }}
        >
          ⓘ
        </span>
      </div>

      {/* Favorites Section */}
      <SectionHeader title="Favorites" defaultExpanded={true} variant="green">
        {/* Favorite tabs */}
        <div
          className="flex"
          style={{
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {FAVORITES_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 text-xs font-medium"
              style={{
                background: activeTab === tab ? "var(--tab-active-bg)" : "var(--tab-bg)",
                color: activeTab === tab ? "var(--tab-active-text)" : "var(--tab-text)",
                border: "none",
                borderRight: "1px solid var(--tab-border)",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content placeholder */}
        <div
          className="p-4 text-center"
          style={{
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "12px",
          }}
        >
          {activeTab === "Favorites"
            ? "Your favorite reports will appear here."
            : `${activeTab} report content`}
        </div>
      </SectionHeader>

      {/* General Section — Mega menu */}
      <div className="mt-2">
        <SectionHeader title="General" defaultExpanded={true} variant="green">
          <div
            className="grid grid-cols-5 gap-0 p-3"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderTop: "none",
            }}
          >
            {Object.entries(REPORT_CATEGORIES).map(([category, items]) => (
              <div key={category} className="pr-3 mb-3">
                <div
                  className="mb-1 pb-0.5"
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "var(--text)",
                    borderBottom: "1px solid var(--border-light)",
                  }}
                >
                  {category}
                </div>
                {items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block py-0.5"
                    style={{
                      fontSize: "11px",
                      color: "var(--link)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.textDecoration = "none";
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </SectionHeader>
      </div>
    </div>
  );
}
