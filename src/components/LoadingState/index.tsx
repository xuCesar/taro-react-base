import { Text, View } from '@tarojs/components'

interface LoadingStateProps {
  title?: string
  description?: string
}

export default function LoadingState({
  title = '加载中',
  description = '正在准备页面数据，请稍候。'
}: LoadingStateProps) {
  return (
    <View className="rounded-2xl bg-white px-6 py-10 shadow-sm">
      <View className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      <Text className="block text-center text-base font-medium text-gray-900">{title}</Text>
      <Text className="mt-2 block text-center text-sm text-gray-500">{description}</Text>
    </View>
  )
}
