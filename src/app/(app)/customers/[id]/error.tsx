"use client";

/**
 * Error boundary for customer detail pages.
 * Catches server-side and client-side errors gracefully.
 */
export default function CustomerDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 text-center">
      <div style={{ fontSize: "28px", marginBottom: "8px", opacity: 0.5 }}>⚠️</div>
      <div style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)", marginBottom: "8px" }}>
        Something went wrong
      </div>
      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
        {error.message || "Unable to load customer details. The record may not exist or there may be a connection issue."}
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={reset}
          className="px-4 py-1.5 text-xs font-medium"
          style={{ background: "var(--action-btn-bg)", color: "white", border: "none", borderRadius: "2px", cursor: "pointer" }}
        >
          Try Again
        </button>
        <a
          href="/customers"
          className="px-4 py-1.5 text-xs font-medium"
          style={{ background: "var(--tab-bg)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "2px", textDecoration: "none" }}
        >
          Back to Customers
        </a>
      </div>
    </div>
  );
}
