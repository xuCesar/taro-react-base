import { Button, Text, View } from '@tarojs/components'
import EmptyState from '@/components/EmptyState'
import ErrorState from '@/components/ErrorState'
import LoadingState from '@/components/LoadingState'
import PageWrapper from '@/components/PageWrapper'
import { use__PascalModule__List } from '@/hooks/use__PascalModule__'

export default function __PascalModule__Page() {
  const { data, isLoading, isError, error, refetch } = use__PascalModule__List()

  return (
    <PageWrapper title="__ModuleTitle__" description="__ModuleDescription__">
      {isLoading
        ? <LoadingState title="正在加载__ModuleTitle__" />
        : null}

      {!isLoading && isError
        ? (
            <ErrorState
              title="__ModuleTitle__加载失败"
              error={error}
              actions={<Button onClick={() => refetch()}>重新加载</Button>}
            />
          )
        : null}

      {!isLoading && !isError && !data?.list.length
        ? <EmptyState title="暂无__ModuleTitle__" />
        : null}

      {!isLoading && !isError && data?.list.length
        ? (
            <View className="flex flex-col gap-3">
              {data.list.map(item => (
                <View key={item.id} className="rounded-2xl bg-white p-5 shadow-sm">
                  <Text className="block text-base font-medium text-gray-900">{item.name}</Text>
                </View>
              ))}
            </View>
          )
        : null}
    </PageWrapper>
  )
}
