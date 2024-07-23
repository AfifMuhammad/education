import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const auth = req.auth;
  const isLoggedIn = !!auth?.user;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

  if (isOnAdmin) {
    if (isLoggedIn) return NextResponse.next();
    return NextResponse.redirect(new URL("/auth", req.url));
  } else if (isLoggedIn) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
