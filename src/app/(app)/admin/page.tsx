import Link from "next/link";

/**
 * Admin hub — links to all admin sections with real descriptions
 */
export default function AdminPage() {
  const sections = [
    { label: "User Management", href: "/admin/users", icon: "👥", description: "View and manage employee accounts, roles, and permissions. Create new users, deactivate departing employees, and assign offices.", count: "10 users" },
    { label: "Office Management", href: "/admin/offices", icon: "🏢", description: "Manage your branch office hierarchy — territories, districts, and office locations. Control data visibility and reporting structure.", count: "5 offices" },
    { label: "Carrier Management", href: "/admin/carriers", icon: "🏛️", description: "Manage your appointed insurance carriers. Track which carriers you work with, their lines of business, and policy counts.", count: "8 carriers" },
  ];

  return (
    <div className="p-3">
      <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>
        Administration
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block p-4 hover:shadow-md transition-shadow"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", textDecoration: "none", borderTop: "3px solid var(--header-bg)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span style={{ fontSize: "20px" }}>{s.icon}</span>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--link)" }}>{s.label}</span>
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "8px" }}>
              {s.description}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{s.count}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
