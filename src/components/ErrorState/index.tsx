import type { ReactNode } from 'react'
import { Text, View } from '@tarojs/components'
import { CircleAlert } from 'lucide-react-taro'

interface ErrorStateProps {
  title?: string
  description?: string
  actions?: ReactNode
}

export default function ErrorState({
  title = '加载失败',
  description = '页面数据暂时不可用，请稍后再试。',
  actions
}: ErrorStateProps) {
  return (
    <View className="rounded-lg border border-rose-100 bg-rose-50 px-6 py-10 shadow-sm">
      <View className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
        <CircleAlert size={24} color="#be123c" />
      </View>
      <Text className="block text-center text-base font-medium text-rose-900">{title}</Text>
      <Text className="mt-2 block text-center text-sm leading-6 text-rose-700">{description}</Text>
      {actions ? <View className="mt-5 flex justify-center">{actions}</View> : null}
    </View>
  )
}
