import prisma from "@/lib/db";

export async function getCustomers(search?: string) {
  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { firstName: { contains: search } },
      { lastName: { contains: search } },
      { email: { contains: search } },
      { cell: { contains: search } },
      { customerIdDisplay: { contains: search } },
    ];
  }

  return prisma.customer.findMany({
    where,
    include: {
      agentOfRecord: { select: { firstName: true, lastName: true } },
      office: { select: { name: true, code: true } },
      _count: { select: { policies: true, payments: true, notes: true, tasks: true, attachments: true, quotes: true, claims: true } },
    },
    orderBy: { lastName: "asc" },
    take: 100,
  });
}

export async function getCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      agentOfRecord: { select: { firstName: true, lastName: true } },
      enteredBy: { select: { firstName: true, lastName: true } },
      keyedBy: { select: { firstName: true, lastName: true } },
      office: { select: { name: true, code: true } },
      _count: {
        select: {
          policies: true,
          payments: true,
          notes: true,
          tasks: true,
          attachments: true,
          quotes: true,
          claims: true,
          diaryEntries: true,
          householdPrimary: true,
          roleAssignments: true,
        },
      },
    },
  });
}

export async function getCustomerPolicies(customerId: string) {
  return prisma.policy.findMany({
    where: { customerId },
    include: {
      carrier: { select: { name: true, code: true } },
      agentOfRecord: { select: { firstName: true, lastName: true } },
    },
    orderBy: { effectiveDate: "desc" },
  });
}

export async function getCustomerPayments(customerId: string) {
  return prisma.payment.findMany({
    where: { customerId },
    include: {
      carrier: { select: { name: true } },
      office: { select: { code: true } },
      policy: { select: { policyNumber: true } },
    },
    orderBy: { paymentDate: "desc" },
  });
}

export async function getCustomerNotes(customerId: string) {
  return prisma.note.findMany({
    where: { customerId },
    include: {
      createdBy: { select: { firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCustomerQuotes(customerId: string) {
  return prisma.quote.findMany({
    where: { customerId },
    include: {
      carrier: { select: { name: true } },
      agentOfRecord: { select: { firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCustomerTasks(customerId: string) {
  return prisma.task.findMany({
    where: { customerId },
    include: {
      assignedTo: { select: { firstName: true, lastName: true } },
    },
    orderBy: { dueDate: "asc" },
  });
}

export async function getCustomerClaims(customerId: string) {
  return prisma.claim.findMany({
    where: { customerId },
    include: {
      carrier: { select: { name: true } },
      policy: { select: { policyNumber: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDashboardStats() {
  const [totalCustomers, totalPolicies, openTasks, pendingQuotes] = await Promise.all([
    prisma.customer.count({ where: { status: "Active" } }),
    prisma.policy.count({ where: { status: "Active" } }),
    prisma.task.count({ where: { status: "pending" } }),
    prisma.quote.count({ where: { status: "Pending" } }),
  ]);

  return { totalCustomers, totalPolicies, openTasks, pendingQuotes };
}
