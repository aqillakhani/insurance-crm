/**
 * Office Management — manages Territory > Division > Region > District > Office hierarchy
 * Reference: Screenshot 2 shows office hierarchy in EOD report
 */
export default function OfficesPage() {
  return (
    <div className="p-3">
      <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>
        Office Management
      </h2>
      <div className="p-4 text-center" style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "13px" }}>
        Office hierarchy management will be implemented here.
      </div>
    </div>
  );
}
