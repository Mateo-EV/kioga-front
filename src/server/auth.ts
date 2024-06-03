import "server-only";
import { api } from "./fetch";

export const getSession = () => {
  return api<User>("/user", {
    cache: "no-store",
  });
};

export const getAdminSession = () => {
  return api<User>("/admin", {
    cache: "no-store",
  });
};
