import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://drinkzz.vercel.app";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any;
        try {
          const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(`${url}/api/user/signin`, options);
          const user = await response.json();
          if (response.ok && user) {
            return user;
          } else {
            return null;
          }
        } catch (err) {
          console.log("error at signin", err);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      console.log("here2", account);
      if (account?.provider === "google") {
        const { email, name, picture, sub } = profile;
        const user = {
          id: sub,
          email,
          name,
          image: picture,
        };
        const options = {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(`${url}/api/user/oauth`, options);
        return response.ok ? true : false;
      } else if (account?.provider === "credentials") {
        // already authorized above
        return true;
      } else {
        return null;
      }
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user.id = token.id as string;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
  },
};
export default NextAuth(authOptions);
