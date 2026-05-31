import { useEffect, useRef } from 'react'
import { useDidShow } from '@tarojs/taro'
import { useThemeStore } from '@/models/theme'
import { DEFAULT_THEME, THEMES } from '@/theme'
import { scheduleNativeThemeSync } from '@/theme/native'

export function useTheme() {
  const theme = useThemeStore.use.theme()
  const themeSwitchEnabled = useThemeStore.use.themeSwitchEnabled()
  const hasHydrated = useThemeStore.use.hasHydrated()
  const effectiveTheme = themeSwitchEnabled ? theme : DEFAULT_THEME
  const themeConfig = THEMES[effectiveTheme]

  return {
    theme,
    effectiveTheme,
    themeConfig,
    themeSwitchEnabled,
    hasHydrated,
    setTheme: useThemeStore.use.setTheme(),
    setThemeSwitchEnabled: useThemeStore.use.setThemeSwitchEnabled()
  }
}

export function useSyncNativeTheme(options: { syncOnPageShow?: boolean } = {}) {
  const { hasHydrated, themeConfig } = useTheme()
  const latestThemeRef = useRef({ hasHydrated, themeConfig })

  useEffect(() => {
    latestThemeRef.current = { hasHydrated, themeConfig }
  }, [hasHydrated, themeConfig])

  useEffect(() => {
    if (!hasHydrated)
      return

    return scheduleNativeThemeSync(themeConfig)
  }, [hasHydrated, themeConfig])

  useDidShow(() => {
    if (!options.syncOnPageShow)
      return

    const latestTheme = latestThemeRef.current
    if (latestTheme.hasHydrated)
      scheduleNativeThemeSync(latestTheme.themeConfig)
  })
}

