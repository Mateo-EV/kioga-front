"use client";

import Axios, { type AxiosError as AxiosErrorLib } from "axios";
import { env } from "@/env";
import { toast } from "sonner";

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

export const handleErrorWithToast = (error: any) => {
  const err = error as AxiosError;
  if (err.response?.status === 422) {
    toast.error(err.response.data.message);
  } else {
    toast.error("Ocurrió un error");
  }
};
