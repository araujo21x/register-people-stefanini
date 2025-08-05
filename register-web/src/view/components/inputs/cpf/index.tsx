import type { Control, FieldPath, FieldValues } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/shadcn/components/ui/form"
import { Input } from "@components/shadcn/components/ui/input"

interface CPFInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean
  className?: string
  errorClassName?: string
}

function maskCPF(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return value;
}

export function CPFInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  className,
}: CPFInputProps<TFieldValues, TName>) {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder={placeholder ?? "Digite o CPF (apenas números)"}
              disabled={disabled}
              aria-invalid={!!fieldState.error}
              value={field.value ? maskCPF(field.value) : ""}
              onChange={e => {
                const rawValue = e.target.value.replace(/\D/g, "").slice(0, 11);
                maskCPF(rawValue);
                field.onChange(rawValue);
              }}
              autoComplete="off"
              maxLength={14}
              inputMode="numeric"
              pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
            />
          </FormControl>
          <FormMessage className="text-xs pt-0 pl-2 pb-0" />
        </FormItem>
      )}
    />
  )
}
