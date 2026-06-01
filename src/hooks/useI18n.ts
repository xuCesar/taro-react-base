import { useEffect, useRef } from 'react'
import { useDidShow } from '@tarojs/taro'
import { useI18nStore } from '@/models/i18n'
import { DEFAULT_LOCALE, type I18nKey, I18N_MESSAGES, translate } from '@/i18n'
import { scheduleNativeI18nSync } from '@/i18n/native'

export function useI18n() {
  const locale = useI18nStore.use.locale()
  const i18nEnabled = useI18nStore.use.i18nEnabled()
  const hasHydrated = useI18nStore.use.hasHydrated()
  const effectiveLocale = i18nEnabled ? locale : DEFAULT_LOCALE

  return {
    locale,
    effectiveLocale,
    messages: I18N_MESSAGES[effectiveLocale],
    i18nEnabled,
    hasHydrated,
    setLocale: useI18nStore.use.setLocale(),
    setI18nEnabled: useI18nStore.use.setI18nEnabled(),
    t: (key: I18nKey, values?: Record<string, string | number>) => translate(effectiveLocale, key, values)
  }
}

export function useSyncNativeI18n(options: {
  title?: string
  syncOnPageShow?: boolean
  syncKey?: string
} = {}) {
  const { effectiveLocale, hasHydrated } = useI18n()
  const latestI18nRef = useRef({
    hasHydrated,
    locale: effectiveLocale,
    title: options.title
  })

  useEffect(() => {
    latestI18nRef.current = {
      hasHydrated,
      locale: effectiveLocale,
      title: options.title
    }
  }, [effectiveLocale, hasHydrated, options.title])

  useEffect(() => {
    if (!hasHydrated)
      return

    return scheduleNativeI18nSync(effectiveLocale, options.title)
  }, [effectiveLocale, hasHydrated, options.title, options.syncKey])

  useDidShow(() => {
    if (!options.syncOnPageShow)
      return

    const latestI18n = latestI18nRef.current
    if (latestI18n.hasHydrated)
      scheduleNativeI18nSync(latestI18n.locale, latestI18n.title)
  })
}
