import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth/auth-context'
import { routes } from '../../Router/routes'
import PrivateLayout from '@layouts/private/private-layout'
import { DefaultLoading } from '@components/loading'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <DefaultLoading />
  
  if (!isAuthenticated) {
    return <Navigate to={routes.auth.signIn} state={{ from: location }} replace />
  }

  return <PrivateLayout>{children}</PrivateLayout>
} 