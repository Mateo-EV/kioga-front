import { env } from "@/env";
import { cookies, headers as headers_from_next } from "next/headers";
import "server-only";

type fetchParams = Parameters<typeof fetch>;

export async function api<T>(url: string, init?: fetchParams[1]) {
  const headers = new Headers(headers_from_next());
  headers.set("Accept", "application/json");
  console.log(headers);
  console.log(cookies());

  const request = await fetch(env.NEXT_PUBLIC_BACKEND_URL + url, {
    ...init,
    headers,
    credentials: "include",
  });

  if (!request.ok) return null;

  return request.json() as T;
}
