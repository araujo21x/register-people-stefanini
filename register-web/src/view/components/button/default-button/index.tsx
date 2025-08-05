import { Button } from "@components/shadcn/components/ui/button"

import type { ReactNode } from "react"

interface DefaultButtonProps extends React.ComponentProps<typeof Button> {
  children: ReactNode
}

export function DefaultButton({ children, ...props }: DefaultButtonProps) {
  return (
    <Button
      className={`transition-colors duration-200 active:scale-95 ${props.className ?? ""}`}
      {...props}
    >
      {children}
    </Button>
  )
}
