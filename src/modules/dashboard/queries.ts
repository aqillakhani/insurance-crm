import prisma from "@/lib/db";

export async function getDashboardData() {
  const [
    totalPolicies,
    totalCustomers,
    openTasks,
    overdueTasks,
    pendingQuotes,
    recentPayments,
    tasksList,
    offices,
  ] = await Promise.all([
    prisma.policy.count({ where: { status: "Active" } }),
    prisma.customer.count({ where: { status: "Active" } }),
    prisma.task.count({ where: { status: "pending" } }),
    prisma.task.count({
      where: { status: "pending", dueDate: { lt: new Date() } },
    }),
    prisma.quote.count({ where: { status: "Pending" } }),
    prisma.payment.findMany({
      orderBy: { paymentDate: "desc" },
      take: 10,
      include: {
        customer: { select: { firstName: true, lastName: true } },
        policy: { select: { policyNumber: true } },
        carrier: { select: { name: true } },
      },
    }),
    prisma.task.findMany({
      where: { status: "pending" },
      orderBy: { dueDate: "asc" },
      take: 8,
      include: {
        customer: { select: { firstName: true, lastName: true } },
        assignedTo: { select: { firstName: true, lastName: true } },
      },
    }),
    prisma.office.findMany({
      include: {
        _count: { select: { customers: true } },
      },
    }),
  ]);

  // Renewal count (policies expiring within 30 days)
  const thirtyDaysOut = new Date();
  thirtyDaysOut.setDate(thirtyDaysOut.getDate() + 30);
  const renewalsDue = await prisma.policy.count({
    where: {
      status: "Active",
      expirationCancelDate: { lte: thirtyDaysOut },
    },
  });

  // Get producer stats
  const producers = await prisma.user.findMany({
    where: { role: { name: "Producer" } },
    include: {
      office: { select: { code: true } },
      _count: {
        select: {
          policiesAgent: true,
          tasksAssigned: true,
          quotesAgent: true,
        },
      },
    },
  });

  const leaderboard = producers
    .map((p) => ({
      name: `${p.firstName} ${p.lastName}`,
      office: p.office?.code || "",
      policiesSold: p._count.policiesAgent,
      quotes: p._count.quotesAgent,
      tasks: p._count.tasksAssigned,
    }))
    .sort((a, b) => b.policiesSold - a.policiesSold);

  return {
    totalPolicies,
    totalCustomers,
    openTasks,
    overdueTasks,
    pendingQuotes,
    renewalsDue,
    recentPayments,
    tasksList,
    leaderboard,
    offices,
  };
}
