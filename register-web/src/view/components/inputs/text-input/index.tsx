import type { Control, FieldPath, FieldValues } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/shadcn/components/ui/form"
import { Input } from "@components/shadcn/components/ui/input"

interface TextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  placeholder?: string
  description?: string
  type?: "text" | "email" | "password" | "number" | "tel" | "url"
  disabled?: boolean
  required?: boolean
  className?: string
  errorClassName?: string // opcional para customizar a área de erro
}

export function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  className,
}: TextInputProps<TFieldValues, TName>) {


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
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={!!fieldState.error}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs pt-0 pl-2 pb-0" />
        </FormItem>
      )}
    />
  )
}
