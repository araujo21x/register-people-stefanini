import { useDeletePerson } from "../../../../../../app/services/people.service";
import { toast } from "react-toastify";

export function useDeletePeople() {
  const deletePersonMutation = useDeletePerson();

  const handleDeletePerson = async (id: string) => {
    await deletePersonMutation.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Pessoa deletada com sucesso")
      }
    });
  }

  return {
    handleDeletePerson
  }
}