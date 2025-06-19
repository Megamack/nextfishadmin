import { prisma } from "@/libs/prismaDb";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, image, phone, bio } = body;

  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "User not found!" }, { status: 400 });
  }

  if (!body || (!name && !email && !image && !phone && !bio)) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  if (session.user.email?.includes("demo-")) {
    return NextResponse.json(
      { error: "Can't update demo user" },
      { status: 401 },
    );
  }

  const updateData: Record<string, any> = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email.toLowerCase();
  if (image) updateData.image = image;
  if (phone) updateData.phone = phone;
  if (bio) updateData.bio = bio;

  try {
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    revalidatePath("/user");

    return NextResponse.json(
      {
        email: user.email,
        name: user.name,
        image: user.image,
        phone: user.phone,
        bio: user.bio,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
