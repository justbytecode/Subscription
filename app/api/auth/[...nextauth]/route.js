import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Log environment variables for debugging
console.log("Auth: NEXTAUTH_URL =", process.env.NEXTAUTH_URL);
console.log("Auth: NEXTAUTH_SECRET =", !!process.env.NEXTAUTH_SECRET ? "Set" : "Not set");

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        let userId;
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          userId = existingUser.id;
          const existingAccount = await prisma.account.findFirst({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
          }
          console.log("Sign-in: Existing user linked", { userId, email: user.email });
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              emailVerified: new Date(),
            },
          });
          userId = newUser.id;

          await prisma.account.create({
            data: {
              userId: newUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          });
          console.log("Sign-in: New user created", { userId, email: user.email });
        }

        user.id = userId;
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.role = user.role || null;
        console.log("JWT callback: Token updated", { id: token.id, role: token.role });
      }
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id },
            select: { role: true },
          });
          token.role = dbUser?.role || token.role;
          console.log("JWT callback: Role fetched from DB", { id: token.id, role: token.role });
        } catch (error) {
          console.error("JWT callback: Error fetching user role", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = session.user || {};
        session.user.id = token.id;
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id },
            select: { role: true },
          });
          session.user.role = dbUser?.role || token.role;
          console.log("Session callback: Session updated", { userId: token.id, role: session.user.role });
        } catch (error) {
          console.error("Session callback: Error fetching user role", error);
          session.user.role = token.role;
        }
      } else {
        console.error("Session callback: No token.id found", { token, session });
        if (session.user?.email) {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { email: session.user.email },
              select: { id: true, role: true },
            });
            if (dbUser) {
              session.user.id = dbUser.id;
              session.user.role = dbUser.role;
              console.log("Session callback: Fallback user ID set from email", { userId: dbUser.id, role: dbUser.role });
            }
          } catch (error) {
            console.error("Session callback: Error fetching user by email", error);
          }
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };