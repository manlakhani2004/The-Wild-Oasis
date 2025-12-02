import { auth } from "./app/_lib/auth";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // console.log("🔥 Middleware running", req.nextUrl.pathname);

  const session = await auth();
  // console.log("🔥 Session in middleware:", session);

  if (!session?.user) {
    // console.log("🔥 Redirecting to sign-in...");
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account"],
};
