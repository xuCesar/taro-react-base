import { TAB_BAR_PAGES } from '@/constants/routes'

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
    color: '#6b7280',
    selectedColor: '#2563eb',
    backgroundColor: '#ffffff',
    list: TAB_BAR_PAGES
  }
})
