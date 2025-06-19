import bcrypt from "bcrypt";
import { prisma } from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, reEnterPassword } = body;

    if (!firstName || !lastName || !email || !password || !reEnterPassword) {
      return new NextResponse("All fields are required.", { status: 400 });
    }

    if (password !== reEnterPassword) {
      return new NextResponse("Passwords do not match.", { status: 400 });
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      return new NextResponse(
        "Password must be at least 8 characters long and include both letters and numbers.",
        { status: 400 },
      );
    }

    const formattedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: formattedEmail },
    });

    if (existingUser) {
      return new NextResponse("Email already exists.", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminEmails =
      process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
    const role = adminEmails.includes(formattedEmail) ? "ADMIN" : "USER";

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: formattedEmail,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });
  } catch (error) {
    console.error("Register error:", error);
    return new NextResponse("Something went wrong.", { status: 500 });
  }
}
