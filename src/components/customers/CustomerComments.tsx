/**
 * CustomerComments — Free text comments section
 * Reference: Screenshots 5, 6 — "04/2026: Payment is 300"
 */

interface CustomerCommentsProps {
  comments: string;
}

export default function CustomerComments({ comments }: CustomerCommentsProps) {
  if (!comments) return null;

  return (
    <div className="mx-3 my-1">
      <div style={{ fontSize: "12px" }}>
        <span className="am-label">Comments:</span>
      </div>
      <div
        className="px-2 py-1"
        style={{
          fontSize: "12px",
          color: "var(--status-active)",
          fontWeight: "bold",
        }}
      >
        {comments}
      </div>
    </div>
  );
}
