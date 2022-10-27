import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/Prisma";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Email and Password',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            // authorize: async (credentials) => {
            //     const payload = {
            //         email: credentials.email,
            //         password: credentials.password,
            //     };

            //     const url = process.env.NEXT_API_DOMAIN || `http://localhost:3000//api/user`;
            //     const res = await fetch(url, {
            //         method: 'POST',
            //         body: JSON.stringify(payload),
            //         headers: { "Content-Type": "application/json" }
            //     });

            //     const user = await res.json();
            //     return (res.ok && user) ? user[0] : null;
            // }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })

    ],

    pages: {
        signIn: "/login",

    },
    // callbacks: {
    //     jwt: ({ token, user }) => {
    //         if (user) {
    //             token.id = user.id;
    //         }
    //         return token;
    //     },

    //     session: ({ session, token }) => {
    //         if (token) {
    //             session.id = token.id
    //         }

    //         return session;
    //     },
    // },

    secret: process.env.SECRET_KEY,
    // jwt: {
    //     secret: process.env.SECRET,
    //     encryption: true,
    // }
});

// export default NextAuth(authOptions);