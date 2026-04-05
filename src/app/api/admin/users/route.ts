import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: { select: { name: true } },
        office: { select: { name: true, code: true } },
      },
      orderBy: { lastName: "asc" },
    });

    return NextResponse.json(users.map(u => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      role: u.role?.name || "—",
      office: u.office?.code || u.office?.name || "—",
      status: u.status,
      lastLogin: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
    })));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
