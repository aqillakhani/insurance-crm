"use server";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/constants";

/**
 * Authentication via secure HTTP-only cookie.
 * Session data is base64-encoded JSON stored server-side in httpOnly cookie.
 */

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  agencyId: string;
  agencyName: string;
  role: string;
  officeCode: string;
  officeName: string;
}

export async function loginAction(email: string, password: string): Promise<{ error?: string; success?: boolean }> {
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await prisma.user.findFirst({
    where: { email: email.toLowerCase().trim(), status: "active" },
    include: {
      role: { select: { name: true } },
      office: { select: { name: true, code: true } },
      agency: { select: { id: true, name: true } },
    },
  });

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return { error: "Invalid email or password" };
  }

  const sessionData: SessionUser = {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    agencyId: user.agencyId,
    agencyName: user.agency.name,
    role: user.role?.name || "User",
    officeCode: user.office?.code || "",
    officeName: user.office?.name || "",
  };

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, Buffer.from(JSON.stringify(sessionData)).toString("base64"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return { success: true };
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) return null;

  try {
    return JSON.parse(Buffer.from(sessionCookie.value, "base64").toString()) as SessionUser;
  } catch {
    return null;
  }
}
