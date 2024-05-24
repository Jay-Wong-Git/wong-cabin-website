// import { NextResponse } from "next/server";

import { auth } from "@/app/_lib/auth";

// export function middleware(request) {
//   console.log(request.url);
//   return NextResponse.redirect(new URL("/about", request.url));
// }

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
