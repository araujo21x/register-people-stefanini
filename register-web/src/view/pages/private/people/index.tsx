
import { DataTable } from "./components/table";
import { columns } from "./components/table/columns";
import { usePeople } from "./use-people";
import { PeopleFormDialog } from "./components/people-form-dialog";
import type { Person } from "src/app/services/people.service";
import { DefaultPagination } from "@components/pagination";
// import { DefaultLoading } from "@components/loading";


export function People() {
  const { data, page, handleSetPage } = usePeople()

  return (
    <div className="flex flex-col h-full p-2 justify-between">
      {/* <DefaultLoading isLoading={isLoading} /> */}
      <div className="py-2 flex justify-end">
        <PeopleFormDialog type="register" />
      </div>
      <div className="flex-1 my-2 overflow-auto max-h-[76vh]">
        <DataTable<Person, Person> columns={columns} data={data.people} />
      </div>
      <div className="py-2">
        <DefaultPagination page={page} totalItens={data.count} onPageChange={handleSetPage} />
      </div>
    </div>
  )
}