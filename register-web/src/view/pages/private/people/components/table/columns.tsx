import type { ColumnDef } from "@tanstack/react-table"
import type { Person } from "src/app/services/people.service"
import { PeopleFormDialog } from "../people-form-dialog"
import { DeletePeople } from "../delete-people"

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
      return (
        <div className="flex items-center gap-2">
          <PeopleFormDialog type="edit" id={row.original.id} />
          <DeletePeople id={row.original.id} />
        </div>
      )
    }
  }
]