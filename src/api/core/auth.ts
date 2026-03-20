import Taro from '@tarojs/taro'
import { cache } from '@/cache'
import { RouteName } from '@/constants/routes'
import { useUserStore } from '@/models/user'
import { reLaunch } from '@/router'
import { RequestError } from './errors'

export interface AuthPayload {
  accessToken: string
  refreshToken: string
  expiresAt: string
}

let refreshPromise: Promise<string | null> | null = null

export function saveAuthPayload(payload: AuthPayload) {
  cache.set('accessToken', payload.accessToken)
  cache.set('refreshToken', payload.refreshToken)
  cache.set('expiresAt', payload.expiresAt)
  useUserStore.getState().setAccessToken(payload.accessToken)
}

export function clearAuthState(options?: { redirect?: boolean }) {
  cache.remove('accessToken')
  cache.remove('refreshToken')
  cache.remove('expiresAt')
  useUserStore.getState().clearAuth()
  if (options?.redirect)
    reLaunch(RouteName.LOGIN)
}

export function isAccessTokenExpired() {
  const expiresAt = cache.get('expiresAt')
  if (!expiresAt)
    return false
  return new Date(expiresAt).getTime() <= Date.now()
}

async function requestRefreshToken() {
  const refreshToken = cache.get('refreshToken')
  if (!refreshToken)
    return null

  return new Promise<string | null>((resolve, reject) => {
    Taro.request({
      url: `${process.env.TARO_APP_API_BASE || ''}/auth/refresh`,
      method: 'POST',
      data: { refreshToken },
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        const payload = res.data as {
          success: boolean
          code: string | number
          message: string
          data?: AuthPayload
        }

        if (res.statusCode >= 200 && res.statusCode < 300 && payload?.success && payload.data) {
          saveAuthPayload(payload.data)
          resolve(payload.data.accessToken)
          return
        }

        reject(new RequestError(payload?.message || 'Refresh token failed', {
          code: payload?.code,
          statusCode: res.statusCode,
          details: payload
        }))
      },
      fail: (error) => {
        reject(new RequestError(error.errMsg || 'Refresh token failed'))
      }
    })
  })
}

export async function ensureAccessToken() {
  const accessToken = cache.get('accessToken')
  if (!accessToken)
    return null

  if (!isAccessTokenExpired())
    return accessToken

  if (!refreshPromise) {
    refreshPromise = requestRefreshToken()
      .catch((error) => {
        clearAuthState()
        throw error
      })
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}
