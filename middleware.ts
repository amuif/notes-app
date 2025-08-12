import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
      const sessionCookie = request.cookies.get("better-auth.session-token");
 

      if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
      return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
