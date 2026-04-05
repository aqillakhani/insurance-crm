/**
 * FooterBar — Bottom bar matching Agency Matrix
 * Shows support links, version info
 * Reference: Bottom of screenshots 2, 5, 6
 */
export default function FooterBar() {
  return (
    <footer
      className="flex items-center justify-center gap-4 px-4 py-1"
      style={{
        background: "#f0f0f0",
        borderTop: "1px solid var(--border)",
        fontSize: "10px",
        color: "var(--text-muted)",
      }}
    >
      <span>Contact Support</span>
      <span>|</span>
      <span>Chat With Us</span>
      <span>|</span>
      <span>Email: support@agency.com</span>
      <span>|</span>
      <span>End User License Agreement</span>
      <span>|</span>
      <span>Open Source Credits</span>
      <span>|</span>
      <span>Version 1.0</span>
    </footer>
  );
}
