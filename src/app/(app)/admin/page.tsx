import Link from "next/link";

/**
 * Admin hub — approximated from Agency Matrix Admin dropdown
 */
export default function AdminPage() {
  const adminLinks = [
    { label: "User Management", href: "/admin/users", description: "Manage employees, roles, and permissions" },
    { label: "Office Management", href: "/admin/offices", description: "Manage territories, districts, and offices" },
    { label: "Carrier Management", href: "/admin/carriers", description: "Manage insurance carriers and commission rates" },
    { label: "System Settings", href: "/admin/settings", description: "Agency configuration and preferences" },
  ];

  return (
    <div className="p-3">
      <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>
        Administration
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-3"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "var(--link)" }}>
              {link.label}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
              {link.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
