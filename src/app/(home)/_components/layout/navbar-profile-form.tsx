"use client";

import { Button, ButtonWithLoading } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormController } from "@/components/ui/form";
import { useForm } from "@/hooks/useForm";
import axios, { type AxiosError } from "@/lib/axios";
import { userProfileSchema, type userProfileSchemaType } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type NavbarProfileForm = {
  user: Session;
};

function NavbarProfileForm({ user }: NavbarProfileForm) {
  const form = useForm<userProfileSchemaType>({
    schema: userProfileSchema,
    defaultValues: {
      name: user.name,
      password: "",
      password_confirmation: "",
    },
  });
  const router = useRouter();

  const saveProfileData = form.handleSubmit(async (values) => {
    try {
      console.log(values);

      const { data } = await axios.post<{ message: string }>(
        "/profile/edit",
        values,
      );
      router.refresh();
      toast.success(data.message);
      form.setValue("password", "");
      form.setValue("password_confirmation", "");
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status !== 422) throw err;

      for (const key in err.response.data.errors) {
        form.setError(key as never, {
          type: "custom",
          message: err.response.data.errors[key]![0],
        });
      }
    }
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={saveProfileData}>
        <FormController control={form.control} name="name" label="Nombre" />
        <FormController
          control={form.control}
          name="password"
          label="Contraseña"
          inputProps={{ type: "password" }}
        />
        <FormController
          control={form.control}
          name="password_confirmation"
          label="Confirmar contraseña"
          inputProps={{ type: "password" }}
        />
        <div className="flex justify-between gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Cerrar</Button>
          </DialogClose>
          <ButtonWithLoading isLoading={form.formState.isSubmitting}>
            Guardar
          </ButtonWithLoading>
        </div>
      </form>
    </Form>
  );
}

export default NavbarProfileForm;
