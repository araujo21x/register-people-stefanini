import { Trash2 } from "lucide-react"
import { DefaultAlertDialog } from "@components/alertDialog/default-alert-dialog"
import { DefaultButton } from "@components/button/default-button"
import { useDeletePeople } from "./use-delete-people"
// import { DefaultLoading } from "@components/loading"

export function DeletePeople({ id }: { id: string }) {
  const { handleDeletePerson } = useDeletePeople()

  return (

      <DefaultAlertDialog title="Excluir pessoa" description="Tem certeza que deseja excluir a pessoa?" onConfirm={() => handleDeletePerson(id)} type="danger">
        <DefaultButton variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700" title="Excluir">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </DefaultButton>
      </DefaultAlertDialog>
    
  )
}