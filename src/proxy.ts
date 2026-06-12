import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/crm", req.url));
    }
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
