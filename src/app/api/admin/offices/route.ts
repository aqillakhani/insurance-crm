import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      include: {
        district: { select: { name: true } },
        _count: { select: { users: true, customers: true } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(offices.map(o => ({
      id: o.id,
      name: o.name,
      code: o.code || "—",
      district: o.district?.name || "—",
      userCount: o._count.users,
      customerCount: o._count.customers,
      status: o.isActive ? "Active" : "Inactive",
    })));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
