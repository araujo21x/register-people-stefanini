import { cn } from "@components/shadcn/lib/utils"
import { Button } from "@components/shadcn/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@components/shadcn/components/ui/card"
import { TextInput } from "@components/inputs/text-input"
import { Form } from "@components/shadcn/components/ui/form"
import { useRegisterForm } from "./use-register"
import { routes } from "../../../../../../app/Router/routes"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, handleSubmit, isLoading, error } = useRegisterForm()

  return (
    <div className={cn("flex flex-col gap-6 w-100", className)} {...props}>
      <Card>

        <CardHeader className="text-center">
          <CardTitle className="text-xl">Criar conta</CardTitle>
          <CardDescription>Preencha os dados para se registrar</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <TextInput control={form.control} label="Email" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="grid gap-3">
                    <TextInput control={form.control} label="Nome" name="name" placeholder="João" required />
                  </div>
                  <div className="grid gap-3">
                    <TextInput control={form.control} label="Sobrenome" name="lastName" placeholder="Silva" required />
                  </div>
                  <div className="grid gap-3">
                    <TextInput control={form.control} label="Senha" name="password" placeholder="********" type="password" required />
                  </div>
                  <div className="grid gap-3">
                    <TextInput control={form.control} label="Confirmar Senha" name="confirmPassword" placeholder="********" type="password" required />
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full transition-colors duration-200 active:scale-95"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registrando..." : "Registrar"}
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Já tem uma conta?{" "}
                  <a href={routes.auth.signIn} className="underline underline-offset-4">
                    Faça login
                  </a>
                </div>

              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}
