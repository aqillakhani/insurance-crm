"use client";

export default function CustomersError({
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
        Failed to load customers
      </div>
      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
        {error.message || "There was an error loading the customer list."}
      </div>
      <button
        onClick={reset}
        className="px-4 py-1.5 text-xs font-medium"
        style={{ background: "var(--action-btn-bg)", color: "white", border: "none", borderRadius: "2px", cursor: "pointer" }}
      >
        Try Again
      </button>
    </div>
  );
}
