import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Simple middleware — no auth wrapping to avoid hangs.
 * Auth is checked at the page/layout level instead.
 */
export function middleware(request: NextRequest) {
  // Just pass through — auth handled in layouts
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
