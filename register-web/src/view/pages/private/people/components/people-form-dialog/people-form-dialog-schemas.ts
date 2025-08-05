import { z } from "zod"

export const PeopleFormDialogSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  gender: z
    .enum(["male", "female"])
    .default("male")
    .optional(),
  email: z
    .string()
    .regex(/^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email inválido" })
    .optional(),
  birthday: z
    .string({ message: "Data de nascimento é obrigatória" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data de nascimento deve estar no formato AAAA-MM-DD" }),
  placeBirth: z
    .string({ message: "Naturalidade inválida" })
    .max(255, { message: "Naturalidade deve ter no máximo 25 caracteres" })
    .optional(),
  nationality: z
    .string({ message: "Nacionalidade inválida" })
    .max(255, { message: "Nacionalidade deve ter no máximo 100 caracteres" })
    .optional(),
  cpf: z
    .string({ message: "CPF é obrigatório" })
    .min(11, { message: "CPF deve ter 11 dígitos" })
    .max(11, { message: "CPF deve ter 11 dígitos" })
    .regex(/^\d{11}$/, { message: "CPF deve conter apenas números" }),
})

export type PeopleFormDialogSchemaType = z.infer<typeof PeopleFormDialogSchema>