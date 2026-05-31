import { TAB_BAR_PAGES } from '@/constants/routes'
import { DEFAULT_THEME, THEMES } from '@/theme'

const defaultTheme = THEMES[DEFAULT_THEME]

export default defineAppConfig({
  entryPagePath: 'pages/login/index',
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/profile/index'
  ],
  window: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'Taro React Base',
    navigationBarTextStyle: 'black',
    backgroundTextStyle: 'light'
  },
  tabBar: {
    color: defaultTheme.tabBar.color,
    selectedColor: defaultTheme.tabBar.selectedColor,
    backgroundColor: defaultTheme.tabBar.backgroundColor,
    borderStyle: defaultTheme.tabBar.borderStyle,
    list: TAB_BAR_PAGES.map(item => ({ ...item }))
  }
})
