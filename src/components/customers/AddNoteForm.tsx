"use client";

import { useState, useTransition } from "react";
import { addNote } from "@/modules/customers/actions";

interface AddNoteFormProps {
  customerId: string;
}

export default function AddNoteForm({ customerId }: AddNoteFormProps) {
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (!content.trim()) return;
    startTransition(async () => {
      await addNote(customerId, content.trim());
      setContent("");
      setIsOpen(false);
    });
  }

  if (!isOpen) {
    return (
      <div className="px-2 py-1" style={{ borderBottom: "1px solid var(--border-light)" }}>
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1 text-xs font-bold"
          style={{
            background: "var(--btn-green-bg)",
            color: "white",
            border: "1px solid var(--btn-green-hover)",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          + Add Note
        </button>
      </div>
    );
  }

  return (
    <div className="px-3 py-2" style={{ borderBottom: "1px solid var(--border)", background: "#f8f9fa" }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your note here..."
        rows={3}
        className="w-full px-2 py-1 mb-2"
        style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px", resize: "vertical" }}
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isPending || !content.trim()}
          className="px-3 py-1 text-xs font-bold"
          style={{
            background: isPending ? "var(--text-muted)" : "var(--btn-green-bg)",
            color: "white",
            border: "1px solid var(--btn-green-hover)",
            borderRadius: "2px",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Saving..." : "Save Note"}
        </button>
        <button
          onClick={() => { setIsOpen(false); setContent(""); }}
          className="px-3 py-1 text-xs"
          style={{
            background: "var(--tab-bg)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
