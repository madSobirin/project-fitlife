import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token Google tidak ditemukan" },
        { status: 400 },
      );
    }

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${token}` } },
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

    // Cari atau buat user
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
    } else if (!user.google_id) {
      user = await prisma.account.update({
        where: { id: user.id },
        data: { google_id: googleId, google_avatar: picture },
      });
    }

    // Update last_login_at
    await prisma.account.update({
      where: { id: user.id },
      data: { last_login_at: new Date() },
    });

    // ── Buat JWT ──
    const jwtToken = await new SignJWT({
      userId: user.id,
      role: user.role,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // ── Simpan ke cookie ──
    const cookieStore = await cookies();
    cookieStore.set("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Hapus cookie lama kalau masih ada
    cookieStore.delete("userId");
    cookieStore.delete("role");

    return NextResponse.json({
      message: "Login Berhasil",
      token: jwtToken, // ← untuk mobile
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("GOOGLE_LOGIN_ERROR:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 },
    );
  }
}
