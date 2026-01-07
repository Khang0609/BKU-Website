import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  // Public routes - allow always
  if (
    pathname === "/" ||
    pathname === "/403" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // file extension usually means static resource
  ) {
    return NextResponse.next();
  }

  // Admin Routes protection
  // Routes corresponding to app/(admin)/*
  const adminRoutes = ["/features", "/monitoring", "/users"];
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  // Student Routes protection
  // Routes corresponding to app/(student)/*
  const studentRoutes = [
    "/dashboard",
    "/student-service",
    "/calendar",
    "/course",
    "/message",
      ];

  // General routes for all authenticated users
  if (pathname.startsWith("/profile")) {
    if (!role) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
    return NextResponse.next();
  }

  const studentRoutesList = [
    "/dashboard",
    "/student-service",
    "/calendar",
    "/course",
    "/message",
  ];
  if (studentRoutes.some((route) => pathname.startsWith(route))) {
    if (role !== "STUDENT") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  // Allow other routes if they don't match any protected group
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
