import { Button, Text, View } from '@tarojs/components'
import { ArrowRight, Database, House, Layers } from 'lucide-react-taro'
import EmptyState from '@/components/EmptyState'
import PageWrapper from '@/components/PageWrapper'
import { RouteName } from '@/constants/routes'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useI18n } from '@/hooks/useI18n'
import { navigateTo } from '@/router'

export default function HomePage() {
  useAuthGuard()
  const { t } = useI18n()

  return (
    <PageWrapper
      title={t('home.title')}
      description={t('home.description')}
      actions={<Button className="app-warn-button px-4" size="mini" onClick={() => navigateTo(RouteName.PROFILE)}>{t('home.profileAction')}</Button>}
    >
      <View className="app-card p-6">
        <View className="app-icon-surface mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <House size={24} color="inherit" />
        </View>
        <Text className="app-text-primary block text-lg font-semibold">{t('home.integratedTitle')}</Text>
        <Text className="app-text-muted mt-2 block text-sm leading-6">
          {t('home.integratedDescription')}
        </Text>
      </View>
      <View className="grid grid-cols-2 gap-3">
        <View className="app-soft-card p-4">
          <Layers size={20} color="#0f766e" />
          <Text className="app-text-muted block text-xs">{t('home.stateManagement')}</Text>
          <Text className="app-text-primary mt-1 block text-base font-semibold">Zustand</Text>
        </View>
        <View className="app-soft-card p-4">
          <Database size={20} color="#9333ea" />
          <Text className="app-text-muted block text-xs">{t('home.serverState')}</Text>
          <Text className="app-text-primary mt-1 block text-base font-semibold">React Query</Text>
        </View>
      </View>
      <EmptyState
        title={t('home.emptyTitle')}
        description={t('home.emptyDescription')}
        actions={(
          <Button className="app-button px-6" onClick={() => navigateTo(RouteName.PROFILE)}>
            <View className="flex items-center justify-center gap-2">
              <Text className="text-white">{t('home.goProfile')}</Text>
              <ArrowRight size={20} color="#ffffff" />
            </View>
          </Button>
        )}
      />
    </PageWrapper>
  )
}
