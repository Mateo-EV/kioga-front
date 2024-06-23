"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ButtonWithLoading } from "@/components/ui/button";
import { Form, FormController } from "@/components/ui/form";
import { useForm } from "@/hooks/useForm";
import axios, { type AxiosError } from "@/lib/axios";
import { loginUserSchema } from "@/lib/schemas";
import { LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type z from "zod";

const emailValidationSchema = loginUserSchema.pick({ email: true });

export default function ForgotPasswordContent() {
  const form = useForm<z.infer<typeof emailValidationSchema>>({
    schema: emailValidationSchema,
    defaultValues: {
      email: "",
    },
  });

  const [status, setStatus] = useState<string | null>(null);

  const sendEmailToResetPassword = form.handleSubmit(async (values) => {
    try {
      const { data } = await axios.post<{ status: string }>(
        "/forgot-password",
        values,
      );
      setStatus(data.status);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status !== 422) throw err;
      toast.error(err.response.data.message);
    }
  });

  return (
    <div className="space-y-4">
      <p>
        ¿Olvidaste tu contraseña? No hay problema. Sólo déjanos saber tu
        dirección de correo electrónico y le enviaremos un enlace para
        restablecer su contraseña.
      </p>

      <Form {...form}>
        <form onSubmit={sendEmailToResetPassword} className="space-y-4">
          <FormController control={form.control} name="email" label="Email" />
          <ButtonWithLoading
            isLoading={form.formState.isSubmitting}
            className="w-full"
          >
            Enviar enlace
          </ButtonWithLoading>
        </form>
      </Form>

      {status !== null && (
        <Alert>
          <LockKeyholeIcon className="size-4" />
          <AlertTitle>Enviado</AlertTitle>
          <AlertDescription>
            Se ha enviado un enlace para para restablecer su contraseña.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
