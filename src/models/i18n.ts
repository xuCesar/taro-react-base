import { create } from 'zustand'
import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import { appConfig } from '@/config/app'
import { DEFAULT_LOCALE, type Locale, resolveLocale } from '@/i18n'
import { createSelectors } from './selectors'

interface I18nState {
  locale: Locale
  i18nEnabled: boolean
  hasHydrated: boolean
  setLocale: (locale: Locale) => void
  setI18nEnabled: (enabled: boolean) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

const storage: StateStorage = {
  getItem: (key) => getStorageSync(key) ?? null,
  setItem: (key, value) => setStorageSync(key, value),
  removeItem: (key) => removeStorageSync(key)
}

function readStoredI18n() {
  try {
    const value = getStorageSync('i18n-store')
    if (!value)
      return {
        locale: resolveLocale(appConfig.defaultLocale),
        i18nEnabled: appConfig.i18nDefaultEnabled
      }

    const parsed = typeof value === 'string' ? JSON.parse(value) : value
    return {
      locale: resolveLocale(parsed?.state?.locale),
      i18nEnabled: parsed?.state?.i18nEnabled ?? appConfig.i18nDefaultEnabled
    }
  }
  catch {
    return {
      locale: DEFAULT_LOCALE,
      i18nEnabled: appConfig.i18nDefaultEnabled
    }
  }
}

const initialI18n = readStoredI18n()

const i18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: initialI18n.locale,
      i18nEnabled: initialI18n.i18nEnabled,
      hasHydrated: false,
      setLocale: locale => {
        if (get().i18nEnabled)
          set({ locale })
      },
      setI18nEnabled: i18nEnabled => set({ i18nEnabled }),
      setHasHydrated: hasHydrated => set({ hasHydrated })
    }),
    {
      name: 'i18n-store',
      storage: createJSONStorage(() => storage),
      partialize: state => ({
        locale: state.locale,
        i18nEnabled: state.i18nEnabled
      }),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true)
      }
    }
  )
)

export const useI18nStore = createSelectors(i18nStore)

