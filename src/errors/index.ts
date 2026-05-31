export enum AppErrorType {
  NETWORK = 'NETWORK',
  UNAUTHORIZED = 'UNAUTHORIZED',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
  BUSINESS = 'BUSINESS',
  UNKNOWN = 'UNKNOWN'
}

export interface AppErrorOptions {
  type?: AppErrorType
  code?: string | number
  statusCode?: number
  details?: unknown
  userMessage?: string
}

export class AppError extends Error {
  type: AppErrorType
  code?: string | number
  statusCode?: number
  details?: unknown
  userMessage: string

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message)
    this.name = 'AppError'
    this.type = options.type || inferErrorType(options)
    this.code = options.code
    this.statusCode = options.statusCode
    this.details = options.details
    this.userMessage = options.userMessage || getErrorMessage(this.type, message)
  }
}

export class RequestError extends AppError {
  constructor(message: string, options: AppErrorOptions = {}) {
    super(message, options)
    this.name = 'RequestError'
  }
}

export function inferErrorType(options: Pick<AppErrorOptions, 'code' | 'statusCode'>) {
  if (options.statusCode === 401 || options.code === 401 || options.code === '401')
    return AppErrorType.UNAUTHORIZED
  if (options.statusCode === 400 || options.statusCode === 422)
    return AppErrorType.VALIDATION
  if (options.statusCode && options.statusCode >= 500)
    return AppErrorType.SERVER
  return AppErrorType.BUSINESS
}

export function getErrorMessage(type: AppErrorType, fallback = '请求失败，请稍后重试') {
  const messages: Record<AppErrorType, string> = {
    [AppErrorType.NETWORK]: '网络连接异常，请检查网络后重试',
    [AppErrorType.UNAUTHORIZED]: '登录状态已失效，请重新登录',
    [AppErrorType.VALIDATION]: fallback,
    [AppErrorType.SERVER]: '服务暂时不可用，请稍后重试',
    [AppErrorType.BUSINESS]: fallback,
    [AppErrorType.UNKNOWN]: fallback
  }

  return messages[type]
}

export function normalizeError(error: unknown) {
  if (error instanceof AppError)
    return error

  if (error instanceof Error) {
    return new AppError(error.message || '请求失败，请稍后重试', {
      type: AppErrorType.UNKNOWN
    })
  }

  return new AppError('请求失败，请稍后重试', {
    type: AppErrorType.UNKNOWN,
    details: error
  })
}

export function getUserErrorMessage(error: unknown) {
  return normalizeError(error).userMessage
}

export function isUnauthorizedError(error: unknown) {
  return normalizeError(error).type === AppErrorType.UNAUTHORIZED
}

