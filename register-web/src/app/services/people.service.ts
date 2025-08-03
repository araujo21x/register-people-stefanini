// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { api } from '../libs/axios'

// // Tipos para pessoas
// export interface Person {
//   id: string
//   name: string
//   email: string
//   cpf: string
//   gender: 'MALE' | 'FEMALE' | 'OTHER'
//   birthDate: string
//   address: {
//     street: string
//     number: string
//     complement?: string
//     neighborhood: string
//     city: string
//     state: string
//     zipCode: string
//   }
//   createdAt: string
//   updatedAt: string
// }

// export interface CreatePersonRequest {
//   name: string
//   email: string
//   cpf: string
//   gender: 'MALE' | 'FEMALE' | 'OTHER'
//   birthDate: string
//   address: {
//     street: string
//     number: string
//     complement?: string
//     neighborhood: string
//     city: string
//     state: string
//     zipCode: string
//   }
// }

// export interface UpdatePersonRequest extends Partial<CreatePersonRequest> {
//   id: string
// }

// export interface PeopleListResponse {
//   data: Person[]
//   total: number
//   page: number
//   limit: number
// }

// // Funções de API
// export const peopleApi = {
//   getPeople: async (page = 1, limit = 10): Promise<PeopleListResponse> => {
//     const response = await api.get<PeopleListResponse>(`/people?page=${page}&limit=${limit}`)
//     return response.data
//   },

//   getPerson: async (id: string): Promise<Person> => {
//     const response = await api.get<Person>(`/people/${id}`)
//     return response.data
//   },

//   createPerson: async (data: CreatePersonRequest): Promise<Person> => {
//     const response = await api.post<Person>('/people', data)
//     return response.data
//   },

//   updatePerson: async (data: UpdatePersonRequest): Promise<Person> => {
//     const { id, ...updateData } = data
//     const response = await api.put<Person>(`/people/${id}`, updateData)
//     return response.data
//   },

//   deletePerson: async (id: string): Promise<void> => {
//     await api.delete(`/people/${id}`)
//   }
// }

// // Hooks do React Query
// export const usePeople = (page = 1, limit = 10) => {
//   return useQuery({
//     queryKey: ['people', page, limit],
//     queryFn: () => peopleApi.getPeople(page, limit),
//     staleTime: 2 * 60 * 1000, // 2 minutos
//   })
// }

// export const usePerson = (id: string) => {
//   return useQuery({
//     queryKey: ['person', id],
//     queryFn: () => peopleApi.getPerson(id),
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000, // 5 minutos
//   })
// }

// export const useCreatePerson = () => {
//   const queryClient = useQueryClient()
  
//   return useMutation({
//     mutationFn: peopleApi.createPerson,
//     onSuccess: () => {
//       // Invalidar cache da lista de pessoas
//       queryClient.invalidateQueries({ queryKey: ['people'] })
//     },
//     onError: (error: any) => {
//       console.error('Erro ao criar pessoa:', error)
//     }
//   })
// }

// export const useUpdatePerson = () => {
//   const queryClient = useQueryClient()
  
//   return useMutation({
//     mutationFn: peopleApi.updatePerson,
//     onSuccess: (data) => {
//       // Atualizar cache da pessoa específica
//       queryClient.setQueryData(['person', data.id], data)
//       // Invalidar cache da lista de pessoas
//       queryClient.invalidateQueries({ queryKey: ['people'] })
//     },
//     onError: (error: any) => {
//       console.error('Erro ao atualizar pessoa:', error)
//     }
//   })
// }

// export const useDeletePerson = () => {
//   const queryClient = useQueryClient()
  
//   return useMutation({
//     mutationFn: peopleApi.deletePerson,
//     onSuccess: () => {
//       // Invalidar cache da lista de pessoas
//       queryClient.invalidateQueries({ queryKey: ['people'] })
//     },
//     onError: (error: any) => {
//       console.error('Erro ao deletar pessoa:', error)
//     }
//   })
// } 