import { BrowserRouter } from 'react-router-dom'
import { Router } from './app/Router'
import '@view/styles/index.css'
import { ThemeProvider } from '@context/theme/theme-provider'
import { AuthProvider } from './app/context/auth/auth-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DefaultToastContainer } from '@components/toast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
})

export function App() {
  return (

    <QueryClientProvider client={queryClient}>

      <ThemeProvider>
      <DefaultToastContainer />
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

