import { Bounce, ToastContainer } from 'react-toastify'
import { useTheme } from '@context/theme/theme-provider'

const themeMap = {
  light: (): string => 'light',
  dark: (): string => 'dark',
  system: (): string => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    } else {
      return 'light'
    }
  }
}

export function DefaultToastContainer(props: React.ComponentProps<typeof ToastContainer>) {
  const { theme } = useTheme()
  const toastTheme = themeMap[theme as keyof typeof themeMap]()

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={toastTheme}
      transition={Bounce}
      {...props}
    />
  )
}
