/**
 * Internal Chat — Branch-to-branch communication
 * Client priority: Internal communication, @mentions, branch chat channels
 */
export default function InternalChatPage() {
  return (
    <div className="p-3">
      <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>
        Internal Chat
      </h2>
      <div className="grid grid-cols-4 gap-3" style={{ minHeight: "500px" }}>
        {/* Channels */}
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          <div className="am-section-green" style={{ cursor: "default" }}>Channels</div>
          {[
            { name: "# general", unread: 3 },
            { name: "# montfort", unread: 0 },
            { name: "# peachtree", unread: 1 },
            { name: "# polk", unread: 0 },
            { name: "# badestore", unread: 0 },
            { name: "# addison", unread: 2 },
            { name: "# announcements", unread: 1 },
          ].map((ch) => (
            <div key={ch.name} className="flex justify-between px-2 py-1.5 cursor-pointer" style={{ borderBottom: "1px solid var(--border-light)", fontSize: "12px" }}>
              <span style={{ fontWeight: ch.unread > 0 ? "bold" : "normal" }}>{ch.name}</span>
              {ch.unread > 0 && (
                <span className="px-1.5 rounded-full text-white" style={{ background: "#e74c3c", fontSize: "10px", lineHeight: "16px" }}>
                  {ch.unread}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div className="col-span-3" style={{ background: "var(--bg)", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
          <div className="am-section-green" style={{ cursor: "default" }}># general</div>
          <div className="flex-1 p-3 overflow-auto">
            <div style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", marginBottom: "12px" }}>Today</div>
            <div className="mb-3">
              <div style={{ fontSize: "12px" }}>
                <strong>Ahmed B.</strong> <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>10:30 AM</span>
              </div>
              <div style={{ fontSize: "12px", marginTop: "2px" }}>
                <span style={{ color: "var(--link)" }}>@Zika</span> can you follow up on the Smith quote? They called in this morning asking about the home bundle.
              </div>
            </div>
            <div className="mb-3">
              <div style={{ fontSize: "12px" }}>
                <strong>Zika B.</strong> <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>10:35 AM</span>
              </div>
              <div style={{ fontSize: "12px", marginTop: "2px" }}>On it! I&apos;ll call them after lunch.</div>
            </div>
          </div>
          <div className="p-2 flex gap-2" style={{ borderTop: "1px solid var(--border)" }}>
            <input type="text" placeholder="Type a message... (use @ to mention)" className="flex-1 px-2 py-1" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }} />
            <button className="px-4 py-1 text-xs font-bold" style={{ background: "var(--action-btn-bg)", color: "white", border: "none", borderRadius: "2px", cursor: "pointer" }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
