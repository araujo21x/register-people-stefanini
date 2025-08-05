import { DataTable } from "./components/table";
import { columns, type Person } from "./components/table/columns";

export function People() {
  const data: Person[] = [
    {
      id: "728ed52f",
      name: "John Doe ",
      cpf: "12345678901",
      gender: "male",
      email: "m@example.com",
      birthday: "1990-01-01",
      placeBirth: "São Paulo",
      nationality: "Brazilian",
    },
  ]
  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1">
        <DataTable<Person, Person> columns={columns} data={data} />
      </div>
      <div className="py-2 bg-amber-800">oi</div>
    </div>
  )
}