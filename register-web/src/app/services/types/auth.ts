export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: {
    id: string
    email: string
    name: string
  }
}

export interface RegisterRequest {
  name: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface RegisterResponse {
  accessToken: string
  user: {
    id: string
    email: string
    name: string
  }
}