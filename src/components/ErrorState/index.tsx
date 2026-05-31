import type { ReactNode } from 'react'
import { Text, View } from '@tarojs/components'
import { CircleAlert } from 'lucide-react-taro'
import { getUserErrorMessage } from '@/errors'

interface ErrorStateProps {
  title?: string
  description?: string
  error?: unknown
  actions?: ReactNode
}

export default function ErrorState({
  title = '加载失败',
  description = '页面数据暂时不可用，请稍后再试。',
  error,
  actions
}: ErrorStateProps) {
  const resolvedDescription = error ? getUserErrorMessage(error) : description

  return (
    <View className="app-error-card px-6 py-10">
      <View className="app-danger-icon-surface mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <CircleAlert size={24} color="inherit" />
      </View>
      <Text className="app-text-primary block text-center text-base font-medium">{title}</Text>
      <Text className="app-text-danger mt-2 block text-center text-sm leading-6">{resolvedDescription}</Text>
      {actions ? <View className="mt-5 flex justify-center">{actions}</View> : null}
    </View>
  )
}
