"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    // Prevent rendering until redirect happens
    return null;
  }

  // Optional role-based protection
  if (session?.user.role !== "admin") {
    return <p>Access Denied: Admins only</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>This is a protected admin dashboard.</p>
    </div>
  );
}
