"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ButtonWithLoading, buttonVariants } from "@/components/ui/button";
import { Form, FormController } from "@/components/ui/form";
import { useForm } from "@/hooks/useForm";
import axios, { type AxiosError } from "@/lib/axios";
import {
  resetPasswordSchema,
  type resetPasswordSchemaType,
} from "@/lib/schemas";
import { LockKeyholeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type ResetPasswordContentProps = {
  token: string;
  email?: string;
};

export default function ResetPasswordContent({
  token,
  email,
}: ResetPasswordContentProps) {
  const form = useForm<resetPasswordSchemaType>({
    schema: resetPasswordSchema,
    defaultValues: {
      email,
      password: "",
      password_confirmation: "",
    },
  });

  const [status, setStatus] = useState<string | null>(null);

  const resetPassword = form.handleSubmit(async (values) => {
    try {
      const { data } = await axios.post<{ status: string }>("/reset-password", {
        token,
        ...values,
      });

      setStatus(data.status);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status !== 422) throw err;
      toast.error(err.response.data.message);
    }
  });

  if (status === null)
    return (
      <Form {...form}>
        <form onSubmit={resetPassword} className="w-full space-y-4">
          <FormController control={form.control} name="email" label="Email" />
          <FormController
            control={form.control}
            name="password"
            label="Contraseña"
            inputProps={{
              type: "password",
            }}
          />
          <FormController
            control={form.control}
            name="password_confirmation"
            label="Confirmar contraseña"
            inputProps={{
              type: "password",
            }}
          />
          <ButtonWithLoading
            isLoading={form.formState.isSubmitting}
            className="w-full"
          >
            Actualizar Contraseña
          </ButtonWithLoading>
        </form>
      </Form>
    );

  return (
    <div className="w-full space-y-4">
      <Alert>
        <LockKeyholeIcon className="size-4" />
        <AlertTitle>Contraseña Reseteada</AlertTitle>
        <AlertDescription>Su contraseña ha si actualizada</AlertDescription>
      </Alert>
      <Link href="/login" className={buttonVariants({ className: "w-full" })}>
        Iniciar Sesión
      </Link>
    </div>
  );
}
