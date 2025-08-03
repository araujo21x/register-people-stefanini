import { Moon, Sun } from "lucide-react"
import { useTheme } from "@context/theme/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./shadcn/components/ui/dropdown-menu"
import { Button } from "./shadcn/components/ui/button"

interface ThemeSwitchProps {
  size?: number | string
  className?: string
  buttonClassName?: string
}

export function ThemeSwitch({
  size = "1.2rem",
  className = "fixed top-5 right-5 z-50",
  buttonClassName = "",
}: ThemeSwitchProps) {
  const { setTheme } = useTheme()

  const iconSizeClass = `h-[${typeof size === "number" ? `${size}px` : size}] w-[${typeof size === "number" ? `${size}px` : size}]`

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className={buttonClassName}>
            <Sun className={`${iconSizeClass} scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90`} />
            <Moon className={`absolute ${iconSizeClass} scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0`} />
            <span className="sr-only">Toggle theme</span>
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