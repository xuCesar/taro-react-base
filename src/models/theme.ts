import { create } from 'zustand'
import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import { appConfig } from '@/config/app'
import { DEFAULT_THEME, THEMES, type ThemeName } from '@/theme'
import { createSelectors } from './selectors'

interface ThemeState {
  theme: ThemeName
  themeSwitchEnabled: boolean
  hasHydrated: boolean
  setTheme: (theme: ThemeName) => void
  setThemeSwitchEnabled: (enabled: boolean) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

const storage: StateStorage = {
  getItem: (key) => getStorageSync(key) ?? null,
  setItem: (key, value) => setStorageSync(key, value),
  removeItem: (key) => removeStorageSync(key)
}

function readStoredTheme(): ThemeName {
  try {
    const value = getStorageSync('theme-store')
    if (!value)
      return DEFAULT_THEME

    const parsed = typeof value === 'string' ? JSON.parse(value) : value
    const theme = parsed?.state?.theme
    return theme && theme in THEMES ? theme : DEFAULT_THEME
  }
  catch {
    return DEFAULT_THEME
  }
}

function readStoredThemeSwitchEnabled() {
  try {
    const value = getStorageSync('theme-store')
    if (!value)
      return appConfig.themeSwitchDefaultEnabled

    const parsed = typeof value === 'string' ? JSON.parse(value) : value
    return parsed?.state?.themeSwitchEnabled ?? appConfig.themeSwitchDefaultEnabled
  }
  catch {
    return appConfig.themeSwitchDefaultEnabled
  }
}

const themeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: readStoredTheme(),
      themeSwitchEnabled: readStoredThemeSwitchEnabled(),
      hasHydrated: false,
      setTheme: theme => {
        if (get().themeSwitchEnabled)
          set({ theme })
      },
      setThemeSwitchEnabled: themeSwitchEnabled => set({ themeSwitchEnabled }),
      setHasHydrated: hasHydrated => set({ hasHydrated })
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => storage),
      partialize: state => ({
        theme: state.theme,
        themeSwitchEnabled: state.themeSwitchEnabled
      }),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true)
      }
    }
  )
)

export const useThemeStore = createSelectors(themeStore)
