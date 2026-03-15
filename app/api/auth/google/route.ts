import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token Google tidak ditemukan" },
        { status: 400 },
      );
    }

    // 1. Ambil data user langsung dari Google API menggunakan access_token
    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!googleRes.ok) {
      return NextResponse.json(
        { message: "Token Google tidak valid" },
        { status: 401 },
      );
    }

    const payload = await googleRes.json();

    if (!payload || !payload.email) {
      return NextResponse.json(
        { message: "Data user Google tidak valid" },
        { status: 400 },
      );
    }

    const { email, name, picture, sub: googleId } = payload;

    // 2. Cari atau Buat User di database tunggal kamu
    let user = await prisma.account.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        google_id: true,
      },
    });

    if (!user) {
      user = await prisma.account.create({
        data: {
          email,
          name,
          google_avatar: picture,
          google_id: googleId,
          password: null,
          is_active: true,
        },
      });
    } else {
      if (!user.google_id) {
        user = await prisma.account.update({
          where: { id: user.id },
          data: { google_id: googleId, google_avatar: picture },
        });
      }
    }

    const cookieStore = await cookies();
    cookieStore.set("userId", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ message: "Login Berhasil", role: user.role });
  } catch (error) {
    console.error("GOOGLE_LOGIN_ERROR:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 },
    );
  }
}
