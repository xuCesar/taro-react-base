import { useState } from 'react'
import { Button, Input, Text, View } from '@tarojs/components'
import { useMutation } from '@tanstack/react-query'
import { LogIn, ShieldCheck } from 'lucide-react-taro'
import PageWrapper from '@/components/PageWrapper'
import { type LoginParams, loginApi } from '@/api/endpoints/auth'
import { saveAuthPayload } from '@/api/core/auth'
import { useI18n } from '@/hooks/useI18n'
import { redirectAfterLogin } from '@/router/auth'

export default function LoginPage() {
  const [account, setAccount] = useState('demo')
  const [password, setPassword] = useState('123456')
  const { t } = useI18n()

  const loginMutation = useMutation({
    mutationFn: (params: LoginParams) => loginApi(params),
    onSuccess: (data) => {
      saveAuthPayload(data)
      redirectAfterLogin()
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
      title={t('login.appTitle')}
      description={t('login.description')}
      contentClassName="justify-center"
    >
      <View className="app-card p-6">
        <View className="app-icon-surface mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <ShieldCheck size={24} color="inherit" />
        </View>
        <Text className="app-text-primary block text-xl font-semibold">{t('login.entryTitle')}</Text>
        <Text className="app-text-muted mt-2 block text-sm leading-6">
          {t('login.entryDescription')}
        </Text>
        <View className="mt-5 flex flex-col gap-3">
          <Text className="app-text-muted text-xs font-medium">{t('login.account')}</Text>
          <Input
            className="app-input"
            placeholder={t('login.accountPlaceholder')}
            value={account}
            onInput={event => setAccount(event.detail.value)}
          />
          <Text className="app-text-muted text-xs font-medium">{t('login.password')}</Text>
          <Input
            className="app-input"
            password
            placeholder={t('login.passwordPlaceholder')}
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
            <Text className="text-white">{t('login.submit')}</Text>
          </View>
        </Button>
      </View>
    </PageWrapper>
  )
}
