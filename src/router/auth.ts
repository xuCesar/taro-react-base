import Taro from '@tarojs/taro'
import { ROUTES, RouteName, TAB_BAR_ROUTE_NAMES } from '@/constants/routes'
import { reLaunch, switchTab } from '@/router'

export const LOGIN_REDIRECT_PARAM = 'redirect'

export function getCurrentPageUrl() {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]
  if (!currentPage)
    return ''

  const route = currentPage.route ? `/${currentPage.route}` : ''
  const options = currentPage.options || {}
  const search = Object.entries(options)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')

  return search ? `${route}?${search}` : route
}

export function redirectToLogin(redirect = getCurrentPageUrl()) {
  return reLaunch(RouteName.LOGIN, {
    [LOGIN_REDIRECT_PARAM]: redirect || undefined
  })
}

export function getLoginRedirect() {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const redirect = currentPage?.options?.[LOGIN_REDIRECT_PARAM]
  return typeof redirect === 'string' ? decodeURIComponent(redirect) : ''
}

export function redirectAfterLogin(fallback: (typeof TAB_BAR_ROUTE_NAMES)[number] = RouteName.HOME) {
  const redirect = getLoginRedirect()
  if (!redirect || redirect.startsWith(ROUTES[RouteName.LOGIN]))
    return switchTab(fallback)

  const tabBarRoute = TAB_BAR_ROUTE_NAMES.find(routeName => redirect.startsWith(ROUTES[routeName]))
  if (tabBarRoute)
    return switchTab(tabBarRoute)

  return Taro.reLaunch({ url: redirect })
}
