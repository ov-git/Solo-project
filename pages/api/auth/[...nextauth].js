import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "../../../lib/prisma";

const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    
    secret: process.env.SECRET,
    // adapter: PrismaAdapter(prisma),

};

export default NextAuth(authOptions);