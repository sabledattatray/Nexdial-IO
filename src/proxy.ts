import { NextRequest } from "next/server";
import middleware from "next-auth/middleware";

export function proxy(req: NextRequest, event: any) {
  return middleware(req as any, event);
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
