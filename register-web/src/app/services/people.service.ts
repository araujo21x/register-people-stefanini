import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../libs/axios'

// Tipos para pessoas
export interface Person {
  id: string
  name: string
  email?: string
  cpf: string
  gender?: 'male' | 'female'
  birthday: string
  placeBirth?: string
  nationality?: string
  createdAt: string
  updatedAt: string
}

export interface CreatePersonRequest {
  name: string
  email?: string
  cpf: string
  gender?: 'male' | 'female'
  birthday: string,
  placeBirth?: string,
  nationality?: string
}

export interface CreatePersonResponse {
  message: string
  person: Person
}

export interface UpdatePersonRequest extends Partial<CreatePersonRequest> {
  id: string
}

export interface UpdatePersonResponse {
  message: string
  person: Person
}

export interface DeletePersonResponse {
  message: string
}

export interface PeopleListResponse {
  people: Person[]
  count: number
}

// Funções de API
export const peopleApi = {
  getPeople: async (page = 1, limit = 10): Promise<PeopleListResponse> => {
    const response = await api.get<PeopleListResponse>(`/people?page=${page}&limit=${limit}`)
    return response.data
  },

  getPerson: async (id: string): Promise<Person> => {
    const response = await api.get<Person>(`/people/${id}`)
    return response.data
  },

  createPerson: async (data: CreatePersonRequest): Promise<CreatePersonResponse> => {
    const response = await api.post<CreatePersonResponse>('/people', data)
    return response.data
  },

  updatePerson: async (data: UpdatePersonRequest): Promise<UpdatePersonResponse> => {
    const { id, ...updateData } = data
    const response = await api.patch<UpdatePersonResponse>(`/people/${id}`, updateData)
    return response.data
  },

  deletePerson: async (id: string): Promise<DeletePersonResponse> => {
    const response = await api.delete<DeletePersonResponse>(`/people/${id}`)
    return response.data
  }
}

// Hooks do React Query
export const usePeople = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['people', page, limit],
    queryFn: () => peopleApi.getPeople(page, limit),
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

export const usePerson = (id?: string) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => {
      if (!id) return Promise.resolve(null)
      return peopleApi.getPerson(id)
    },
    enabled: id != null,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export const useCreatePerson = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: peopleApi.createPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] })
    },
  })
}

export const useUpdatePerson = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: peopleApi.updatePerson,
    onSuccess: (data) => {
      queryClient.setQueryData(['person', data.person.id], data.person)
      queryClient.invalidateQueries({ queryKey: ['people'] })
    },
  })
}

export const useDeletePerson = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: peopleApi.deletePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] })
    }
  })
} 