/**
 * Announcements — Company-wide announcement board
 * Client priority: Internal communication, announcement board
 */
export default function AnnouncementsPage() {
  return (
    <div className="p-3">
      <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>
        Announcements
      </h2>
      <div className="flex justify-end mb-2">
        <button className="px-3 py-1 text-xs font-bold" style={{ background: "var(--btn-green-bg)", color: "white", border: "1px solid var(--btn-green-hover)", borderRadius: "2px", cursor: "pointer" }}>
          New Announcement
        </button>
      </div>
      <div style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
        {[
          { title: "Q2 Production Goals Updated", author: "Admin", date: "04-01-2026", content: "New quarterly targets have been set for all branches. Please review your individual goals in the dashboard.", pinned: true },
          { title: "System Maintenance — April 10", author: "Admin", date: "03-28-2026", content: "The CRM will be down for maintenance on April 10th from 2-4 AM CST. Please save your work beforehand.", pinned: false },
          { title: "New Carrier Added: SafePoint Insurance", author: "Admin", date: "03-25-2026", content: "We are now appointed with SafePoint Insurance for homeowners coverage. Training materials have been uploaded to the Training section.", pinned: false },
        ].map((ann, idx) => (
          <div key={idx} className="p-3" style={{ borderBottom: "1px solid var(--border-light)" }}>
            <div className="flex items-center gap-2 mb-1">
              {ann.pinned && <span style={{ fontSize: "10px", background: "var(--status-pending)", color: "white", padding: "1px 6px", borderRadius: "2px" }}>Pinned</span>}
              <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)" }}>{ann.title}</span>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>
              By {ann.author} on {ann.date}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text)" }}>{ann.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
