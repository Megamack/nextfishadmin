// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    coverImage?: string | null; // Add your custom property here
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      coverImage?: string | null; // Add here as well
      role?: string | null; // 👈 Add this
    };
  }
}

// next-auth.d.ts
import NextAuth from "next-auth";
