"use client";

import { ButtonWithLoading, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormController, FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useForm } from "@/hooks/useForm";
import axios, { type AxiosError } from "@/lib/axios";
import {
  loginUserSchema,
  registerUserSchema,
  type loginUserSchemaType,
  type registerUserSchemaType,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CredentialsFormProps = {
  isLoginPage?: boolean;
  isModal?: boolean;
};

function CredentialsForm({
  isLoginPage = false,
  isModal = false,
}: CredentialsFormProps) {
  const form = useForm<loginUserSchemaType | registerUserSchemaType>({
    schema: isLoginPage ? loginUserSchema : registerUserSchema,
    defaultValues: {
      email: "",
      password: "",
      remember: false,
      name: "",
      password_confirmation: "",
    },
  });
  const router = useRouter();

  const onSubmit = (values: loginUserSchemaType | registerUserSchemaType) => {
    if (isLoginPage) {
      axios
        .post("/login", values)
        .then(() => {
          router.push("/dashboard");
        })
        .catch((error: AxiosError) => {
          if (error.response?.status !== 422) throw error;

          for (const key in error.response.data.errors) {
            form.setError(key as never, {
              type: "custom",
              message: error.response.data.errors[key]![0],
            });
          }
        });
    } else {
      axios
        .post("/register", values)
        .then((res) => res.data as object)
        .catch((error: AxiosError) => {
          if (error.response?.status !== 422) throw error;

          for (const key in error.response.data.errors) {
            form.setError(key as never, {
              type: "custom",
              message: error.response.data.errors[key]![0],
            });
          }
        });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {!isLoginPage && (
          <FormController control={form.control} name="name" label="Name" />
        )}
        <FormController
          control={form.control}
          name="email"
          label="Email"
          inputProps={{ type: "email" }}
        />

        <FormController
          control={form.control}
          name="password"
          label="Contraseña"
          inputProps={{
            type: "password",
          }}
        />

        {isLoginPage ? (
          <Label className="flex cursor-pointer items-center gap-2">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />

            <span>Recuérdame</span>
          </Label>
        ) : (
          <FormController
            control={form.control}
            name="password_confirmation"
            label="Confirmar Contraseña"
            inputProps={{
              type: "password",
            }}
          />
        )}

        <Link
          className={cn(
            buttonVariants({ variant: "link", size: "sm" }),
            "h-auto justify-end p-0",
          )}
          href="/reset-password"
          replace={isModal}
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <ButtonWithLoading
          isLoading={form.formState.isSubmitting}
          type="submit"
        >
          {isLoginPage ? "Iniciar Sesión" : "Registrarse"}
        </ButtonWithLoading>
      </form>
    </Form>
  );
}

export default CredentialsForm;
