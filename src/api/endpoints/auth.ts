import { createApiModule } from '@/api/core/createModule'

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresAt: string
}

export const loginApi = createApiModule<void, LoginResponse>({
  url: '/auth/login',
  method: 'POST',
  options: {
    skipAuth: true
  }
})

export const refreshTokenApi = createApiModule<{ refreshToken: string }, LoginResponse>({
  url: '/auth/refresh',
  method: 'POST',
  options: {
    skipAuth: true
  }
})
