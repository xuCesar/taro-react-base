import Taro from '@tarojs/taro'
import { ROUTES, RouteName, TAB_BAR_ROUTE_NAMES } from '@/constants/routes'

export type RouteParams = Record<string, string | number | boolean | undefined>

function buildUrl(name: RouteName, params?: RouteParams) {
  const path = ROUTES[name]
  if (!params)
    return path

  const search = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')

  return search ? `${path}?${search}` : path
}

export function navigateTo(name: RouteName, params?: RouteParams) {
  return Taro.navigateTo({ url: buildUrl(name, params) })
}

export function redirectTo(name: RouteName, params?: RouteParams) {
  return Taro.redirectTo({ url: buildUrl(name, params) })
}

export function reLaunch(name: RouteName, params?: RouteParams) {
  return Taro.reLaunch({ url: buildUrl(name, params) })
}

export function switchTab(name: (typeof TAB_BAR_ROUTE_NAMES)[number]) {
  return Taro.switchTab({ url: ROUTES[name] })
}

export function navigateBack(delta = 1) {
  return Taro.navigateBack({ delta })
}

export function isTabBarRoute(name: RouteName) {
  return TAB_BAR_ROUTE_NAMES.includes(name as (typeof TAB_BAR_ROUTE_NAMES)[number])
}
