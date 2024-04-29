// import {
//   NextResponse,
//   type NextFetchEvent,
//   type NextRequest,
// } from "next/server";

export async function middleware() {
  // const requestHeaders = new Headers(req.headers);
  // const data = await fetch(
  //   process.env.NEXT_PUBLIC_BACKEND_URL + "/sanctum/csrf-cookie",
  //   {
  //     headers: req.headers,
  //   },
  // );
  // const cookies = data.headers.get("set-cookie")!;
  // requestHeaders.set("set-cookie", cookies);
  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)"],
};
