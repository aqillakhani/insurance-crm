/**
 * FormField — Label-value pair matching Agency Matrix customer detail layout
 * Reference: Screenshot 5 — two-column label:value pairs
 * Style: Bold label followed by value, compact layout
 */

interface FormFieldProps {
  label: string;
  value?: string | number | null;
  children?: React.ReactNode;
  labelWidth?: string;
}

export default function FormField({
  label,
  value,
  children,
  labelWidth = "140px",
}: FormFieldProps) {
  return (
    <div className="flex items-start py-0.5" style={{ fontSize: "12px" }}>
      <span
        className="am-label flex-shrink-0"
        style={{ width: labelWidth, paddingRight: "8px" }}
      >
        {label}:
      </span>
      <span className="am-value flex-1">
        {children ?? value ?? ""}
      </span>
    </div>
  );
}
