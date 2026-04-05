import { getCustomerTasks } from "@/modules/customers/queries";
import DataTable from "@/components/ui/DataTable";
import ActionBar from "@/components/ui/ActionBar";

/**
 * Tasks Tab — real data
 */

interface TaskDisplay {
  id: string;
  title: string;
  type: string;
  priority: string;
  status: string;
  dueDate: string;
  assignedTo: string;
}

export default async function TasksTab({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tasks = await getCustomerTasks(id);

  const displayData: TaskDisplay[] = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    type: t.type,
    priority: t.priority,
    status: t.status,
    dueDate: t.dueDate ? t.dueDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "",
    assignedTo: t.assignedTo ? `${t.assignedTo.firstName} ${t.assignedTo.lastName}` : "",
  }));

  const columns = [
    { key: "title", header: "Task", render: (row: TaskDisplay) => <span style={{ color: "var(--link)" }}>{row.title}</span> },
    { key: "type", header: "Type" },
    {
      key: "priority",
      header: "Priority",
      render: (row: TaskDisplay) => (
        <span style={{ color: row.priority === "high" ? "#e74c3c" : "var(--text)", fontWeight: row.priority === "high" ? "bold" : "normal" }}>
          {row.priority}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: TaskDisplay) => (
        <span style={{ color: row.status === "completed" ? "var(--status-active)" : "var(--status-pending)", fontWeight: "bold" }}>
          {row.status}
        </span>
      ),
    },
    { key: "dueDate", header: "Due Date" },
    { key: "assignedTo", header: "Assigned To" },
  ];

  return (
    <div>
      <ActionBar actions={[{ label: "Add Task" }, { label: "Complete Selected" }]} />
      <DataTable<TaskDisplay>
        columns={columns}
        data={displayData}
        emptyMessage="No Tasks Found"
        rowKey={(row) => row.id}
      />
    </div>
  );
}
