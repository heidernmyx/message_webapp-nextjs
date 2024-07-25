import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import { supabase } from "@/lib/supabase";


const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {},
      authorize: async (credentials) => {

        const { email, password } = credentials as { email: string; password: string };
        let { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        const { user } = data;

        if (error) {
          return null
        }

        return {
          id: user!.id,
          email: user!.email,
          role: user!.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        // console.log(token)
        console.log(session)
        // session.user!.email = token.email; // Add user email to the session
      }
      return session;
    },
    async jwt({ token, user, account }) {
      console.log(user)
      console.log(account)
      console.log(token)
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
