import { createApiModule } from '@/api/core/createModule'

export interface UserProfile {
  id: string
  nickname: string
}

export const getCurrentUserApi = createApiModule<void, UserProfile>({
  url: '/user/me',
  method: 'GET'
})
