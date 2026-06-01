function readNumberEnv(value: string | undefined, fallback: number) {
  const result = Number(value)
  return Number.isFinite(result) && result > 0 ? result : fallback
}

function normalizeBaseUrl(value: string | undefined) {
  return (value || '').replace(/\/+$/, '')
}

export const appConfig = {
  apiBaseUrl: normalizeBaseUrl(process.env.TARO_APP_API_BASE),
  requestTimeout: readNumberEnv(process.env.TARO_APP_REQUEST_TIMEOUT, 15000),
  fileTimeout: readNumberEnv(process.env.TARO_APP_FILE_TIMEOUT, 30000),
  themeSwitchDefaultEnabled: process.env.TARO_APP_THEME_SWITCH_ENABLED === 'true',
  mockScenario: process.env.TARO_APP_MOCK_SCENARIO || ''
}

export function buildApiUrl(url: string) {
  if (/^https?:\/\//.test(url))
    return url

  if (!appConfig.apiBaseUrl)
    return url

  return `${appConfig.apiBaseUrl}${url.startsWith('/') ? url : `/${url}`}`
}

export function getMockScenarioHeader() {
  if (!appConfig.mockScenario)
    return {}

  return {
    'x-mock-scenario': appConfig.mockScenario
  }
}
