import "server-only";
import { api } from "./fetch";

export const getSession = () => {
  return api<User>("/api/user", {
    cache: "no-store",
  });
};
