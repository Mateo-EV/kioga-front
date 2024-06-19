"use client";

import {
  Form,
  FormControl,
  FormController,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "@/hooks/useForm";
import { checkoutSchema, type checkoutSchemaType } from "@/lib/schemas";
import CheckoutIsDeliveryController from "./checkout-is-delivery-controller";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import axios, { type AxiosError } from "@/lib/axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DEFAULT_ADDRESS_VALUES = {
  first_name: "",
  last_name: "",
  dni: "",
  phone: "",
  department: "",
  district: "",
  province: "",
  street_address: "",
  zip_code: "",
  reference: "",
};

const NULL_VALUE_FOR_ADDRESS_ID = -1;

function convertNullValuesToEmptyString(
  obj: Record<string, string | null | undefined>,
) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      obj[key] = "";
    }
  }
  return obj as Record<string, string>;
}

function formatValuesToSend(values: checkoutSchemaType) {
  const data = values;

  if (values.address_id !== NULL_VALUE_FOR_ADDRESS_ID) {
    delete data.address;
  } else {
    delete data.address_id;

    const optionalProps = [
      "department",
      "district",
      "province",
      "street_address",
      "zip_code",
      "reference",
    ] as const;

    if (data.is_delivery) {
      optionalProps.forEach((field) => {
        if (!data.address?.[field]) {
          delete data.address?.[field];
        }
      });
    } else {
      optionalProps.forEach((field) => {
        delete data.address?.[field];
      });
    }
  }

  if (!data.notes) delete data.notes;

  return data as NestedObject;
}

function CheckoutForm({
  addresses,
  setIsDelivery,
  setIsMakingOrder,
}: {
  addresses: Address[];
  setIsDelivery: (v: boolean) => void;
  setIsMakingOrder: (v: boolean) => void;
}) {
  const form = useForm<checkoutSchemaType>({
    schema: checkoutSchema,
    defaultValues: {
      is_delivery: true,
      address: DEFAULT_ADDRESS_VALUES,
      address_id: NULL_VALUE_FOR_ADDRESS_ID,
      notes: "",
    },
  });

  const isDelivery = form.watch("is_delivery");
  const addressesFiltered = addresses.filter((address) =>
    isDelivery ? !!address.department : !address.department,
  );

  const addressId = form.watch("address_id");
  const addressIsChosen = addressId !== NULL_VALUE_FOR_ADDRESS_ID;

  useEffect(() => {
    if (addressId === NULL_VALUE_FOR_ADDRESS_ID) {
      form.setValue("address", DEFAULT_ADDRESS_VALUES);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, user_id, ...addressData } = addressesFiltered.find(
        (address) => address.id === addressId,
      )!;

      const addressDataFormatted = convertNullValuesToEmptyString(addressData);

      form.setValue(
        "address",
        addressDataFormatted as typeof DEFAULT_ADDRESS_VALUES,
      );
      form.clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId]);

  useEffect(() => {
    form.setValue("address_id", -1);
    form.setValue("address", DEFAULT_ADDRESS_VALUES);
    setIsDelivery(isDelivery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelivery]);

  const { products, removeAllProducts } = useCart();

  const makeOrder = form.handleSubmit(async (values) => {
    setIsMakingOrder(true);
    const preOrder = formatValuesToSend(values);

    preOrder.details = products.map((product) => ({
      quantity: product.quantity,
      product_id: product.id,
    }));

    console.log(preOrder);

    try {
      const { data } = await axios.post<MercadoPagoPreference>(
        "/api/orders/store",
        preOrder,
      );
      window.location.href = data.init_point;
      removeAllProducts();
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status !== 422) {
        toast.error("Ocurrió un error");
      } else {
        toast.error(err.response.data.message);
      }
    } finally {
      setIsMakingOrder(false);
    }
  });

  return (
    <Form {...form}>
      <form
        id="checkout-form"
        className="grid grid-cols-6 gap-4"
        onSubmit={makeOrder}
      >
        <h2 className="col-span-6 text-xl font-medium">Información de Envío</h2>
        <div
          className={cn(
            "col-span-6 space-y-2",
            addresses.length > 0 && "md:col-span-3",
          )}
        >
          <Label>¿Cómo quieres recibir tu pedido?</Label>
          <CheckoutIsDeliveryController
            control={form.control}
            name="is_delivery"
          />
        </div>

        {addresses.length > 0 && (
          <div className="col-span-6 flex items-center gap-4 md:col-span-3">
            <FormController
              control={form.control}
              name="address_id"
              render={({ field }) => (
                <>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="h-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NULL_VALUE_FOR_ADDRESS_ID.toString()}>
                        Seleccione una dirección
                      </SelectItem>
                      {addressesFiltered.map((address) => (
                        <SelectItem
                          value={address.id.toString()}
                          key={address.id}
                        >
                          {address.first_name} - {address.last_name}
                          {address.department &&
                            " - " +
                              address.department +
                              ", " +
                              address.district +
                              ", " +
                              address.province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="icon"
                    disabled={field.value === -1}
                    onClick={() => field.onChange(-1)}
                  >
                    <XIcon className="size-4" />
                  </Button>
                </>
              )}
            />
          </div>
        )}

        <FormController
          control={form.control}
          name="address.first_name"
          label="Nombre"
          inputProps={{ disabled: addressIsChosen }}
          containerProps={{ className: "col-span-6 md:col-span-3" }}
        />

        <FormController
          control={form.control}
          name="address.last_name"
          label="Apellido"
          inputProps={{ disabled: addressIsChosen }}
          containerProps={{ className: "col-span-6 md:col-span-3" }}
        />

        <FormController
          control={form.control}
          name="address.dni"
          label="Documento de Identidad"
          inputProps={{ disabled: addressIsChosen }}
          containerProps={{ className: "col-span-6" }}
        />

        <FormController
          control={form.control}
          name="address.phone"
          label="Teléfono"
          inputProps={{ type: "tel", disabled: addressIsChosen }}
          containerProps={{ className: "col-span-6" }}
        />

        {isDelivery && (
          <>
            <FormController
              control={form.control}
              name="address.department"
              label="Departamento"
              inputProps={{ disabled: addressIsChosen }}
              containerProps={{ className: "col-span-6 md:col-span-2" }}
            />

            <FormController
              control={form.control}
              name="address.district"
              label="Distrito"
              inputProps={{ disabled: addressIsChosen }}
              containerProps={{ className: "col-span-6 md:col-span-2" }}
            />

            <FormController
              control={form.control}
              name="address.province"
              label="Provincia"
              inputProps={{ disabled: addressIsChosen }}
              containerProps={{ className: "col-span-6 md:col-span-2" }}
            />

            <FormController
              control={form.control}
              name="address.street_address"
              label="Dirección"
              inputProps={{ disabled: addressIsChosen }}
              containerProps={{ className: "col-span-6 md:col-span-3" }}
            />

            <FormController
              control={form.control}
              name="address.zip_code"
              label="Código Postal"
              inputProps={{ disabled: addressIsChosen }}
              containerProps={{ className: "col-span-6 md:col-span-3" }}
            />

            <FormController
              control={form.control}
              name="address.reference"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Referencia</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alguna referebcua que sea de utilidad para el envío"
                      disabled={addressIsChosen}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}

        <FormController
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Nota</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Alguna información extra que desee enviarnos"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default CheckoutForm;
