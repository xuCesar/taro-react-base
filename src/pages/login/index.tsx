import { Button, Text, View } from '@tarojs/components'
import { useMutation } from '@tanstack/react-query'
import PageWrapper from '@/components/PageWrapper'
import { loginApi } from '@/api/endpoints/auth'
import { saveAuthPayload } from '@/api/core/auth'
import { RouteName } from '@/constants/routes'
import { switchTab } from '@/router'

export default function LoginPage() {
  const loginMutation = useMutation({
    mutationFn: () => loginApi(),
    onSuccess: (data) => {
      saveAuthPayload(data)
      switchTab(RouteName.HOME)
    }
  })

  return (
    <PageWrapper
      title="Taro React Base"
      description="轻量工程骨架，内置路由、缓存、认证、页面状态和服务端状态能力。"
      contentClassName="justify-center"
    >
      <View className="rounded-2xl bg-white p-6 shadow-sm">
        <Text className="block text-base font-medium text-gray-900">登录入口</Text>
        <Text className="mt-2 block text-sm text-gray-500">
          当前使用 mock 登录接口，后续替换为真实登录即可。
        </Text>
        <Button
          className="mt-5 w-full rounded-xl bg-blue-600 text-white"
          loading={loginMutation.isPending}
          onClick={() => loginMutation.mutate()}
        >
          模拟登录
        </Button>
      </View>
    </PageWrapper>
  )
}
