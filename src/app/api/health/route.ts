import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const officeCount = await prisma.office.count();
    const dbUrl = process.env.DATABASE_URL?.substring(0, 30) + "...";
    return NextResponse.json({
      status: "ok",
      database: "connected",
      users: userCount,
      offices: officeCount,
      dbUrlPrefix: dbUrl,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      status: "error",
      error: message,
      dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 30) + "...",
    }, { status: 500 });
  }
}
