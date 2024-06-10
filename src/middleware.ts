// import {
//   NextResponse,
//   type NextFetchEvent,
//   type NextRequest,
// } from "next/server";

import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";
  const headers = req.headers;
  headers.set("ip", ip);
  // const { success } = await ratelimit.limit(ip);

  // if (!success)
  //   return NextResponse.json("Rate limit exceeded", { status: 429 });

  return NextResponse.next({
    headers: headers,
  });
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)"],
};
