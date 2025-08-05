import { BrowserRouter } from 'react-router-dom'
import { Router } from './app/Router'
import '@view/styles/index.css'
import { ThemeProvider } from '@context/theme/theme-provider'
import { AuthProvider } from './app/context/auth/auth-context'
import { DefaultToastContainer } from '@components/toast'

export function App() {
  return (
    <ThemeProvider>
      <DefaultToastContainer />
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

