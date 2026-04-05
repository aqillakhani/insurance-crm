"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/modules/auth/actions";

interface SessionUser {
  name: string;
  agencyName: string;
  role: string;
  officeCode: string;
}

export default function AppHeader() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    // Read session from cookie client-side
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("crm-session="));
    if (cookie) {
      try {
        const data = JSON.parse(atob(cookie.split("=")[1]));
        setUser(data);
      } catch {
        // ignore
      }
    }
  }, []);

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
      router.push("/login");
      router.refresh();
    });
  }

  return (
    <header
      className="flex items-center justify-between px-4 py-2"
      style={{
        background: "linear-gradient(to bottom, var(--header-bg-light), var(--header-bg))",
        color: "var(--header-text)",
        minHeight: "48px",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded"
          style={{ width: "36px", height: "36px", background: "#ffffff", padding: "2px" }}
        >
          <span style={{ fontSize: "10px", fontWeight: "bold", color: "#1a5276" }}>CRM</span>
        </div>
        <h1 className="text-lg font-bold m-0" style={{ fontSize: "18px" }}>
          {user?.agencyName || "Insurance CRM"}
        </h1>
      </div>

      <div className="flex items-center gap-4" style={{ fontSize: "12px" }}>
        <a href="/training" className="hover:underline" style={{ color: "var(--header-text)" }}>
          Training &amp; Help
        </a>
        {user && (
          <>
            <span>Welcome, <strong>{user.name}</strong></span>
            <span>Office: <strong>{user.officeCode}</strong></span>
            <span style={{ opacity: 0.7 }}>{user.role}</span>
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="px-2 py-0.5"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                cursor: "pointer",
                borderRadius: "2px",
                fontSize: "11px",
              }}
            >
              {isPending ? "..." : "Sign Out"}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
