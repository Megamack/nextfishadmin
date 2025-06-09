import { prisma } from "@/libs/prismaDb";
import { NextResponse } from "next/server";
import { auth } from "@/auth"; // ✅ updated import
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, image } = body;

  const session = await auth(); // ✅ v5 session

  const updateData: { [key: string]: any } = {};

  if (!session?.user) {
    return new NextResponse(JSON.stringify("User not found!"), { status: 400 });
  }

  if (body === null) {
    return new NextResponse(JSON.stringify("Missing Fields"), { status: 400 });
  }

  if (session.user.email?.includes("demo-")) {
    return new NextResponse(JSON.stringify("Can't update demo user"), {
      status: 401,
    });
  }

  if (name) {
    updateData.name = name;
  }
  if (email) {
    updateData.email = email.toLowerCase();
  }
  if (image) {
    updateData.image = image;
  }

  try {
    const user = await prisma.user.update({
      where: {
        email: session.user.email as string,
      },
      data: {
        ...updateData,
      },
    });

    revalidatePath("/user");

    return NextResponse.json(
      {
        email: user.email,
        name: user.name,
        image: user.image,
      },
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
