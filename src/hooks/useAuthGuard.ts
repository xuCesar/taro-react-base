import { useDidShow } from '@tarojs/taro'
import { RouteName } from '@/constants/routes'
import { useUserStore } from '@/models/user'
import { reLaunch } from '@/router'

export function useAuthGuard() {
  const isLogged = useUserStore.use.isLogged()

  useDidShow(() => {
    if (!isLogged)
      reLaunch(RouteName.LOGIN)
  })
}
