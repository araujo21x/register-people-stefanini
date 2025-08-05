
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Users } from "lucide-react"

export type UseAppSidebarReturn = {
  selectedNav: string
  handleSetSelectedNav: (selectedNav: string) => void
  data: { navMain: { title: string; url: string; icon: React.ElementType }[] }
}

const data = {
  navMain: [{ title: "Pessoas", url: "/people", icon: Users }],
}

export function useAppSidebar(): UseAppSidebarReturn {
  const location = useLocation()
  const [selectedNav, setSelectedNav] = useState<string>(() => {
    const found = data.navMain.find(item => location.pathname.startsWith(item.url))
    return found ? found.title : data.navMain[0].title
  })

  const handleSetSelectedNav = (selectedNav: string) => setSelectedNav(selectedNav)

  useEffect(() => {
    const found = data.navMain.find(item => location.pathname.startsWith(item.url))
    if (found) handleSetSelectedNav(found.title)
  }, [location.pathname])

  return { selectedNav, handleSetSelectedNav, data }
}