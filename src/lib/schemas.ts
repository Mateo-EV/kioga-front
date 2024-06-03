import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
  remember: z.boolean(),
});

export type loginUserSchemaType = z.infer<typeof loginUserSchema>;

export const registerUserSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio").max(255),
    email: z
      .string()
      .min(1, "El email es obligatorio")
      .email("El email no es válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    password_confirmation: z.string(),
  })
  .refine(
    ({ password_confirmation, password }) => password === password_confirmation,
    {
      message: "Las contraseñas deben ser iguales",
      path: ["password_confirmation"],
    },
  );

export type registerUserSchemaType = z.infer<typeof registerUserSchema>;

export const resetPasswordSchema = z.object({
  email: z.string(),
});
