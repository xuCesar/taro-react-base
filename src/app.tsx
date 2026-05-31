import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { useDidShow, useLaunch } from '@tarojs/taro'
import { LucideTaroProvider } from 'lucide-react-taro'
import { queryClient } from '@/lib/react-query'
import { useSyncNativeTheme, useTheme } from '@/hooks/useTheme'
import { bootstrapApp } from '@/utils/bootstrap'
import './app.scss'

function App({ children }: PropsWithChildren) {
  const { themeConfig } = useTheme()
  useSyncNativeTheme({ syncOnPageShow: true })

  useLaunch(() => {
    bootstrapApp()
    console.info('taro-react-base launched')
  })

  useDidShow(() => {
    console.info('taro-react-base visible')
  })

  return (
    <LucideTaroProvider defaultColor={themeConfig.iconColor} defaultSize={20}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </LucideTaroProvider>
  )
}

export default App
