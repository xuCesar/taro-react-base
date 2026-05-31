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
    <View className="min-h-screen px-5 py-7">
      <View className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <View className="overflow-hidden rounded-lg bg-slate-950 px-6 py-7 text-white shadow-lg">
          <View className="flex items-start justify-between gap-4">
            <View className="flex-1">
              <Text className="block text-2xl font-semibold">{title}</Text>
              {description
                ? (
                    <Text className="mt-2 block text-sm leading-6 text-slate-300">
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
