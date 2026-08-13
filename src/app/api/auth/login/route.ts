import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Harap isi email dan kata sandi." },
        { status: 400 }
      );
    }

    // Query user from Neon PostgreSQL database
    const users = await sql`
      SELECT id, name, email, password, role FROM users WHERE email = ${email.trim().toLowerCase()} LIMIT 1
    `;

    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email atau kata sandi tidak valid." },
        { status: 401 }
      );
    }

    const user = users[0] as any;

    // Verify hashed password against Neon database record
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Email atau kata sandi tidak valid." },
        { status: 401 }
      );
    }

    // Authentication successful
    return NextResponse.json({
      success: true,
      message: "Autentikasi berhasil!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Database authentication error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat terhubung ke database." },
      { status: 500 }
    );
  }
}
