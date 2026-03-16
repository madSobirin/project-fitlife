import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;
  const userId = request.cookies.get("userId")?.value;

  // jika user masuk ke route admin
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect profile route — harus login
  if (pathname.startsWith("/profile")) {
    if (!userId) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // jika admin membuka root
  if (pathname === "/" && role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/"],
};
