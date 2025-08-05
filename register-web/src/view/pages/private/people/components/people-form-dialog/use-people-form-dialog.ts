import { PeopleFormDialogSchema, type PeopleFormDialogSchemaType } from "./people-form-dialog-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreatePerson, usePerson, useUpdatePerson } from "../../../../../../app/services/people.service"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export type PeopleFormDialogType = "edit" | "register"
export interface PeopleFormDialogProps {
  type: PeopleFormDialogType,
  id?: string
}
export function usePeopleFormDialog(type: PeopleFormDialogType, id?: string) {
  const [isOpen, setIsOpen] = useState(false)
  const isEdit = type === "edit"
  const form = useForm<PeopleFormDialogSchemaType>({
    resolver: zodResolver(PeopleFormDialogSchema),
    defaultValues: {
      name: "",
      cpf: "",
      gender: "male",
      email: "",
      birthday: "",
      placeBirth: "",
      nationality: "",
    }
  })

  const { data: personData } = usePerson(id)

  useEffect(() => {
    if (isEdit && personData) {
      form.reset({
        name: personData.name ?? "",
        cpf: personData.cpf ?? "",
        gender: personData.gender ?? "male",
        email: personData.email ?? "",
        birthday: personData.birthday ?? "",
        placeBirth: personData.placeBirth ?? "",
        nationality: personData.nationality ?? "",
      })
    }
  }, [isEdit, personData, form])

  const createPersonMutation = useCreatePerson();
  const updatePersonMutation = useUpdatePerson();

  const handleSubmit = form.handleSubmit(async (data) => {

    if (isEdit && id) {
      await updatePersonMutation.mutateAsync({ id: id, ...data }, {
        onSuccess: (response) => {
          toast.success(response.message)
          form.reset();
          setIsOpen(false)
        }
      });
    } else {
      await createPersonMutation.mutateAsync(data, {
        onSuccess: (response) => {
          toast.success(response.message)
          form.reset();
          setIsOpen(false)
        }
      });
    }
    form.reset();
    setIsOpen(false)

  });

  const resetForm = () => {
    form.reset()
  }

  return {
    isEdit,
    form,
    handleSubmit,
    resetForm,
    setIsOpen,
    isOpen
  }
}
