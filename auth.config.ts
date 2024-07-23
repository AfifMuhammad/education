import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import db from "./lib/db";
import { SignIn } from "./actions/auth/schema";

export default {
  pages: {
    signIn: "/auth",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        let user = null;

        const { email, password } = await SignIn.parseAsync(credentials);
        user = await db.user.findFirst({
          where: {
            email: email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await bcrypt.compare(password, user.password!))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user;
        return session;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
