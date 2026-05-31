import Taro from '@tarojs/taro'
import { toastError } from '@/feedback'
import { redirectToLogin } from '@/router/auth'
import { clearAuthState, ensureAccessToken } from './auth'
import { AppErrorType, RequestError, isUnauthorizedError } from './errors'

export interface ApiResponse<T> {
  success: boolean
  code: string | number
  message: string
  data: T
}

export interface RequestOptions extends Partial<Taro.request.Option<any>> {
  skipAuth?: boolean
  showErrorToast?: boolean
}

export async function request<T>(url: string, options: RequestOptions = {}) {
  const token = options.skipAuth ? null : await ensureAccessToken()
  const header: Record<string, unknown> = {
    'Content-Type': 'application/json',
    ...(options.header || {})
  }

  if (!options.skipAuth && token)
    header.Authorization = `Bearer ${token}`

  return new Promise<T>((resolve, reject) => {
    Taro.request<ApiResponse<T>>({
      url: `${process.env.TARO_APP_API_BASE || ''}${url}`,
      method: options.method || 'GET',
      data: options.data,
      timeout: options.timeout || 15000,
      header,
      success: (res) => {
        const payload = res.data
        if (res.statusCode >= 200 && res.statusCode < 300 && payload?.success) {
          resolve(payload.data)
          return
        }
        reject(new RequestError(payload?.message || 'Request failed', {
          code: payload?.code,
          statusCode: res.statusCode,
          details: payload
        }))
      },
      fail: (error) => {
        reject(new RequestError(error.errMsg || 'Network error', {
          type: AppErrorType.NETWORK,
          details: error
        }))
      }
    })
  })
    .catch((error: unknown) => {
      if (isUnauthorizedError(error)) {
        clearAuthState()
        redirectToLogin()
      }

      if (options.showErrorToast !== false) {
        toastError(error)
      }

      throw error
    })
}
