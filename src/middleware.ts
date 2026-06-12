import middleware from "next-auth/middleware";
export default middleware;

export const config = {
  matcher: [
    "/crm/:path*",
    "/admin/:path*",
    "/supervisor/:path*",
    "/client-portal/:path*",
    "/dialer/:path*",
  ],
};
