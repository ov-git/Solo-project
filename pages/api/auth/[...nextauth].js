import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ], secret: process.env.SECRET,
    // pages: {
    //     signIn: '',
    // }
};

export default NextAuth(authOptions);