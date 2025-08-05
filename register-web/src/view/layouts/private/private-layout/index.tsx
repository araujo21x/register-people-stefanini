import type { ReactNode } from "react"
import { AppSidebar } from "@layouts/private/private-layout/components/app-sidebar"
import { Separator } from "@components/shadcn/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/shadcn/components/ui/sidebar"
import { useAuth } from "@context/auth/auth-context"
import { ThemeSwitch } from "@components/theme-switch"

interface PrivateLayoutProps {
  children: ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const { user } = useAuth()
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem", } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-lg font-bold">Olá, {user?.name}!</h1>
          <ThemeSwitch />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
