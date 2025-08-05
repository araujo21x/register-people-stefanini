import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Verificar se estamos no browser
    if (typeof window === 'undefined') return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Definir o estado inicial
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Adicionar o listener apenas se o matchMedia for suportado
    if (mql && typeof mql.addEventListener === 'function') {
      mql.addEventListener("change", onChange)
      
      return () => {
        // Verificar se o mql ainda existe antes de remover o listener
        if (mql && typeof mql.removeEventListener === 'function') {
          mql.removeEventListener("change", onChange)
        }
      }
    }
  }, [])

  return !!isMobile
}
