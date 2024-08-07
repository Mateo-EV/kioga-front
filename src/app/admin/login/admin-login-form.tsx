"use client";

import { H3 } from "@/components/typography";
import { ButtonWithLoading } from "@/components/ui/button";
import { Form, FormController } from "@/components/ui/form";
import { useForm } from "@/hooks/useForm";
import axios, { handleErrorWithToast } from "@/lib/axios";
import { loginUserSchema, type loginUserSchemaType } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const AdminLoginForm = () => {
  const form = useForm<Omit<loginUserSchemaType, "remember">>({
    schema: loginUserSchema.omit({ remember: true }),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: Omit<loginUserSchemaType, "remember">) => {
    try {
      await axios.post("/admin/login", values);
      startTransition(() => router.push("/admin/dashboard"));
    } catch (error) {
      handleErrorWithToast(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <H3 className="text-center">Iniciar Sesión</H3>
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
        <ButtonWithLoading
          isLoading={form.formState.isSubmitting || isPending}
          type="submit"
        >
          Iniciar Sesión
        </ButtonWithLoading>
      </form>
    </Form>
  );
};

export default AdminLoginForm;
