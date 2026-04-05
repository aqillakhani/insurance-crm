import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const carriers = await prisma.carrier.findMany({
      include: { _count: { select: { policies: true } } },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(carriers.map(c => ({
      id: c.id,
      name: c.name,
      code: c.code || "—",
      linesOffered: c.linesOffered || "—",
      appointmentStatus: c.appointmentStatus,
      policyCount: c._count.policies,
    })));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
