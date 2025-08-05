
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Users } from "lucide-react"

const data = {
  navMain: [{ title: "Pessoas", url: "/people", icon: Users  }],
}

export const useAppSidebar = () => {
  const location = useLocation()
  const [selectedNav, setSelectedNav] = useState<string>(() => {
    const found = data.navMain.find(item => location.pathname.startsWith(item.url))
    return found ? found.title : data.navMain[0].title
  })

  useEffect(() => {
    const found = data.navMain.find(item => location.pathname.startsWith(item.url))
    if (found) {
      setSelectedNav(found.title)
    }
  }, [location.pathname])

  return { selectedNav, setSelectedNav, data }
}