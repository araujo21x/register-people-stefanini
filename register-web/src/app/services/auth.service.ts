import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '../libs/axios'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './types/auth'
import type { ApiError } from './types/api-error'

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register-user', data)
    return response.data
  },


  getProfile: async (): Promise<LoginResponse['user']> => {
    const response = await api.get<LoginResponse['user']>('/auth/profile')
    return response.data
  }
}

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data && data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken)
      } else {
        console.error('Access token não encontrado na resposta de login:', data)
      }
    },
    onError: (error: ApiError) => {
      console.error('Erro no login:', error)
    }
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    onError: (error: ApiError) => {
      console.error('Erro no registro:', error)
    }
  })
}


export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    enabled: !!localStorage.getItem('accessToken'),
    staleTime: 5 * 60 * 1000,
    retry: 1
  })
} 