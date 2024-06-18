import {
  FormControl,
  FormController,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  type FieldPath,
  type FieldValues,
  type ControllerProps,
} from "react-hook-form";

function CheckoutIsDeliveryController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
}: Pick<ControllerProps<TFieldValues, TName>, "control" | "name">) {
  return (
    <FormController
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={(v) => {
                if (v === "0") {
                  field.onChange(true);
                } else {
                  field.onChange(false);
                }
              }}
              defaultValue={field.value ? "0" : "1"}
              className="flex items-center gap-4"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="0" />
                </FormControl>
                <FormLabel className="font-light">Envío a domicilio</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="1" />
                </FormControl>
                <FormLabel className="font-light">Retiro en tienda</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default CheckoutIsDeliveryController;
