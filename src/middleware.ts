// src/middleware.ts
import { auth } from "@/auth"; // <-- Replace with your actual auth.ts path
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  const role = session.user.role;

  // Redirect unauthenticated users
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url)); // or login route
  }

  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";

  // Restrict access based on role
  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  if (pathname.startsWith("/user") && !isUser) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
