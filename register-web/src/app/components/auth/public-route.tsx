import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/auth-context'
import { routes } from '../../Router/routes'
import { DefaultLoading } from '@components/loading'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <DefaultLoading />

  if (isAuthenticated) {
    return <Navigate to={routes.private.people} replace />
  }

  return <>{children}</>
} 