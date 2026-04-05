"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

/**
 * TopNavBar — Horizontal navigation matching Agency Matrix
 * Reference: Screenshot 2, 9
 * Items: Home | Office ▼ | Forms | Remake | E.O.D. | Reports ▼ | Dashboard | Admin ▼ | Training | File Locker
 * Plus green "Add Customer" button on the right
 */

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Office",
    href: "/admin/offices",
    hasDropdown: true,
    dropdownItems: [
      { label: "Office Overview", href: "/admin/offices" },
    ],
  },
  { label: "E.O.D.", href: "/reports/eod" },
  {
    label: "Reports",
    href: "/reports",
    hasDropdown: true,
    dropdownItems: [
      { label: "Reports Menu", href: "/reports" },
      { label: "End Of Day", href: "/reports/eod" },
      { label: "Producer Leaderboard", href: "/reports/leaderboard" },
    ],
  },
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Comms",
    href: "/communications/sms",
    hasDropdown: true,
    dropdownItems: [
      { label: "SMS Campaigns", href: "/communications/sms" },
      { label: "Text Inbox", href: "/communications/inbox" },
      { label: "Internal Chat", href: "/communications/chat" },
      { label: "Announcements", href: "/communications/announcements" },
    ],
  },
  { label: "Calendar", href: "/calendar" },
  {
    label: "Admin",
    href: "/admin",
    hasDropdown: true,
    dropdownItems: [
      { label: "User Management", href: "/admin/users" },
      { label: "Offices", href: "/admin/offices" },
      { label: "Carriers", href: "/admin/carriers" },
    ],
  },
  { label: "Training", href: "/training-guide" },
];

export default function TopNavBar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function isActive(item: NavItem): boolean {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href !== "/" && pathname.startsWith(item.href)) return true;
    return false;
  }

  return (
    <nav
      className="flex items-center justify-between px-2"
      style={{
        background: "var(--nav-bg)",
        borderBottom: "1px solid var(--nav-border)",
        minHeight: "34px",
      }}
      ref={dropdownRef}
    >
      {/* Nav Items */}
      <div className="flex items-center">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="relative">
            {item.hasDropdown ? (
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === item.label ? null : item.label)
                }
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  color: "var(--nav-text)",
                  background: isActive(item) ? "var(--nav-active)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item))
                    (e.target as HTMLElement).style.background = "var(--nav-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item))
                    (e.target as HTMLElement).style.background = "transparent";
                }}
              >
                {item.label} <span style={{ fontSize: "8px" }}>&#9660;</span>
              </button>
            ) : (
              <Link
                href={item.href}
                className="block px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  color: "var(--nav-text)",
                  background: isActive(item) ? "var(--nav-active)" : "transparent",
                  fontSize: "12px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item))
                    (e.target as HTMLElement).style.background = "var(--nav-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item))
                    (e.target as HTMLElement).style.background = "transparent";
                }}
              >
                {item.label}
              </Link>
            )}

            {/* Dropdown */}
            {item.hasDropdown && openDropdown === item.label && item.dropdownItems && (
              <div
                className="absolute top-full left-0 z-50 py-1 min-w-[180px]"
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {item.dropdownItems.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="block px-3 py-1.5 text-xs hover:bg-gray-100"
                    style={{
                      color: "var(--text)",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                    onClick={() => setOpenDropdown(null)}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Customer Button (Green) */}
      <Link
        href="/customers/new"
        data-tour="add-customer-btn"
        className="px-3 py-1 text-xs font-bold rounded"
        style={{
          background: "var(--btn-green-bg)",
          color: "var(--btn-green-text)",
          fontSize: "12px",
          textDecoration: "none",
          border: "1px solid var(--btn-green-hover)",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background = "var(--btn-green-hover)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background = "var(--btn-green-bg)";
        }}
      >
        Add Customer
      </Link>
    </nav>
  );
}
