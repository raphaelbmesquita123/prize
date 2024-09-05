import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "../prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user, session }) {
            const u = await prisma.user.upsert({
                where: {
                    email: session?.user?.email,
                },
                update: {
                    email: session?.user?.email,
                    name: session?.user?.name,
                    avatar: session?.user?.image
                },
                create: {
                    email: session?.user?.email,
                    name: session?.user?.name,
                    avatar: session?.user?.image
                }
            })


            token.userId = u?.id
            return { ...token, ...user, ...account };
        },

        async session({ session, token }) {
            if (!session?.user?.email) {
                return session
            }

            const user = await prisma.user.upsert({
                where: {
                    email: session?.user?.email,
                },
                update: {
                    email: session?.user?.email,
                    name: session?.user?.name,
                    avatar: session?.user?.image
                },
                create: {
                    email: session?.user?.email,
                    name: session?.user?.name,
                    avatar: session?.user?.image
                }
            })

            token.userId = user.id

            return session;
        },

    },
    secret: process.env.NEXTAUTH_SECRET,
}