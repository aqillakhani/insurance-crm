"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createCustomer } from "@/modules/customers/actions";

/**
 * Add Customer form — with validation and proper field wiring
 */
export default function AddCustomerPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    // Client-side validation
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    if (!firstName?.trim() || !lastName?.trim()) {
      setError("First name and last name are required.");
      return;
    }

    const email = formData.get("email") as string;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createCustomer(formData);
        router.push(`/customers/${result.id}/policies`);
      } catch {
        setError("Failed to create customer. Please try again.");
      }
    });
  }

  const textField = (name: string, label: string, required?: boolean, placeholder?: string) => (
    <div className="flex items-center gap-2 mb-1.5" key={name}>
      <label className="am-label flex-shrink-0" style={{ width: "140px", textAlign: "right" }}>
        {label}:{required && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        type="text"
        name={name}
        required={required}
        placeholder={placeholder}
        className="flex-1 px-2 py-1"
        style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }}
      />
    </div>
  );

  const selectField = (name: string, label: string, options: string[], defaultVal?: string) => (
    <div className="flex items-center gap-2 mb-1.5" key={name}>
      <label className="am-label flex-shrink-0" style={{ width: "140px", textAlign: "right" }}>
        {label}:
      </label>
      <select
        name={name}
        defaultValue={defaultVal}
        className="flex-1 px-2 py-1"
        style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }}
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="p-3">
      <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)", marginBottom: "12px" }}>
        Add New Customer
      </h2>

      <form onSubmit={handleSubmit} style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
        {error && (
          <div className="mx-4 mt-3 px-3 py-2" style={{ background: "#fdecea", border: "1px solid #f5c6cb", color: "#721c24", fontSize: "12px" }}>
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 p-4">
          <div>
            <div className="am-section-green mb-2" style={{ cursor: "default" }}>Personal Information</div>
            {textField("firstName", "First Name", true)}
            {textField("lastName", "Last Name", true)}
            {textField("addressStreet", "Address")}
            {textField("addressCity", "City")}
            {textField("addressState", "State")}
            {textField("addressZip", "Zip")}
            {textField("email", "Email", false, "email@example.com")}
            {textField("email2", "Email 2")}
            {textField("cell", "Cell Phone", false, "(xxx) xxx-xxxx")}
            {textField("home", "Home Phone")}
            {textField("work", "Work Phone")}
            {selectField("language", "Language", ["English", "Spanish", "Vietnamese", "Chinese", "Korean", "Other"], "English")}
            {selectField("gender", "Gender", ["M", "F"])}
          </div>

          <div>
            <div className="am-section-green mb-2" style={{ cursor: "default" }}>Account Information</div>
            {selectField("customerType", "Customer Type", ["Personal Lines", "Commercial Lines"], "Personal Lines")}
            {selectField("accountType", "Account Type", ["Customer", "Prospect"], "Customer")}
            {selectField("source", "Source", ["Referral", "Walk-in", "Phone", "Web", "Social Media", "Other"])}
            {textField("subSource", "Sub Source")}
            <div className="flex items-center gap-2 mb-1.5">
              <label className="am-label flex-shrink-0" style={{ width: "140px", textAlign: "right" }}>DOB:</label>
              <input type="date" name="dob" className="flex-1 px-2 py-1" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px" }} />
            </div>

            <div className="am-section-green mt-3 mb-2" style={{ cursor: "default" }}>Communication Preferences</div>
            {["doNotEmail", "doNotText", "doNotCall", "doNotMail", "doNotMarket", "doNotCaptureEmail"].map((pref) => {
              const labels: Record<string, string> = {
                doNotEmail: "Do Not Email",
                doNotText: "Do Not Text",
                doNotCall: "Do Not Call",
                doNotMail: "Do Not Mail",
                doNotMarket: "Do Not Market",
                doNotCaptureEmail: "Do Not Capture Email",
              };
              return (
                <div key={pref} className="flex items-center gap-2 mb-1">
                  <label className="am-label flex-shrink-0" style={{ width: "140px", textAlign: "right" }}>{labels[pref]}:</label>
                  <select name={pref} defaultValue="No" className="px-2 py-0.5" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px", width: "80px" }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-4 pb-2">
          <label className="am-label block mb-1">Comments:</label>
          <textarea name="comments" rows={3} className="w-full px-2 py-1" style={{ border: "1px solid var(--input-border)", fontSize: "12px", borderRadius: "2px", resize: "vertical" }} />
        </div>

        <div className="flex justify-end gap-2 px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
          <button type="button" onClick={() => router.push("/customers")} className="px-4 py-1.5 text-xs font-medium" style={{ background: "var(--tab-bg)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer" }}>
            Cancel
          </button>
          <button type="submit" disabled={isPending} className="px-4 py-1.5 text-xs font-bold" style={{ background: isPending ? "var(--text-muted)" : "var(--btn-green-bg)", color: "var(--btn-green-text)", border: "1px solid var(--btn-green-hover)", borderRadius: "2px", cursor: isPending ? "not-allowed" : "pointer" }}>
            {isPending ? "Saving..." : "Save Customer"}
          </button>
        </div>
      </form>
    </div>
  );
}
