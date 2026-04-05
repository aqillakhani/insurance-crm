import prisma from "@/lib/db";

export async function getUsers() {
  return prisma.user.findMany({
    include: {
      role: { select: { name: true } },
      office: { select: { name: true, code: true } },
    },
    orderBy: { lastName: "asc" },
  });
}

export async function getOffices() {
  return prisma.office.findMany({
    include: {
      district: { select: { name: true } },
      _count: { select: { users: true, customers: true } },
    },
    orderBy: { name: "asc" },
  });
}

export async function getCarriers() {
  return prisma.carrier.findMany({
    include: {
      _count: { select: { policies: true } },
    },
    orderBy: { name: "asc" },
  });
}
