import { BrowserRouter } from 'react-router-dom'
import { Router } from './app/Router'
import '@view/styles/index.css'
import { ThemeProvider } from '@context/theme/theme-provider'

export function App() {
  return (
    <ThemeProvider >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

