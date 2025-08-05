import { Bounce, ToastContainer } from 'react-toastify'
import { useTheme } from '@context/theme/theme-provider'

export function DefaultToastContainer(props: React.ComponentProps<typeof ToastContainer>) {
  const { theme } = useTheme()

  let toastTheme: 'light' | 'dark' | 'colored' = 'light'
  console.log('theme', theme)
  if (theme === 'dark') {
    toastTheme = 'dark'
  } else if (theme === 'light') {
    toastTheme = 'light'
  } else if (theme === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toastTheme = 'dark'
    } else {
      toastTheme = 'light'
    }
  }
  console.log('toastTheme', toastTheme)

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
