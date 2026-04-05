"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";

interface CustomerSearchBarProps {
  initialSearch: string;
}

export default function CustomerSearchBar({ initialSearch }: CustomerSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const executeSearch = useCallback((term: string) => {
    const params = term ? `?q=${encodeURIComponent(term)}` : "";
    router.push(`/customers${params}`);
  }, [router]);

  function handleChange(value: string) {
    setSearchTerm(value);
    // Debounce: wait 400ms after user stops typing
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length >= 2 || value.length === 0) {
      debounceRef.current = setTimeout(() => executeSearch(value), 400);
    }
  }

  function handleSearch() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    executeSearch(searchTerm);
  }

  function handleClear() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchTerm("");
    router.push("/customers");
  }

  return (
    <div
      className="flex items-center gap-2 p-2 mb-2"
      data-tour="customer-search"
      style={{ background: "#e8eef4", border: "1px solid var(--border)" }}
    >
      <label className="am-label" style={{ fontSize: "12px" }}>Search:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Name, Phone, Email, Customer ID..."
        className="flex-1 px-2 py-1"
        style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }}
      />
      <button
        onClick={handleSearch}
        className="px-3 py-1 text-xs font-medium"
        style={{ background: "var(--action-btn-bg)", color: "var(--action-btn-text)", border: "1px solid var(--action-btn-hover)", borderRadius: "2px", cursor: "pointer", fontSize: "11px" }}
      >
        Search
      </button>
      <button
        onClick={handleClear}
        className="px-3 py-1 text-xs font-medium"
        style={{ background: "var(--tab-bg)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer", fontSize: "11px" }}
      >
        Clear
      </button>
    </div>
  );
}
