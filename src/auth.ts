/* import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Dummy user example
        const user = { name: "Markus" };
        if (!user) throw new Error("Invalid credentials.");
        return user;
      },
    }),
  ],
});

export { handler }; */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Dummy user example
        const user = {
          name: "Markus",
          email: "markus@gofish.fi",
          coverImage: "url.png",
        };

        if (!user) throw new Error("Invalid credentials.");
        return user;
      },
    }),
  ],
});
