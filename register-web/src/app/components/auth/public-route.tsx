import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/auth-context'
import { routes } from '../../Router/routes'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={routes.private.people} replace />
  }

  return <>{children}</>
} 