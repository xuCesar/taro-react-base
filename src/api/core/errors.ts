export class RequestError extends Error {
  code?: string | number
  statusCode?: number
  details?: unknown

  constructor(message: string, options: { code?: string | number, statusCode?: number, details?: unknown } = {}) {
    super(message)
    this.name = 'RequestError'
    this.code = options.code
    this.statusCode = options.statusCode
    this.details = options.details
  }
}

export function isUnauthorizedError(error: unknown) {
  return error instanceof RequestError && (error.statusCode === 401 || error.code === 401 || error.code === '401')
}
