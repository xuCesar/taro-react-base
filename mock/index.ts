import type { Request, Response } from 'express'

type MockScenario = 'success' | 'login-failed' | 'unauthorized' | 'server-error' | 'empty-user' | 'refresh-failed'

interface ApiResponse<T> {
  success: boolean
  code: string | number
  message: string
  data: T | null
}

const scenarios = ['success', 'login-failed', 'unauthorized', 'server-error', 'empty-user', 'refresh-failed'] as const
let activeScenario: MockScenario = 'success'

function isMockScenario(value: unknown): value is MockScenario {
  return typeof value === 'string' && scenarios.includes(value as MockScenario)
}

function getScenario(req: Request): MockScenario {
  const queryScenario = req.query.scenario
  const headerScenario = req.headers['x-mock-scenario']
  const envScenario = process.env.MOCK_SCENARIO

  const candidate = Array.isArray(queryScenario)
    ? queryScenario[0]
    : queryScenario || headerScenario || envScenario || activeScenario

  return isMockScenario(candidate) ? candidate : activeScenario
}

function sendJson<T>(res: Response, statusCode: number, body: ApiResponse<T>) {
  res.status(statusCode).json(body)
}

function ok<T>(res: Response, data: T, message = 'ok') {
  sendJson(res, 200, {
    success: true,
    code: '200',
    message,
    data
  })
}

function fail(res: Response, statusCode: number, code: string | number, message: string) {
  sendJson(res, statusCode, {
    success: false,
    code,
    message,
    data: null
  })
}

export default {
  'GET /mock/scenario': (req: Request, res: Response) => {
    ok(res, {
      activeScenario,
      currentRequestScenario: getScenario(req),
      scenarios
    })
  },

  'POST /mock/scenario': (req: Request, res: Response) => {
    const scenario = req.body?.scenario
    if (!isMockScenario(scenario)) {
      fail(res, 400, 'INVALID_MOCK_SCENARIO', '不支持的 mock 场景')
      return
    }

    activeScenario = scenario
    ok(res, { activeScenario })
  },

  'POST /auth/login': (req: Request, res: Response) => {
    const scenario = getScenario(req)
    if (scenario === 'login-failed') {
      fail(res, 400, 'LOGIN_FAILED', '账号或密码不正确')
      return
    }
    if (scenario === 'server-error') {
      fail(res, 500, 'SERVER_ERROR', '登录服务暂时不可用')
      return
    }

    ok(res, {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresAt: '2099-12-31T23:59:59.000Z'
    })
  },

  'POST /auth/refresh': (req: Request, res: Response) => {
    const scenario = getScenario(req)
    if (scenario === 'refresh-failed' || scenario === 'unauthorized') {
      fail(res, 401, '401', 'refresh token 已失效')
      return
    }

    ok(res, {
      accessToken: 'mock-access-token-refreshed',
      refreshToken: 'mock-refresh-token-refreshed',
      expiresAt: '2099-12-31T23:59:59.000Z'
    })
  },

  'GET /user/me': (req: Request, res: Response) => {
    const scenario = getScenario(req)
    if (scenario === 'unauthorized') {
      fail(res, 401, '401', '登录状态已失效')
      return
    }
    if (scenario === 'server-error') {
      fail(res, 500, 'SERVER_ERROR', '用户服务暂时不可用')
      return
    }
    if (scenario === 'empty-user') {
      ok(res, {
        id: '',
        nickname: ''
      })
      return
    }

    ok(res, {
      id: '1',
      nickname: 'Mock User'
    })
  }
}
