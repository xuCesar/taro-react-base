import { Button, Text, View } from '@tarojs/components'
import { clearAuthState } from '@/api/core/auth'
import ErrorState from '@/components/ErrorState'
import LoadingState from '@/components/LoadingState'
import PageWrapper from '@/components/PageWrapper'
import { RouteName } from '@/constants/routes'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUserStore } from '@/models/user'
import { reLaunch } from '@/router'

export default function ProfilePage() {
  useAuthGuard()
  const isLogged = useUserStore.use.isLogged()
  const { data, isLoading, isError, refetch, error } = useCurrentUser(isLogged)

  const logout = () => {
    clearAuthState()
    reLaunch(RouteName.LOGIN)
  }

  return (
    <PageWrapper
      title="我的"
      description="这个页面演示了 PageWrapper、加载态、错误态和正常内容态的配合方式。"
      actions={<Button type="warn" size="mini" onClick={logout}>退出</Button>}
    >
      {isLoading
        ? (
            <LoadingState title="正在加载用户资料" description="示例中通过 React Query 拉取当前用户信息。" />
          )
        : null}
      {!isLoading && isError
        ? (
            <ErrorState
              title="用户信息加载失败"
              description={error instanceof Error ? error.message : '请稍后重试'}
              actions={<Button onClick={() => refetch()}>重新加载</Button>}
            />
          )
        : null}
      {!isLoading && !isError
        ? (
            <>
              <View className="rounded-2xl bg-white p-6 shadow-sm">
                <Text className="block text-2xl font-semibold text-gray-900">用户信息</Text>
                <Text className="mt-2 block text-sm text-gray-500">
                  {`当前用户：${data?.nickname || '未接入真实接口'}`}
                </Text>
              </View>
              <View className="rounded-2xl bg-white p-6 shadow-sm">
                <Text className="block text-base font-medium text-gray-900">框架建议</Text>
                <Text className="mt-2 block text-sm text-gray-500">
                  页面状态尽量本地化，全局状态交给 Zustand，服务端状态交给 React Query。
                </Text>
              </View>
            </>
          )
        : null}
    </PageWrapper>
  )
}
