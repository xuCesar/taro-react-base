import type { PropsWithChildren, ReactNode } from 'react'
import { Text, View } from '@tarojs/components'
import { useSyncNativeI18n } from '@/hooks/useI18n'
import { useSyncNativeTheme, useTheme } from '@/hooks/useTheme'

interface PageWrapperProps extends PropsWithChildren {
  title: string
  description?: string
  actions?: ReactNode
  contentClassName?: string
}

export default function PageWrapper({
  title,
  description,
  actions,
  contentClassName = '',
  children
}: PageWrapperProps) {
  const { effectiveTheme } = useTheme()
  useSyncNativeTheme({ syncOnPageShow: true })
  useSyncNativeI18n({ title, syncOnPageShow: true, syncKey: effectiveTheme })

  return (
    <View className={`app-page app-theme-${effectiveTheme} min-h-screen px-5 py-7`}>
      <View className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <View className="app-header overflow-hidden rounded-lg px-6 py-7 shadow-lg">
          <View className="flex items-start justify-between gap-4">
            <View className="flex-1">
              <Text className="block text-2xl font-semibold">{title}</Text>
              {description
                ? (
                    <Text className="app-header-muted mt-2 block text-sm leading-6">
                      {description}
                    </Text>
                  )
                : null}
            </View>
            {actions ? <View>{actions}</View> : null}
          </View>
        </View>
        <View className={`flex flex-col gap-4 ${contentClassName}`.trim()}>
          {children}
        </View>
      </View>
    </View>
  )
}
