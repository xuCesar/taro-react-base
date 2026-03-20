export default {
  'POST /auth/login': {
    success: true,
    code: '200',
    message: 'ok',
    data: {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresAt: '2099-12-31T23:59:59.000Z'
    }
  },
  'POST /auth/refresh': {
    success: true,
    code: '200',
    message: 'ok',
    data: {
      accessToken: 'mock-access-token-refreshed',
      refreshToken: 'mock-refresh-token-refreshed',
      expiresAt: '2099-12-31T23:59:59.000Z'
    }
  },
  'GET /user/me': {
    success: true,
    code: '200',
    message: 'ok',
    data: {
      id: '1',
      nickname: 'Mock User'
    }
  }
}
