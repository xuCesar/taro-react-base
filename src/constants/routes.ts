import { DEFAULT_THEME, THEMES } from '@/theme'

export enum RouteName {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  PROFILE = 'PROFILE'
}

export const ROUTES = {
  [RouteName.LOGIN]: '/pages/login/index',
  [RouteName.HOME]: '/pages/home/index',
  [RouteName.PROFILE]: '/pages/profile/index'
} as const

export const TAB_BAR_ROUTE_NAMES = [RouteName.HOME, RouteName.PROFILE] as const

export const TAB_BAR_PAGES = THEMES[DEFAULT_THEME].tabBar.list
