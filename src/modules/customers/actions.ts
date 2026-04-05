"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCustomer(formData: FormData) {
  const agencyResult = await prisma.agency.findFirst();
  if (!agencyResult) throw new Error("No agency found");

  const lastCustomer = await prisma.customer.findFirst({
    orderBy: { customerIdDisplay: "desc" },
  });
  const nextId = lastCustomer
    ? String(parseInt(lastCustomer.customerIdDisplay) + 1)
    : "114961844";

  const customer = await prisma.customer.create({
    data: {
      agencyId: agencyResult.id,
      customerIdDisplay: nextId,
      firstName: (formData.get("firstName") as string)?.toUpperCase() || "",
      lastName: (formData.get("lastName") as string)?.toUpperCase() || "",
      customerType: (formData.get("customerType") as string) || "Personal Lines",
      accountType: (formData.get("accountType") as string) || "Customer",
      status: "Active",
      addressStreet: formData.get("addressStreet") as string,
      addressCity: formData.get("addressCity") as string,
      addressState: formData.get("addressState") as string,
      addressZip: formData.get("addressZip") as string,
      email: formData.get("email") as string,
      email2: formData.get("email2") as string,
      cell: formData.get("cell") as string,
      home: formData.get("home") as string,
      work: formData.get("work") as string,
      language: (formData.get("language") as string) || "English",
      gender: formData.get("gender") as string,
      source: formData.get("source") as string,
      subSource: formData.get("subSource") as string,
      dob: formData.get("dob") ? new Date(formData.get("dob") as string) : null,
      comments: formData.get("comments") as string,
      doNotEmail: formData.get("doNotEmail") === "Yes",
      doNotText: formData.get("doNotText") === "Yes",
      doNotCall: formData.get("doNotCall") === "Yes",
      doNotMail: formData.get("doNotMail") === "Yes",
      doNotMarket: formData.get("doNotMarket") === "Yes",
      doNotCaptureEmail: formData.get("doNotCaptureEmail") === "Yes",
    },
  });

  revalidatePath("/customers");
  return { id: customer.id };
}

export async function updateCustomer(id: string, formData: FormData) {
  await prisma.customer.update({
    where: { id },
    data: {
      firstName: (formData.get("firstName") as string)?.toUpperCase(),
      lastName: (formData.get("lastName") as string)?.toUpperCase(),
      addressStreet: formData.get("addressStreet") as string,
      addressCity: formData.get("addressCity") as string,
      addressState: formData.get("addressState") as string,
      addressZip: formData.get("addressZip") as string,
      email: formData.get("email") as string,
      cell: formData.get("cell") as string,
      home: formData.get("home") as string,
      work: formData.get("work") as string,
      source: formData.get("source") as string,
      comments: formData.get("comments") as string,
    },
  });

  revalidatePath(`/customers/${id}`);
  revalidatePath("/customers");
}

export async function addNote(customerId: string, content: string) {
  const agencyResult = await prisma.agency.findFirst();
  if (!agencyResult) throw new Error("No agency found");

  await prisma.note.create({
    data: {
      agencyId: agencyResult.id,
      customerId,
      noteType: "note",
      content,
    },
  });

  revalidatePath(`/customers/${customerId}/notes`);
}

export async function deleteNote(noteId: string, customerId: string) {
  await prisma.note.delete({ where: { id: noteId } });
  revalidatePath(`/customers/${customerId}/notes`);
}

export async function addTask(
  customerId: string,
  title: string,
  priority: string,
  dueDate: string
) {
  const agencyResult = await prisma.agency.findFirst();
  if (!agencyResult) throw new Error("No agency found");

  await prisma.task.create({
    data: {
      agencyId: agencyResult.id,
      customerId,
      title,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      status: "pending",
      type: "general",
    },
  });

  revalidatePath(`/customers/${customerId}/tasks`);
}

export async function completeTask(taskId: string, customerId: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { status: "completed", completedAt: new Date() },
  });
  revalidatePath(`/customers/${customerId}/tasks`);
}

export async function addPayment(
  customerId: string,
  amount: number,
  policyId?: string
) {
  const agencyResult = await prisma.agency.findFirst();
  if (!agencyResult) throw new Error("No agency found");

  const count = await prisma.payment.count();
  await prisma.payment.create({
    data: {
      agencyId: agencyResult.id,
      customerId,
      policyId: policyId || null,
      receiptRef: `R-${1000 + count + 1}`,
      status: "Active",
      amountBilled: amount,
      amountTendered: amount,
      paymentDate: new Date(),
    },
  });

  revalidatePath(`/customers/${customerId}/pay-history`);
}
