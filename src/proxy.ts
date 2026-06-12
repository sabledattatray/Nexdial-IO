import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = withAuth(
  function middleware(req) {
    // Only check authentication at the edge.
    // Role-based authorization is handled by the server layouts to ensure fresh DB data.
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export function proxy(req: any, event: any) {
  return middleware(req, event);
}

export const config = {
  matcher: [
    "/crm/:path*",
    "/admin/:path*",
    "/supervisor/:path*",
    "/client-portal/:path*",
    "/dialer/:path*",
  ],
};
