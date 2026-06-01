import Taro from '@tarojs/taro'
import { toastInfo } from '@/feedback'

export function setupUpdateManager() {
  if (typeof Taro.getUpdateManager !== 'function')
    return

  const updateManager = Taro.getUpdateManager()

  updateManager.onCheckForUpdate((result) => {
    if (result.hasUpdate)
      console.info('A new mini program version is available')
  })

  updateManager.onUpdateReady(() => {
    void Taro.showModal({
      title: '更新提示',
      content: '新版本已准备好，是否重启应用？',
      confirmText: '重启',
      cancelText: '稍后'
    }).then((result) => {
      if (result.confirm)
        updateManager.applyUpdate()
    })
  })

  updateManager.onUpdateFailed(() => {
    toastInfo('新版本下载失败，请稍后重试')
  })
}

