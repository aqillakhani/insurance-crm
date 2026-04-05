"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/modules/auth/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await loginAction(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, var(--header-bg) 0%, var(--header-bg-light) 100%)",
      }}
    >
      <div
        className="w-full max-w-md p-6"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div className="text-center mb-6">
          <div
            className="inline-block px-4 py-2 mb-3"
            style={{
              background: "var(--header-bg)",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            SimplyCRM
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            Agency Management System
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div
              className="mb-3 px-3 py-2 text-center"
              style={{
                background: "#fdecea",
                border: "1px solid #f5c6cb",
                color: "#721c24",
                fontSize: "12px",
              }}
            >
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="am-label block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2"
              style={{
                border: "1px solid var(--input-border)",
                fontSize: "13px",
                borderRadius: "2px",
              }}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="am-label block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2"
              style={{
                border: "1px solid var(--input-border)",
                fontSize: "13px",
                borderRadius: "2px",
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 text-sm font-bold"
            style={{
              background: isPending ? "var(--text-muted)" : "var(--btn-green-bg)",
              color: "var(--btn-green-text)",
              border: "1px solid var(--btn-green-hover)",
              borderRadius: "2px",
              cursor: isPending ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>

          {process.env.NODE_ENV === "development" && (
            <div
              className="mt-4 text-center"
              style={{ fontSize: "11px", color: "var(--text-muted)" }}
            >
              <div className="mb-1">Demo Accounts (password: password123):</div>
              <div>admin@cityauto.com | ahmed@cityauto.com | zika@cityauto.com</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
