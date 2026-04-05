/**
 * Text Inbox — 2-way SMS inbox per agent
 * Client priority: 2-way texting inbox per agent
 */
export default function TextInboxPage() {
  return (
    <div className="p-3">
      <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>
        Text Inbox
      </h2>
      <div className="grid grid-cols-3 gap-3" style={{ minHeight: "500px" }}>
        {/* Conversation list */}
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          <div className="am-section-green" style={{ cursor: "default" }}>Conversations</div>
          <div className="p-2">
            <input type="text" placeholder="Search messages..." className="w-full px-2 py-1 mb-2" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }} />
          </div>
          {[
            { name: "Flor Yanes", preview: "Thanks, I'll call back tomorrow", time: "2m ago", unread: true },
            { name: "John Smith", preview: "What time is the appointment?", time: "15m ago", unread: true },
            { name: "Maria Garcia", preview: "Got the renewal docs, thanks!", time: "1h ago", unread: false },
            { name: "Robert Chen", preview: "Can you send my ID card?", time: "3h ago", unread: false },
          ].map((conv, idx) => (
            <div
              key={idx}
              className="px-2 py-1.5 cursor-pointer"
              style={{
                borderBottom: "1px solid var(--border-light)",
                background: conv.unread ? "#e8f4fd" : "transparent",
              }}
            >
              <div className="flex justify-between">
                <span style={{ fontSize: "12px", fontWeight: conv.unread ? "bold" : "normal" }}>{conv.name}</span>
                <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{conv.time}</span>
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {conv.preview}
              </div>
            </div>
          ))}
        </div>

        {/* Message thread */}
        <div className="col-span-2" style={{ background: "var(--bg)", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
          <div className="am-section-green" style={{ cursor: "default" }}>
            Flor Yanes — (469) 501-4001
          </div>
          <div className="flex-1 p-3 overflow-auto" style={{ minHeight: "350px" }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", marginBottom: "12px" }}>
              Today
            </div>
            <div className="mb-2 flex justify-end">
              <div className="px-3 py-1.5 rounded" style={{ background: "var(--action-btn-bg)", color: "white", maxWidth: "70%", fontSize: "12px" }}>
                Hi Flor, just a reminder that your auto policy renewal is coming up on 06-03-2028. Would you like to review your options?
              </div>
            </div>
            <div className="mb-2">
              <div className="px-3 py-1.5 rounded inline-block" style={{ background: "var(--table-row-odd)", maxWidth: "70%", fontSize: "12px" }}>
                Thanks, I&apos;ll call back tomorrow
              </div>
            </div>
          </div>
          <div className="p-2 flex gap-2" style={{ borderTop: "1px solid var(--border)" }}>
            <input type="text" placeholder="Type a message..." className="flex-1 px-2 py-1" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }} />
            <button className="px-4 py-1 text-xs font-bold" style={{ background: "var(--btn-green-bg)", color: "white", border: "none", borderRadius: "2px", cursor: "pointer" }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
