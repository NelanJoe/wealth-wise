import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type PensionFundInputFieldProps = {
  name: string;
  label: string;
  hint?: string;
  control: any;
  type?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
};

export default function PensionFundInputField({
  name,
  label,
  hint,
  control,
  type = "string",
  placeholder,
  suffix,
}: PensionFundInputFieldProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>
            {label} {hint && <span className="text-primary">({hint})</span>}
          </FormLabel>
          <FormControl>
            <div className="flex items-center gap-3">
              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className="w-[80%] md:w-[86%]"
                {...field}
              />
              {suffix}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
