import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Browser mutations must originate from this app, including login/logout.
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    // NextURL normalizes loopback hostnames. Host preserves the browser's
    // actual authority (including port), so 127.0.0.1 and LAN access work.
    const host = request.headers.get("host");
    const expectedOrigin = host ? `${request.nextUrl.protocol}//${host}` : request.nextUrl.origin;
    if (request.headers.get("origin") !== expectedOrigin) {
      return NextResponse.json({ error: "Asal permintaan tidak diizinkan." }, { status: 403 });
    }
  }
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
