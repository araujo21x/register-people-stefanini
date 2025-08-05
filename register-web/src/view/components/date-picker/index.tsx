
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Button } from "@components/shadcn/components/ui/button"
import { Calendar } from "@components/shadcn/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/shadcn/components/ui/popover"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/shadcn/components/ui/form"

interface DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
  disabled?: boolean
}

export function DefaultDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder = "Selecione a data",
  required = false,
  className,
  disabled = false,
}: DatePickerProps<TFieldValues, TName>) {
  const [open, setOpen] = React.useState(false)

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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-48 justify-between font-normal ${fieldState.error ? "border-red-500" : ""} ${!field.value ? "placeholder:text-gray-400" : ""}`}
                  disabled={disabled}
                  type="button"
                >
                  {field.value
                    ? (() => {
                        try {
                          const dateObj = typeof field.value === "string"
                            ? new Date(new Date(field.value).getTime() + 3 * 60 * 60 * 1000)
                            : field.value
                          return dateObj instanceof Date && !isNaN(dateObj.getTime())
                            ? dateObj.toLocaleDateString()
                            : placeholder
                        } catch {
                          return placeholder
                        }
                      })()
                    : placeholder}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    field.value
                      ? typeof field.value === "string"
                        ? new Date(field.value)
                        : field.value
                      : undefined
                  }
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (date instanceof Date && !isNaN(date.getTime())) {
                      const yyyy = date.getFullYear();
                      const mm = String(date.getMonth() + 1).padStart(2, '0');
                      const dd = String(date.getDate()).padStart(2, '0');
                      const formatted = `${yyyy}-${mm}-${dd}`;
                      field.onChange(formatted);
                    } else {
                      field.onChange("");
                    }
                    setOpen(false);
                  }}
                  disabled={disabled}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage className="text-xs pt-0 pl-2 pb-0" />
        </FormItem>
      )}
    />
  )
}
