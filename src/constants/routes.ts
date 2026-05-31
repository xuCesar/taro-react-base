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

export const TAB_BAR_PAGES = [
  {
    pagePath: 'pages/home/index',
    text: '首页',
    iconPath: 'assets/tabbar/house.png',
    selectedIconPath: 'assets/tabbar/house-active.png'
  },
  {
    pagePath: 'pages/profile/index',
    text: '我的',
    iconPath: 'assets/tabbar/user-round.png',
    selectedIconPath: 'assets/tabbar/user-round-active.png'
  }
]
