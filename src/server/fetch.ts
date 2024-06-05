import { env } from "@/env";
import { headers as headers_from_next } from "next/headers";
import "server-only";

type fetchParams = Parameters<typeof fetch>;

export async function api<T>(url: string, init?: fetchParams[1]) {
  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Origin", env.NEXT_PUBLIC_APP_URL);
  headers.set("Cookie", headers_from_next().get("cookie") ?? "");

  const request = await fetch(env.NEXT_PUBLIC_BACKEND_URL + "/api" + url, {
    ...init,
    headers,
    credentials: "include",
  });

  if (!request.ok) {
    return null;
  }

  return request.json() as T;
}

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
