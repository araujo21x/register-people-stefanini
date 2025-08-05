import * as React from "react"
import { LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/shadcn/components/ui/sidebar"
import logo from "@view/assets/logo.png";
import { useAuth } from "@context/auth/auth-context";
import { useAppSidebar } from "./use-app-sidebar";
import { DefaultButton } from "@components/button/default-button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuth()
  const { selectedNav, setSelectedNav, data } = useAppSidebar()

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={logo} alt="Logo" className="size-8" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Register People</span>
                  <span className="">v1</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className={`font-medium flex items-center gap-2 px-2 py-1 rounded ${
                      selectedNav === item.title
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedNav(item.title)}
                  >
                    {item.icon && <item.icon className="size-4" />} {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <DefaultButton
          variant="outline"
          onClick={() => logout()}
          className="text-red-600 hover:text-red-700 flex items-center gap-2"
        >
          <LogOut className="size-4" />
          Sair
        </DefaultButton>
      </SidebarFooter>
    </Sidebar>
  )
}
