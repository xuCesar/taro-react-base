import type { ReactNode } from 'react'
import { Text, View } from '@tarojs/components'
import { Inbox } from 'lucide-react-taro'

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
    <View className="app-soft-card border border-dashed border-gray-200 px-6 py-10">
      <View className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
        <Inbox size={24} color="#2563eb" />
      </View>
      <Text className="block text-center text-base font-medium text-gray-900">{title}</Text>
      <Text className="mt-2 block text-center text-sm leading-6 text-gray-500">{description}</Text>
      {actions ? <View className="mt-5 flex justify-center">{actions}</View> : null}
    </View>
  )
}
