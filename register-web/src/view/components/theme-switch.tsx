import { Moon, Sun } from "lucide-react"
import { useTheme } from "@context/theme/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./shadcn/components/ui/dropdown-menu"
import { Button } from "./shadcn/components/ui/button"

interface ThemeSwitchProps {
  className?: string
  buttonClassName?: string
}

export function ThemeSwitch({
  className = "fixed top-5 right-5 z-50",
  buttonClassName = "",
}: ThemeSwitchProps) {
  const { setTheme } = useTheme()


  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className={buttonClassName}>
            <Sun className={`scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90`} />
            <Moon className={`absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0`} />
            <span className="sr-only">Tema</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}