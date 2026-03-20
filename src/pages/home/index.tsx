import { Button, Text, View } from '@tarojs/components'
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
      actions={<Button size="mini" onClick={() => navigateTo(RouteName.PROFILE)}>我的</Button>}
    >
      <View className="rounded-2xl bg-blue-50 p-6 shadow-sm">
        <Text className="block text-base font-medium text-blue-900">已集成能力</Text>
        <Text className="mt-2 block text-sm text-blue-700">
          Taro 4、React Query、类型安全路由、typed cache、Taro.request 请求层。
        </Text>
      </View>
      <EmptyState
        title="等待接入业务模块"
        description="这里适合放你的首页卡片、运营位、待办和模块入口。"
        actions={<Button onClick={() => navigateTo(RouteName.PROFILE)}>前往我的页面</Button>}
      />
    </PageWrapper>
  )
}
