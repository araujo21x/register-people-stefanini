import { useDeletePerson } from "../../../../../../app/services/people.service";
import { toast } from "react-toastify";

export type UseDeletePeopleReturn = {
  handleDeletePerson: (id: string) => Promise<void>;
  isLoading: boolean;
};

export function useDeletePeople(): UseDeletePeopleReturn {
  const deletePersonMutation = useDeletePerson();

  const handleDeletePerson = async (id: string) => {
    await deletePersonMutation.mutateAsync(id, {

      onSuccess: () => { toast.success("Pessoa deletada com sucesso") }
    });
  }

  return { handleDeletePerson, isLoading: deletePersonMutation.isPending }
}