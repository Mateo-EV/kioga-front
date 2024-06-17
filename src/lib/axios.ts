"use client";

import Axios, { type AxiosError as AxiosErrorLib } from "axios";
import { env } from "@/env";

const axios = Axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

axios.interceptors.request.use(async (config) => {
  if (
    config.method?.toLowerCase() === "post" ||
    config.method?.toLowerCase() === "put" ||
    config.method?.toLowerCase() === "patch" ||
    config.method?.toLowerCase() === "delete"
  ) {
    await axios.get("/sanctum/csrf-cookie");
  }

  return config;
});

export type AxiosError = AxiosErrorLib<{
  errors: { [P in string]: [string] };
  message: string;
}>;

export default axios;
