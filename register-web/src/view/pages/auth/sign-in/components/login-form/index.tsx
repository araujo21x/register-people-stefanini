import { cn } from "@components/shadcn/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@components/shadcn/components/ui/card"
import { TextInput } from "@components/inputs/text-input"
import { Form } from "@components/shadcn/components/ui/form"
import { useLogin } from "./use-login"
import { routes } from "../../../../../../app/Router/routes"
import { DefaultButton } from "@components/button/default-button"
// import { DefaultLoading } from "@components/loading"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, handleSubmit, isLoading } = useLogin()

  return (
    <div className={cn("flex flex-col gap-6 w-100", className)} {...props}>
      {/* <DefaultLoading isLoading={isLoading} /> */}
      <Card>

        <CardHeader className="text-center">
          <CardTitle className="text-xl">Seja bem-vindo(a)</CardTitle>
          <CardDescription>Faça login para continuar</CardDescription>
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
                    <TextInput control={form.control} label="Senha" name="password" placeholder="********" type="password" required />
                  </div>

                  <DefaultButton
                    type="submit"
                    disabled={isLoading}
                  >
                    Login
                  </DefaultButton>
                </div>

                <div className="text-center text-sm">
                  Não tem uma conta?{" "}
                  <a href={routes.auth.registerUser} className="underline underline-offset-4">
                    Cadastre-se
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
