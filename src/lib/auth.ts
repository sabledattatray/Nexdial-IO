// @ts-nocheck
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@nexdial.io" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        if (!user.emailVerified) {
          throw new Error("unverified");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          onboarded: user.onboarded,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;

        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!dbUser) {
          const isSuperAdmin = user.email.toLowerCase() === "sabledattatray@gmail.com";
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "Google User",
              role: isSuperAdmin ? "ADMIN" : "VIEWER",
              workspace: {
                create: {
                  name: `${user.name || "My"} Workspace`,
                  plan: "TRIAL",
                  status: "ACTIVE",
                }
              }
            },
          });
        }

        user.id = dbUser.id;
        (user as any).role = dbUser.role;
        (user as any).onboarded = dbUser.onboarded;
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      // Only hit the database on sign-in, explicit update(), or missing crucial data
      if (user || trigger === "update" || token.onboarded === undefined || !token.workspaceId) {
        if (token.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            select: { id: true, onboarded: true, role: true, workspaceId: true, industry: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.onboarded = dbUser.onboarded;
            token.role = dbUser.role;
            token.workspaceId = dbUser.workspaceId;
            token.industry = dbUser.industry;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
        (session.user as any).onboarded = token.onboarded;
        (session.user as any).workspaceId = token.workspaceId;
        (session.user as any).industry = token.industry;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  }
};

export async function getAuthenticatedSession() {
  return await getServerSession(authOptions);
}
