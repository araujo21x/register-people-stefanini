import { Button } from "@components/shadcn/components/ui/button"
import { useAuth } from "../../../../app/context/auth/auth-context"
 
export function People() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">People</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Olá, {user?.name}!
          </span>
          <Button
            variant="outline" 
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700"
          >
            Sair
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Bem-vindo à página de pessoas. Aqui você pode gerenciar os registros de pessoas.
        </p>
      </div>
    </div>
  )
}