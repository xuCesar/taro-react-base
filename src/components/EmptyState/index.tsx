import type { ReactNode } from 'react'
import { Text, View } from '@tarojs/components'

interface EmptyStateProps {
  title?: string
  description?: string
  actions?: ReactNode
}

export default function EmptyState({
  title = '暂无内容',
  description = '这里暂时还没有可展示的数据。',
  actions
}: EmptyStateProps) {
  return (
    <View className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-10 shadow-sm">
      <Text className="block text-center text-base font-medium text-gray-900">{title}</Text>
      <Text className="mt-2 block text-center text-sm text-gray-500">{description}</Text>
      {actions ? <View className="mt-5 flex justify-center">{actions}</View> : null}
    </View>
  )
}
