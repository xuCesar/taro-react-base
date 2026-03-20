import type { PropsWithChildren, ReactNode } from 'react'
import { Text, View } from '@tarojs/components'

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
  return (
    <View className="min-h-screen bg-gray-100 px-6 py-8">
      <View className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <View className="rounded-3xl bg-slate-900 px-6 py-7 text-white shadow-lg">
          <View className="flex items-start justify-between gap-4">
            <View className="flex-1">
              <Text className="block text-3xl font-semibold">{title}</Text>
              {description
                ? (
                    <Text className="mt-2 block text-sm text-slate-300">
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
