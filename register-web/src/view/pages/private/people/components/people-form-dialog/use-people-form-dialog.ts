import { PeopleFormDialogSchema, type PeopleFormDialogSchemaType } from "./people-form-dialog-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormReturn } from "react-hook-form"
import { useCreatePerson, usePerson, useUpdatePerson, type Person } from "../../../../../../app/services/people.service"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export type PeopleFormDialogType = "edit" | "register"
export interface PeopleFormDialogProps {
  type: PeopleFormDialogType,
  id?: string
}
export interface UsePeopleFormDialogReturn {
  isEdit: boolean;
  form: UseFormReturn<PeopleFormDialogSchemaType>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  resetForm: () => void;
  handleOpenChange: (open: boolean) => void;
  isOpen: boolean;
  isLoading: boolean;
}

export function usePeopleFormDialog(type: PeopleFormDialogType, id?: string): UsePeopleFormDialogReturn {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenChange = (open: boolean) => setIsOpen(open)

  const isEdit = type === "edit"
  const form = useForm<PeopleFormDialogSchemaType>({
    resolver: zodResolver(PeopleFormDialogSchema),
    defaultValues: getDefaultValues(undefined)
  })

  const { data: personData } = usePerson(id)

  useEffect(() => {
    if (isEdit && personData) form.reset(getDefaultValues(personData))
  }, [isEdit, personData, form])

  const createPersonMutation = useCreatePerson();
  const updatePersonMutation = useUpdatePerson();

  const handleSubmit = form.handleSubmit(async (data) => {
    if (isEdit && id) {
      await updatePersonMutation.mutateAsync({ id: id, ...data }, {
        onSuccess: (response) => {
          toast.success(response.message)
          form.reset();
          handleOpenChange(false)
        }
      });
    } else {
      await createPersonMutation.mutateAsync(data, {
        onSuccess: (response) => {
          toast.success(response.message)
          form.reset();
          handleOpenChange(false)
        }
      });
    }
    form.reset();
    handleOpenChange(false)

  });

  const resetForm = () => form.reset()

  return { isEdit, form, handleSubmit, resetForm, handleOpenChange, isOpen, isLoading: createPersonMutation.isPending || updatePersonMutation.isPending }
}

function getDefaultValues(personData: Person | undefined): PeopleFormDialogSchemaType {
  return {
    name: personData?.name ?? "",
    cpf: personData?.cpf ?? "",
    gender: personData?.gender ?? "male",
    email: personData?.email ?? "",
    birthday: personData?.birthday ?? "",
    placeBirth: personData?.placeBirth ?? "",
    nationality: personData?.nationality ?? "",
  }
}