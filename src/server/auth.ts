import "server-only";
import { api, apiWithStatus } from "./fetch";

export const getSession = () => {
  return api<Session>("/user");
};

export const getSessionWithErrorCode = () => {
  return apiWithStatus<Session>("/user");
};

export const getAdminSession = () => {
  return api<Omit<Session, "email_verified_at">>("/admin");
};
