import Taro, { useDidShow } from '@tarojs/taro'
import { cache } from '@/cache'
import { ROUTE_AUTH_CONFIG } from '@/constants/routes'
import { useUserStore } from '@/models/user'
import { getRouteNameByPath } from '@/router'
import { redirectToLogin } from '@/router/auth'

interface AuthGuardOptions {
  required?: boolean
}

export function useAuthGuard(options: AuthGuardOptions = {}) {
  const isLogged = useUserStore.use.isLogged()

  useDidShow(() => {
    const pages = Taro.getCurrentPages()
    const routeName = getRouteNameByPath(pages[pages.length - 1]?.route || '')
    const required = options.required ?? (routeName ? ROUTE_AUTH_CONFIG[routeName].required : true)

    if (!required)
      return

    const hasToken = !!cache.get('accessToken')
    if (!isLogged && !hasToken)
      redirectToLogin()
  })
}
