import { Text, View } from '@tarojs/components'
import { LoaderCircle } from 'lucide-react-taro'

interface LoadingStateProps {
  title?: string
  description?: string
}

export default function LoadingState({
  title = '加载中',
  description = '正在准备页面数据，请稍候。'
}: LoadingStateProps) {
  return (
    <View className="app-card px-6 py-10">
      <View className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
        <LoaderCircle className="animate-spin" size={24} color="#2563eb" />
      </View>
      <Text className="block text-center text-base font-medium text-gray-900">{title}</Text>
      <Text className="mt-2 block text-center text-sm leading-6 text-gray-500">{description}</Text>
    </View>
  )
}
