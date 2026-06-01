import { Button, Switch, Text, View } from '@tarojs/components'
import { Languages, Moon, RotateCcw, SunMedium, UserRound } from 'lucide-react-taro'
import { clearAuthState } from '@/api/core/auth'
import ErrorState from '@/components/ErrorState'
import LoadingState from '@/components/LoadingState'
import PageWrapper from '@/components/PageWrapper'
import { RouteName } from '@/constants/routes'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useI18n } from '@/hooks/useI18n'
import { useTheme } from '@/hooks/useTheme'
import { LOCALE_OPTIONS } from '@/i18n'
import { useUserStore } from '@/models/user'
import { reLaunch } from '@/router'
import { THEME_OPTIONS } from '@/theme'

export default function ProfilePage() {
  useAuthGuard()
  const isLogged = useUserStore.use.isLogged()
  const { effectiveTheme, themeSwitchEnabled, setTheme, setThemeSwitchEnabled } = useTheme()
  const { effectiveLocale, i18nEnabled, setLocale, setI18nEnabled, t } = useI18n()
  const { data, isLoading, isError, refetch, error } = useCurrentUser(isLogged)

  const logout = () => {
    clearAuthState()
    reLaunch(RouteName.LOGIN)
  }

  return (
    <PageWrapper
      title={t('profile.title')}
      description={t('profile.description')}
      actions={<Button className="app-warn-button px-4" size="mini" onClick={logout}>{t('common.logout')}</Button>}
    >
      {isLoading
        ? (
            <LoadingState title={t('profile.loadingTitle')} description={t('profile.loadingDescription')} />
          )
        : null}
      {!isLoading && isError
        ? (
            <ErrorState
              title={t('profile.errorTitle')}
              error={error}
              actions={(
                <Button className="app-button px-6" onClick={() => refetch()}>
                  <View className="flex items-center justify-center gap-2">
                    <RotateCcw size={20} color="#ffffff" />
                    <Text className="text-white">{t('common.reload')}</Text>
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
                <Text className="app-text-primary block text-xl font-semibold">{t('profile.userInfoTitle')}</Text>
                <Text className="app-text-muted mt-2 block text-sm leading-6">
                  {t('profile.currentUser', { nickname: data?.nickname || t('profile.unconnectedUser') })}
                </Text>
              </View>
              <View className="app-card p-6">
                <Text className="app-text-primary block text-base font-semibold">{t('profile.themeTitle')}</Text>
                <Text className="app-text-muted mt-2 block text-sm leading-6">
                  {t('profile.themeDescription')}
                </Text>
                <View className="app-soft-card mt-4 flex items-center justify-between p-4">
                  <View className="flex-1">
                    <Text className="app-text-primary block text-sm font-semibold">{t('profile.themeSwitchTitle')}</Text>
                    <Text className="app-text-muted mt-1 block text-xs leading-5">
                      {t('profile.themeSwitchDescription')}
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
                          <Text className={active ? 'app-text-primary' : 'app-text-muted'}>{t(`theme.${option.value}`)}</Text>
                        </View>
                      </Button>
                    )
                  })}
                </View>
              </View>
              <View className="app-card p-6">
                <Text className="app-text-primary block text-base font-semibold">{t('profile.i18nTitle')}</Text>
                <Text className="app-text-muted mt-2 block text-sm leading-6">
                  {t('profile.i18nDescription')}
                </Text>
                <View className="app-soft-card mt-4 flex items-center justify-between p-4">
                  <View className="flex-1">
                    <Text className="app-text-primary block text-sm font-semibold">{t('profile.i18nSwitchTitle')}</Text>
                    <Text className="app-text-muted mt-1 block text-xs leading-5">
                      {t('profile.i18nSwitchDescription')}
                    </Text>
                  </View>
                  <Switch
                    checked={i18nEnabled}
                    color="#2563eb"
                    onChange={event => setI18nEnabled(event.detail.value)}
                  />
                </View>
                <View className="mt-4 grid grid-cols-2 gap-3">
                  {LOCALE_OPTIONS.map(option => {
                    const active = option.value === effectiveLocale
                    return (
                      <Button
                        key={option.value}
                        className={`px-4 py-3 ${active ? 'app-theme-option-active' : 'app-theme-option'} ${i18nEnabled ? '' : 'app-theme-option-disabled'}`}
                        disabled={!i18nEnabled}
                        onClick={() => setLocale(option.value)}
                      >
                        <View className="flex items-center justify-center gap-2">
                          <Languages size={18} color="inherit" />
                          <Text className={active ? 'app-text-primary' : 'app-text-muted'}>{option.label}</Text>
                        </View>
                      </Button>
                    )
                  })}
                </View>
              </View>
              <View className="app-soft-card p-6">
                <Text className="app-text-primary block text-base font-semibold">{t('profile.frameworkTitle')}</Text>
                <Text className="app-text-muted mt-2 block text-sm leading-6">
                  {t('profile.frameworkDescription')}
                </Text>
              </View>
            </>
          )
        : null}
    </PageWrapper>
  )
}
