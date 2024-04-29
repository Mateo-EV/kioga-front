import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

export type loginUserSchemaType = z.infer<typeof loginUserSchema>;

export const registerUserSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(255),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string(),
  })
  .refine(
    ({ password_confirmation, password }) => password === password_confirmation,
    {
      message: "Password must be equals",
      path: ["password_confirmation"],
    },
  );

export type registerUserSchemaType = z.infer<typeof registerUserSchema>;

export const resetPasswordSchema = z.object({
  email: z.string(),
});
