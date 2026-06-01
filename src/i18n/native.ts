import Taro from '@tarojs/taro'
import { type Locale, translate } from './index'

const tabBarItems = [
  {
    index: 0,
    key: 'common.home'
  },
  {
    index: 1,
    key: 'common.profile'
  }
] as const

export function syncNativeI18n(locale: Locale, title?: string) {
  if (title) {
    void Taro.setNavigationBarTitle({ title }).catch(() => undefined)
  }

  tabBarItems.forEach(item => {
    void Taro.setTabBarItem({
      index: item.index,
      text: translate(locale, item.key)
    }).catch(() => undefined)
  })
}

export function scheduleNativeI18nSync(locale: Locale, title?: string) {
  const timers: ReturnType<typeof setTimeout>[] = []
  syncNativeI18n(locale, title)
  timers.push(setTimeout(() => syncNativeI18n(locale, title), 80))
  timers.push(setTimeout(() => syncNativeI18n(locale, title), 300))
  timers.push(setTimeout(() => syncNativeI18n(locale, title), 800))

  return () => {
    timers.forEach(timer => clearTimeout(timer))
  }
}

