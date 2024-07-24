import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword, verifyPassword } from "../../../utils/password";
import { supabase } from "@/lib/supabase";
import { verify } from "crypto";

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {},
      authorize: async (credentials) => {
        console.log('inside auth');
        const { email, password } = credentials as { email: string; password: string };

        let { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (!data || error) {
          throw new Error("User not found.");
        } else if (data) {
          console.log()
          return null
        }

        // Return null if user is not authenticated
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
