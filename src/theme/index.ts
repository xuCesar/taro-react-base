export const THEMES = {
  light: {
    label: '浅色',
    iconColor: '#2563eb',
    navigationBarBackgroundColor: '#eef2f7',
    navigationBarTextStyle: 'black',
    backgroundColor: '#eef2f7',
    tabBar: {
      color: '#6b7280',
      selectedColor: '#2563eb',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      list: [
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
    }
  },
  dark: {
    label: '深色',
    iconColor: '#60a5fa',
    navigationBarBackgroundColor: '#0f172a',
    navigationBarTextStyle: 'white',
    backgroundColor: '#0f172a',
    tabBar: {
      color: '#94a3b8',
      selectedColor: '#60a5fa',
      backgroundColor: '#0f172a',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: 'assets/tabbar-dark/house.png',
          selectedIconPath: 'assets/tabbar-dark/house-active.png'
        },
        {
          pagePath: 'pages/profile/index',
          text: '我的',
          iconPath: 'assets/tabbar-dark/user-round.png',
          selectedIconPath: 'assets/tabbar-dark/user-round-active.png'
        }
      ]
    }
  }
} as const

export type ThemeName = keyof typeof THEMES

export const DEFAULT_THEME: ThemeName = 'light'

export const THEME_OPTIONS = Object.entries(THEMES).map(([value, config]) => ({
  value: value as ThemeName,
  label: config.label
}))
