import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // bcrypt to compare passwords
import { prisma } from "@/libs/prismaDb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Return null to indicate invalid credentials
        }

        try {
          // Fetch user from the database using Prisma
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.log("User not found.");
            return null; // Return null if user is not found
          }

          // Compare passwords
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isPasswordValid) {
            console.log("Invalid password attempt.");
            return null; // Return null if the password is invalid
          }
          console.log("user from auth");
          console.log(user);
          // Return user data if everything is valid
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            coverImage: user.coverImage || "",
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null; // In case of an error, return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user is available, add it to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.coverImage = user.coverImage || "";
        token.firstName = user.firstName || "";
        token.lastName = user.lastName || "";
      }
      return token;
    },
    async session({ session, token }) {
      // Sync token data into the session
      if (session.user) {
        session.user.id = token.id || "";

        session.user.coverImage = token.coverImage || "";

        session.user.firstName = token.firstName || "";
        session.user.lastName = token.lastName || "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
