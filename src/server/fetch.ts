import { env } from "@/env";
import { headers, headers as headers_from_next } from "next/headers";
import "server-only";

type fetchParams = Parameters<typeof fetch>;

export async function api<T>(url: string, init?: fetchParams[1]) {
  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Origin", env.NEXT_PUBLIC_APP_URL);
  headers.set("Cookie", headers_from_next().get("cookie") ?? "");
  // headers.set("x-forwarded-for", headers_from_next().get("ip") ?? "127.0.0.0");
  // console.log(getIp());

  const request = await fetch(env.NEXT_PUBLIC_BACKEND_URL + "/api" + url, {
    ...init,
    headers,
    credentials: "include",
  });

  if (!request.ok) {
    if (request.status === 429) {
      throw new Error("Too many requests");
    }

    return null;
  }

  return request.json() as T;
}

// const getIp = () => {
//   const forwardedFor = headers().get("x-forwarded-for");
//   const realIp = headers().get("x-real-ip");

//   if (forwardedFor) return forwardedFor.split(",")[0]?.trim();

//   if (realIp) return realIp.trim();

//   return "127.0.0.1";
// };

export async function apiWithStatus<T>(url: string, init?: fetchParams[1]) {
  const headers = new Headers(headers_from_next());
  headers.set("Accept", "application/json");
  headers.set("Origin", env.NEXT_PUBLIC_APP_URL);
  headers.set("Cookie", headers_from_next().get("cookie") ?? "");

  const request = await fetch(env.NEXT_PUBLIC_BACKEND_URL + "/api" + url, {
    ...init,
    headers,
    credentials: "include",
  });

  if (!request.ok) {
    return { status: request.status, data: null };
  }

  return { data: request.json() as T, status: request.status };
}
