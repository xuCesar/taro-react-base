import { Button, Text, View } from '@tarojs/components'
import { ArrowRight, Database, House, Layers } from 'lucide-react-taro'
import EmptyState from '@/components/EmptyState'
import PageWrapper from '@/components/PageWrapper'
import { RouteName } from '@/constants/routes'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { navigateTo } from '@/router'

export default function HomePage() {
  useAuthGuard()

  return (
    <PageWrapper
      title="首页"
      description="这里保留 starter 的轻量体验，同时引入更稳的基础设施。"
      actions={<Button className="app-warn-button px-4" size="mini" onClick={() => navigateTo(RouteName.PROFILE)}>我的</Button>}
    >
      <View className="app-card p-6">
        <View className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
          <House size={24} color="#2563eb" />
        </View>
        <Text className="block text-lg font-semibold text-gray-900">已集成能力</Text>
        <Text className="mt-2 block text-sm leading-6 text-gray-500">
          Taro 4、React Query、类型安全路由、typed cache、Taro.request 请求层。
        </Text>
      </View>
      <View className="grid grid-cols-2 gap-3">
        <View className="app-soft-card p-4">
          <Layers size={20} color="#0f766e" />
          <Text className="block text-xs text-gray-500">状态管理</Text>
          <Text className="mt-1 block text-base font-semibold text-gray-900">Zustand</Text>
        </View>
        <View className="app-soft-card p-4">
          <Database size={20} color="#9333ea" />
          <Text className="block text-xs text-gray-500">服务端数据</Text>
          <Text className="mt-1 block text-base font-semibold text-gray-900">React Query</Text>
        </View>
      </View>
      <EmptyState
        title="等待接入业务模块"
        description="这里适合放你的首页卡片、运营位、待办和模块入口。"
        actions={(
          <Button className="app-button px-6" onClick={() => navigateTo(RouteName.PROFILE)}>
            <View className="flex items-center justify-center gap-2">
              <Text className="text-white">前往我的页面</Text>
              <ArrowRight size={20} color="#ffffff" />
            </View>
          </Button>
        )}
      />
    </PageWrapper>
  )
}
