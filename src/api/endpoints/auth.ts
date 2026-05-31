import { createApiModule } from '@/api/core/createModule'

export interface AccountLoginParams {
  loginType: 'account'
  account: string
  password: string
}

export interface PhoneLoginParams {
  loginType: 'phone'
  phone: string
  smsCode: string
}

export interface WechatLoginParams {
  loginType: 'wechat'
  code: string
  encryptedData?: string
  iv?: string
}

export type LoginParams = AccountLoginParams | PhoneLoginParams | WechatLoginParams

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresAt: string
}

export const loginApi = createApiModule<LoginParams, LoginResponse>({
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
