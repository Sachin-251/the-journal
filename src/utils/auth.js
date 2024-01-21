import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/Google"
import prisma from "./connect";
import { getServerSession } from "next-auth";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.Google_ID,
        clientSecret: process.env.Google_SECRET,
      }),
      GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
  }

  export const getAuthSession = () => getServerSession(authOptions);