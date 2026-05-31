import { useState } from 'react'
import { Button, Input, Text, View } from '@tarojs/components'
import { useMutation } from '@tanstack/react-query'
import { LogIn, ShieldCheck } from 'lucide-react-taro'
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
  const canSubmit = account.trim().length > 0 && password.length > 0 && !loginMutation.isPending

  const submitAccountLogin = () => {
    if (!canSubmit)
      return

    loginMutation.mutate({
      loginType: 'account',
      account: account.trim(),
      password
    })
  }

  return (
    <PageWrapper
      title="Taro React Base"
      description="轻量工程骨架，内置路由、缓存、认证、页面状态和服务端状态能力。"
      contentClassName="justify-center"
    >
      <View className="app-card p-6">
        <View className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
          <ShieldCheck size={24} color="#2563eb" />
        </View>
        <Text className="block text-xl font-semibold text-gray-900">登录入口</Text>
        <Text className="mt-2 block text-sm leading-6 text-gray-500">
          当前仍可命中 mock 登录接口，参数结构已按真实登录预留。
        </Text>
        <View className="mt-5 flex flex-col gap-3">
          <Text className="text-xs font-medium text-gray-500">账号</Text>
          <Input
            className="app-input"
            placeholder="账号"
            value={account}
            onInput={event => setAccount(event.detail.value)}
          />
          <Text className="text-xs font-medium text-gray-500">密码</Text>
          <Input
            className="app-input"
            password
            placeholder="密码"
            value={password}
            onInput={event => setPassword(event.detail.value)}
          />
        </View>
        <Button
          className="app-button mt-6 w-full"
          disabled={!canSubmit}
          loading={loginMutation.isPending}
          onClick={submitAccountLogin}
        >
          <View className="flex items-center justify-center gap-2">
            <LogIn size={20} color="#ffffff" />
            <Text className="text-white">账号登录</Text>
          </View>
        </Button>
      </View>
    </PageWrapper>
  )
}
