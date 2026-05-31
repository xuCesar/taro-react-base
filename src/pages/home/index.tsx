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
        <View className="app-icon-surface mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <House size={24} color="inherit" />
        </View>
        <Text className="app-text-primary block text-lg font-semibold">已集成能力</Text>
        <Text className="app-text-muted mt-2 block text-sm leading-6">
          Taro 4、React Query、类型安全路由、typed cache、Taro.request 请求层。
        </Text>
      </View>
      <View className="grid grid-cols-2 gap-3">
        <View className="app-soft-card p-4">
          <Layers size={20} color="#0f766e" />
          <Text className="app-text-muted block text-xs">状态管理</Text>
          <Text className="app-text-primary mt-1 block text-base font-semibold">Zustand</Text>
        </View>
        <View className="app-soft-card p-4">
          <Database size={20} color="#9333ea" />
          <Text className="app-text-muted block text-xs">服务端数据</Text>
          <Text className="app-text-primary mt-1 block text-base font-semibold">React Query</Text>
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
