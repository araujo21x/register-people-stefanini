import { BrowserRouter, Link } from 'react-router-dom'
import { Router } from './app/Router'
import '@view/styles/index.css'
import { ThemeProvider } from '@context/theme/theme-provider'
import { ThemeSwitch } from '@components/theme-switch'

export function App() {

  return (
    <ThemeProvider >
      <ThemeSwitch />
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/register-user">Register User</Link>
        <Link to="/people">People</Link>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

