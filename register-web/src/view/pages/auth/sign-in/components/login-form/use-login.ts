import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { useLogin as useLoginMutation } from "../../../../../../app/services/auth.service"
import { useNavigate } from "react-router-dom"

interface IUserLogin {
  form: UseFormReturn<z.infer<typeof LoginFormSchema>>
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  isLoading: boolean
  error: string | null
}

const LoginFormSchema = z.object({
  email: z.email("Email inválido").min(1, { message: "Email é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }).min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
})

export function useLogin(): IUserLogin {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync(data)
      navigate('/people')
    } catch (error) {
      console.error('Erro no login:', error)
    }
  })

  return {
    form,
    handleSubmit,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message || null
  }
}

