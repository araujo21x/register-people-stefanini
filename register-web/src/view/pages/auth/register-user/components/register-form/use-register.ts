/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "@context/auth/auth-context"
import { useRegister } from "../../../../../../app/services/auth.service"

interface IUserRegister {
  form: UseFormReturn<z.infer<typeof RegisterFormSchema>>
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  isLoading: boolean
  error: string | null
}

const RegisterFormSchema = z.object({
  email: z.email("Email inválido").min(1, { message: "Email é obrigatório" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }).min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
  lastName: z.string().min(1, { message: "Sobrenome é obrigatório" }).min(2, { message: "Sobrenome deve ter no mínimo 2 caracteres" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }).min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
  confirmPassword: z.string().min(1, { message: "Confirmação de senha é obrigatória" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

export function useRegisterForm(): IUserRegister {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const registerMutation = useRegister()

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      name: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await registerMutation.mutateAsync({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      await login({
        email: data.email,
        password: data.password,
      })

      const from = location.state?.from?.pathname || '/people'
      navigate(from, { replace: true })
    } catch (error: any) {
      console.error('Erro no registro:', error)
    }
  })

  return { form, handleSubmit, isLoading: registerMutation.isPending, error: registerMutation.error?.message || null }
}

