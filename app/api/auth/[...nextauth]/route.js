import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (user && user.id) {
        session.user = session.user || {};
        session.user.id = user.id; // Ensure user.id is set
        session.user.name = user.name; // Ensure name is set for display
      }
      console.log("NextAuth session callback - Session:", session, "User:", user);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure secret is set
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };