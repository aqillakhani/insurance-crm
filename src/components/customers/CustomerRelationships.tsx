/**
 * CustomerRelationships — Green bar section showing linked customers
 * Reference: Screenshots 4, 6 — "No Relationships Found" green bar
 */
export default function CustomerRelationships() {
  return (
    <div className="mx-3 my-1">
      <div
        className="px-2 py-1"
        style={{
          background: "#d4edda",
          border: "1px solid #c3e6cb",
          fontSize: "12px",
          fontWeight: "bold",
          color: "#155724",
        }}
      >
        Customer Relationships
      </div>
      <div
        className="px-2 py-1"
        style={{
          background: "#d4edda",
          border: "1px solid #c3e6cb",
          borderTop: "none",
          fontSize: "12px",
          color: "#155724",
        }}
      >
        No Relationships Found
      </div>
    </div>
  );
}
