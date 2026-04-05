import { getCustomerNotes } from "@/modules/customers/queries";
import ActionBar from "@/components/ui/ActionBar";
import AddNoteForm from "@/components/customers/AddNoteForm";

/**
 * Notes Tab — real data + add note form
 * Reference: Screenshots 7, 8
 */
export default async function NotesTab({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notes = await getCustomerNotes(id);

  return (
    <div>
      <ActionBar
        actions={[
          { label: "View System Notes" },
          { label: "View Only" },
          { label: "Print Notes" },
          { label: "Email" },
          { label: "Email Blast" },
          { label: "Text Blast" },
        ]}
      />

      <AddNoteForm customerId={id} />

      {notes.length === 0 ? (
        <div className="py-8 text-center" style={{ color: "var(--text-muted)", fontSize: "13px" }}>
          No Notes Found
        </div>
      ) : (
        <div>
          {notes.map((note, idx) => (
            <div
              key={note.id}
              className="px-3 py-2"
              style={{
                borderBottom: "1px solid var(--border-light)",
                background: idx % 2 === 0 ? "var(--table-row-even)" : "var(--table-row-odd)",
              }}
            >
              <div className="flex justify-between mb-1">
                <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--link)" }}>
                  {note.createdBy ? `${note.createdBy.firstName} ${note.createdBy.lastName}` : "System"}
                </span>
                <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                  {note.createdAt.toLocaleString("en-US", { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "var(--text)" }}>
                {note.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
