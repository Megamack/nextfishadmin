"use server";
import { prisma } from "@/libs/prismaDb";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { isAuthorized } from "@/libs/isAuthorized";

type AuthorizedUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  coverImage?: string | null;
  role?: string;
};

export async function getApiKeys() {
  const user = await isAuthorized();

  if (!user) {
    throw new Error("Unauthorized"); // or return [], or null, based on your app logic
  }

  const res = await prisma.apiKey.findMany({
    where: {
      userId: (user as AuthorizedUser).id,
    },
  });

  return res;
}

export async function createApiKey(keyName: string) {
  const user = await isAuthorized();

  if (!user) {
    return null;
  }

  const castUser = user as AuthorizedUser;

  const key = castUser.role ?? "USER";
  const hashedKey = await bcrypt.hash(key, 10);

  await prisma.apiKey.create({
    data: {
      name: keyName,
      key: hashedKey,
      userId: castUser.id,
    },
  });

  revalidatePath("/admin/api");
}

export async function deleteApiKey(id: string) {
  const res = await prisma.apiKey.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/api");
  return res;
}
