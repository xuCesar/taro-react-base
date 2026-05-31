import { Button, Switch, Text, View } from '@tarojs/components'
import { Moon, RotateCcw, SunMedium, UserRound } from 'lucide-react-taro'
import { clearAuthState } from '@/api/core/auth'
import ErrorState from '@/components/ErrorState'
import LoadingState from '@/components/LoadingState'
import PageWrapper from '@/components/PageWrapper'
import { RouteName } from '@/constants/routes'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useTheme } from '@/hooks/useTheme'
import { useUserStore } from '@/models/user'
import { reLaunch } from '@/router'
import { THEME_OPTIONS } from '@/theme'

export default function ProfilePage() {
  useAuthGuard()
  const isLogged = useUserStore.use.isLogged()
  const { effectiveTheme, themeSwitchEnabled, setTheme, setThemeSwitchEnabled } = useTheme()
  const { data, isLoading, isError, refetch, error } = useCurrentUser(isLogged)

  const logout = () => {
    clearAuthState()
    reLaunch(RouteName.LOGIN)
  }

  return (
    <PageWrapper
      title="我的"
      description="这个页面演示了 PageWrapper、加载态、错误态和正常内容态的配合方式。"
      actions={<Button className="app-warn-button px-4" size="mini" onClick={logout}>退出</Button>}
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
              actions={(
                <Button className="app-button px-6" onClick={() => refetch()}>
                  <View className="flex items-center justify-center gap-2">
                    <RotateCcw size={20} color="#ffffff" />
                    <Text className="text-white">重新加载</Text>
                  </View>
                </Button>
              )}
            />
          )
        : null}
      {!isLoading && !isError
        ? (
            <>
              <View className="app-card p-6">
                <View className="app-icon-surface mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <UserRound size={24} color="inherit" />
                </View>
                <Text className="app-text-primary block text-xl font-semibold">用户信息</Text>
                <Text className="app-text-muted mt-2 block text-sm leading-6">
                  {`当前用户：${data?.nickname || '未接入真实接口'}`}
                </Text>
              </View>
              <View className="app-card p-6">
                <Text className="app-text-primary block text-base font-semibold">主题设置</Text>
                <Text className="app-text-muted mt-2 block text-sm leading-6">
                  启用后可切换浅色和深色，后续可继续在主题配置里扩展。
                </Text>
                <View className="app-soft-card mt-4 flex items-center justify-between p-4">
                  <View className="flex-1">
                    <Text className="app-text-primary block text-sm font-semibold">启用主题切换</Text>
                    <Text className="app-text-muted mt-1 block text-xs leading-5">
                      关闭时统一使用默认浅色主题。
                    </Text>
                  </View>
                  <Switch
                    checked={themeSwitchEnabled}
                    color="#2563eb"
                    onChange={event => setThemeSwitchEnabled(event.detail.value)}
                  />
                </View>
                <View className="mt-4 grid grid-cols-2 gap-3">
                  {THEME_OPTIONS.map(option => {
                    const active = option.value === effectiveTheme
                    return (
                      <Button
                        key={option.value}
                        className={`px-4 py-3 ${active ? 'app-theme-option-active' : 'app-theme-option'} ${themeSwitchEnabled ? '' : 'app-theme-option-disabled'}`}
                        disabled={!themeSwitchEnabled}
                        onClick={() => setTheme(option.value)}
                      >
                        <View className="flex items-center justify-center gap-2">
                          {option.value === 'dark'
                            ? <Moon size={18} color="inherit" />
                            : <SunMedium size={18} color="inherit" />}
                          <Text className={active ? 'app-text-primary' : 'app-text-muted'}>{option.label}</Text>
                        </View>
                      </Button>
                    )
                  })}
                </View>
              </View>
              <View className="app-soft-card p-6">
                <Text className="app-text-primary block text-base font-semibold">框架建议</Text>
                <Text className="app-text-muted mt-2 block text-sm leading-6">
                  页面状态尽量本地化，全局状态交给 Zustand，服务端状态交给 React Query。
                </Text>
              </View>
            </>
          )
        : null}
    </PageWrapper>
  )
}
