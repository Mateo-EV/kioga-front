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

export type AxiosError = AxiosErrorLib<{
  errors: { [P in string]: [string] };
  message: string;
}>;

export default axios;
