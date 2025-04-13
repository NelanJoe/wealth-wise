import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type InvestmentInputFieldProps = {
  name: string;
  label: string;
  hint?: string;
  control: any;
  type?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
};

export default function InvestmentInputField({
  name,
  label,
  hint,
  control,
  type = "string",
  placeholder,
  suffix,
}: InvestmentInputFieldProps) {
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
                className="w-[75%] md:w-[70%]"
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
