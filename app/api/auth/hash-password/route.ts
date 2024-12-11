import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json(); // Extract plain password from request

    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 },
      );
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // Return the hashed password
    return NextResponse.json({ hashedPassword }, { status: 200 });
  } catch (error) {
    console.error("Error hashing password:", error);
    return NextResponse.json(
      { message: "Error while hashing password" },
      { status: 500 },
    );
  }
}
