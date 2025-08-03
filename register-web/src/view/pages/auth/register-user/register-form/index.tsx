import { cn } from "@components/shadcn/lib/utils"
import { Button } from "@components/shadcn/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@components/shadcn/components/ui/card"
import { TextInput } from "@components/inputs/text-input"
import { Form } from "@components/shadcn/components/ui/form"
import { useLogin } from "./use-register"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, handleSubmit, isLoading } = useLogin()

  return (
    <div className={cn("flex flex-col gap-6 w-100", className)} {...props}>
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

                  <Button
                    type="submit"
                    className="w-full transition-colors duration-200 hover:bg-primary/90 active:scale-95 active:bg-primary/80"
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Não tem uma conta?{" "}
                  <a href="#" className="underline underline-offset-4">
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
