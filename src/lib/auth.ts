import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
            status: "active",
          },
          include: {
            role: { select: { name: true, permissions: true } },
            office: { select: { name: true, code: true } },
            agency: { select: { id: true, name: true } },
          },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          agencyId: user.agencyId,
          agencyName: user.agency.name,
          role: user.role?.name || "User",
          officeCode: user.office?.code || "",
          officeName: user.office?.name || "",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.agencyId = (user as Record<string, unknown>).agencyId;
        token.agencyName = (user as Record<string, unknown>).agencyName;
        token.role = (user as Record<string, unknown>).role;
        token.officeCode = (user as Record<string, unknown>).officeCode;
        token.officeName = (user as Record<string, unknown>).officeName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = session.user as any;
        u.agencyId = token.agencyId;
        u.agencyName = token.agencyName;
        u.role = token.role;
        u.officeCode = token.officeCode;
        u.officeName = token.officeName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
});
