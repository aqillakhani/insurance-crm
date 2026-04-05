/**
 * FooterBar — Professional footer with real branding
 */
export default function FooterBar() {
  return (
    <footer
      className="flex items-center justify-center gap-4 px-4 py-1.5"
      style={{
        background: "#f0f0f0",
        borderTop: "1px solid var(--border)",
        fontSize: "10px",
        color: "var(--text-muted)",
      }}
    >
      <span>© {new Date().getFullYear()} SimplyCRM</span>
      <span>|</span>
      <a href="mailto:support@simplycrms.com" style={{ color: "var(--link)" }}>support@simplycrms.com</a>
      <span>|</span>
      <span>Terms of Service</span>
      <span>|</span>
      <span>Privacy Policy</span>
      <span>|</span>
      <span>v1.0.0</span>
    </footer>
  );
}
