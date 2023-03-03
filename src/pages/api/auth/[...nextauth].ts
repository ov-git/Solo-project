import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { ISODateString, NextAuthOptions, Session } from "next-auth";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://drinkzz.vercel.app";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
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
        const logging = {
          email,
          password,
        };
        try {
          const options = {
            method: "POST",
            body: JSON.stringify(logging),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(`${url}/api/user/signin`, options);
          const user = await response.json();
          if (response.ok && user) {
            return user;
          }
          return null;
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
  },
};
export default NextAuth(authOptions);
