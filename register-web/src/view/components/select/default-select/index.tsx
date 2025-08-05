import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadcn/components/ui/select"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { FormLabel } from "@components/shadcn/components/ui/form"

type Option = {
  value: string
  label: string
}

type DefaultSelectProps<T extends FieldValues> = {
  options: Option[]
  label?: string
  placeholder?: string
  className?: string
  control?: Control<T>
  name?: Path<T>
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
}

export function DefaultSelect<T extends FieldValues>({
  options,
  label = "Select",
  placeholder = "Select an option",
  className = "w-[180px]",
  control,
  name,
  value,
  onValueChange,
  disabled = false,
  required = false,
}: DefaultSelectProps<T>) {
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            {label && (
              <FormLabel className="mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
            )}
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.error && (
              <span className="text-xs text-red-500">{fieldState.error.message}</span>
            )}
          </div>
        )}
      />
    )
  }

  // Uncontrolled fallback
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <FormLabel>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </FormLabel>
      )}
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
