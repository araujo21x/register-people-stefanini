/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-useless-catch */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLogin, useRegister, useProfile } from '../../services/auth.service'
import type { LoginRequest, RegisterRequest } from '../../services/types/auth'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loginMutation = useLogin()
  const registerMutation = useRegister()
  const profileQuery = useProfile()

  const isAuthenticated = !!user

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      profileQuery.refetch()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (profileQuery.data) {
      setUser(profileQuery.data)
      setIsLoading(false)
    } else if (profileQuery.isError) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      setUser(null)
      setIsLoading(false)
    }
  }, [profileQuery.data, profileQuery.isError])

  const login = async (data: LoginRequest) => {
    try {
      const response = await loginMutation.mutateAsync(data)
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (error) {
      throw error
    }
  }

  const register = async (data: RegisterRequest) => {
    try {
      const response = await registerMutation.mutateAsync(data)
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  const refreshUser = () => {
    profileQuery.refetch()
  }

  const value: AuthContextType = {
    user, isAuthenticated, isLoading, login, register, logout, refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
} 