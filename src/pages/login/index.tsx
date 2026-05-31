import { useState } from 'react'
import { Button, Input, Text, View } from '@tarojs/components'
import { useMutation } from '@tanstack/react-query'
import PageWrapper from '@/components/PageWrapper'
import { type LoginParams, loginApi } from '@/api/endpoints/auth'
import { saveAuthPayload } from '@/api/core/auth'
import { RouteName } from '@/constants/routes'
import { switchTab } from '@/router'

export default function LoginPage() {
  const [account, setAccount] = useState('demo')
  const [password, setPassword] = useState('123456')

  const loginMutation = useMutation({
    mutationFn: (params: LoginParams) => loginApi(params),
    onSuccess: (data) => {
      saveAuthPayload(data)
      switchTab(RouteName.HOME)
    }
  })

  const submitAccountLogin = () => {
    loginMutation.mutate({
      loginType: 'account',
      account,
      password
    })
  }

  return (
    <PageWrapper
      title="Taro React Base"
      description="轻量工程骨架，内置路由、缓存、认证、页面状态和服务端状态能力。"
      contentClassName="justify-center"
    >
      <View className="rounded-2xl bg-white p-6 shadow-sm">
        <Text className="block text-base font-medium text-gray-900">登录入口</Text>
        <Text className="mt-2 block text-sm text-gray-500">
          当前仍可命中 mock 登录接口，参数结构已按真实登录预留。
        </Text>
        <View className="mt-5 flex flex-col gap-3">
          <Input
            className="rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900"
            placeholder="账号"
            value={account}
            onInput={event => setAccount(event.detail.value)}
          />
          <Input
            className="rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900"
            password
            placeholder="密码"
            value={password}
            onInput={event => setPassword(event.detail.value)}
          />
        </View>
        <Button
          className="mt-5 w-full rounded-xl bg-blue-600 text-white"
          loading={loginMutation.isPending}
          onClick={submitAccountLogin}
        >
          账号登录
        </Button>
      </View>
    </PageWrapper>
  )
}
