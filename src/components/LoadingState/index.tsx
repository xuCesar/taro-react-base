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
      <View className="app-icon-surface mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <LoaderCircle className="animate-spin" size={24} color="inherit" />
      </View>
      <Text className="app-text-primary block text-center text-base font-medium">{title}</Text>
      <Text className="app-text-muted mt-2 block text-center text-sm leading-6">{description}</Text>
    </View>
  )
}
