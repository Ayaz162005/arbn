import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "./prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// console.log(prisma);
// const prisma = {};
export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // Credentials({
    //   name: "Credentials",

    //   credentials: {
    //     email: { label: "Email", type: "email", placeholder: "Email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       throw new Error("User not found");
    //     }

    //     const user = await prisma?.user?.findUnique({
    //       where: {
    //         email: credentials?.email,
    //       },
    //     });

    //     if (!user) {
    //       // Handle case when user is not found
    //       throw new Error("User not found");
    //     }

    //     const isPasswordValid = await bcrypt.compare(
    //       credentials?.password!,
    //       user.hashedPassword!
    //     );

    //     if (!isPasswordValid) {
    //       // Handle invalid password
    //       throw new Error("Invalid password");
    //     }

    //     // Return the user object when authentication is successful
    //     return user;
    //   },
    // }),
  ],
  // pages: {
  //   signIn: "/",
  // },
  secret: process.env.NEXTAUTH_SECRET, // You can uncomment and set a secret if needed

  // callbacks: {
  //   async jwt(token: any, user: any) {
  //     // Customize the JWT token if needed
  //     if (user) {
  //       token.id = user.id; // You can add additional user information to the token
  //     }
  //     return token;
  //   },

  //   async session(session: any, token: any) {
  //     // Customize the session object with additional properties from the token
  //     if (token) {
  //       session.user.id = token.id; // You can add additional user information to the session
  //     }
  //     return session;
  //   },
  // },

  // Additional session configuration can be added here
};
