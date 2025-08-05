import { DefaultButton } from "@components/button/default-button"
import { TextInput } from "@components/inputs/text-input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadcn/components/ui/dialog"
import { Form } from "@components/shadcn/components/ui/form"
import { usePeopleFormDialog, type PeopleFormDialogProps } from "./use-people-form-dialog"
import { Edit2 } from "lucide-react"
import { DefaultSelect } from "@components/select/default-select"
import { DefaultDatePicker } from "@components/date-picker"
import { CPFInput } from "@components/inputs/cpf"

export function PeopleFormDialog({ type, id }: PeopleFormDialogProps) {
  const { isEdit, form, handleSubmit, resetForm, handleOpenChange, isOpen } = usePeopleFormDialog(type, id)

  return (
    <Dialog open={isOpen} onOpenChange={(change) => { handleOpenChange(change) }}>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          {isEdit && (
            <DialogTrigger asChild>
              <DefaultButton variant="ghost" className="h-8 w-8 p-0">
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </DefaultButton>
            </DialogTrigger>
          )}
          {!isEdit && (
            <DialogTrigger asChild>
              <DefaultButton>
                Cadastrar Pessoa
              </DefaultButton>
            </DialogTrigger>
          )}
          <DialogContent className="w-[70vw] max-w-[70vw]">
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Editar Pessoa" : "Cadastrar Pessoa"}
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Altere as informações da pessoa. Clique em salvar quando terminar."
                  : "Preencha os dados para cadastrar uma nova pessoa."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <TextInput control={form.control} label="Nome" name="name" type="text" placeholder="Nome" required />
              <div className="flex flex-row gap-2">
                <div className="w-3/2">
                  <DefaultSelect
                    options={[{ value: "male", label: "Masculino" }, { value: "female", label: "Feminino" }]}
                    label="Gênero"
                    name="gender"
                    placeholder="Gênero"
                    control={form.control}
                    className="w-full"
                  />
                </div>
                <div className="w-1/2">
                  <DefaultDatePicker
                    control={form.control}
                    label="Data de Nascimento"
                    name="birthday"
                    placeholder="Data de Nascimento"
                    className="w-full"
                    required
                  />
                </div>
              </div>
              <TextInput control={form.control} label="Email" name="email" type="email" placeholder="Email" />
              <TextInput control={form.control} label="Local de Nascimento" name="placeBirth" type="text" placeholder="Local de Nascimento" />
              <TextInput control={form.control} label="Nacionalidade" name="nationality" type="text" placeholder="Nacionalidade" />
              <CPFInput control={form.control} label="CPF" name="cpf" placeholder="CPF" required />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <DefaultButton variant="outline" onClick={() => resetForm()}>Cancelar</DefaultButton>
              </DialogClose>
              <DefaultButton type="submit" onClick={() => handleSubmit()}>
                {isEdit ? "Salvar alterações" : "Cadastrar"}
              </DefaultButton>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
