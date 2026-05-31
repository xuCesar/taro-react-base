import Taro from '@tarojs/taro'
import { THEMES } from './index'

export type ThemeConfig = (typeof THEMES)[keyof typeof THEMES]

function syncNativeTabBar(tabBar: ThemeConfig['tabBar']) {
  void Taro.setTabBarStyle({
    color: tabBar.color,
    selectedColor: tabBar.selectedColor,
    backgroundColor: tabBar.backgroundColor,
    borderStyle: tabBar.borderStyle
  }).catch(() => undefined)

  tabBar.list.forEach((item, index) => {
    void Taro.setTabBarItem({
      index,
      text: item.text,
      iconPath: item.iconPath,
      selectedIconPath: item.selectedIconPath
    }).catch(() => undefined)
  })
}

export function syncNativeTheme(themeConfig: ThemeConfig) {
  void Taro.setNavigationBarColor({
    frontColor: themeConfig.navigationBarTextStyle === 'white' ? '#ffffff' : '#000000',
    backgroundColor: themeConfig.navigationBarBackgroundColor
  }).catch(() => undefined)
  void Taro.setBackgroundColor({
    backgroundColor: themeConfig.backgroundColor,
    backgroundColorTop: themeConfig.backgroundColor,
    backgroundColorBottom: themeConfig.backgroundColor
  }).catch(() => undefined)
  syncNativeTabBar(themeConfig.tabBar)
}

export function scheduleNativeThemeSync(themeConfig: ThemeConfig) {
  const timers: ReturnType<typeof setTimeout>[] = []
  syncNativeTheme(themeConfig)
  timers.push(setTimeout(() => syncNativeTheme(themeConfig), 80))
  timers.push(setTimeout(() => syncNativeTheme(themeConfig), 300))
  timers.push(setTimeout(() => syncNativeTheme(themeConfig), 800))

  return () => {
    timers.forEach(timer => clearTimeout(timer))
  }
}

