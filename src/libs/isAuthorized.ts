import { auth } from "@/auth"; // adjust path to your app's auth config

export const isAuthorized = async () => {
  const session = await auth();
  return session?.user;
};
