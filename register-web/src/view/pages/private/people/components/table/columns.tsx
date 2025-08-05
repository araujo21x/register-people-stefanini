import { Edit2, Eye, Trash2 } from "lucide-react"
import { Button } from "@components/shadcn/components/ui/button"

import type { ColumnDef } from "@tanstack/react-table"

export type Person = {
  id: string
  name: string
  cpf: string
  gender?: string
  email?: string
  birthday: string
  placeBirth: string
  nationality?: string
}

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ getValue }) => {
      const cpf = String(getValue() ?? "");
      return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    },
  },
  {
    accessorKey: "gender",
    header: "Sexo",
    cell: ({ getValue }) => {
      const gender = getValue();
      if (gender === "male") return "Masculino";
      if (gender === "female") return "Feminino";
      return gender ?? "";
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "birthday",
    header: "Data de nascimento",
    cell: ({ getValue }) => {
      const value = getValue();
      if (typeof value === "string" && value.includes("-")) {
        const parts = value.split("-");
        if (parts.length === 3) {
          return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }
      return value ?? "";
    },
  },
  {
    accessorKey: "placeBirth",
    header: "Naturalidade",
  },
  {
    accessorKey: "nationality",
    header: "Nacionalidade",
  },
  {
    header: "Ações",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            title="Ver detalhes"
            onClick={() => navigator.clipboard.writeText(payment.id)}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">Ver detalhes</span>
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            title="Editar"
          >
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            title="Excluir"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Excluir</span>
          </Button>
        </div>
      )
    }
  }
]