/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { useAuth } from "../../../../../../app/context/auth/auth-context"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"

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
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      
      await login(data)
      const from = location.state?.from?.pathname || '/people'
      navigate(from, { replace: true })
      setIsLoading(false)
    } catch (error: any) {
      console.error('Erro no login:', error)
      setIsLoading(false)
    }
  })

  return { form, handleSubmit, isLoading, error: null }
}

