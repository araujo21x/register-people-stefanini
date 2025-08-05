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


export function PeopleFormDialog({ type, id }: PeopleFormDialogProps) {
  const { isEdit, form, handleSubmit, resetForm, setIsOpen, isOpen } = usePeopleFormDialog(type, id)

  return (
    <Dialog open={isOpen} onOpenChange={(change) => { console.log(change); setIsOpen(change) }}>
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
            <div className="grid gap-4">
              <TextInput control={form.control} label="Nome" name="name" type="text" placeholder="Nome" required />
              <TextInput control={form.control} label="Gênero" name="gender" type="text" placeholder="Gênero"/>
              <TextInput control={form.control} label="Email" name="email" type="email" placeholder="Email" />
              <TextInput control={form.control} label="Data de Nascimento" name="birthday" type="text" placeholder="Data de Nascimento" required />
              <TextInput control={form.control} label="Local de Nascimento" name="placeBirth" type="text" placeholder="Local de Nascimento" />
              <TextInput control={form.control} label="Nacionalidade" name="nationality" type="text" placeholder="Nacionalidade" />
              <TextInput control={form.control} label="CPF" name="cpf" type="text" placeholder="CPF" required/>
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
