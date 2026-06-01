import Taro from '@tarojs/taro'
import { confirm, toastInfo } from '@/feedback'

export type PermissionScope =
  | 'scope.userLocation'
  | 'scope.writePhotosAlbum'
  | 'scope.record'
  | 'scope.camera'

export interface PermissionMeta {
  title: string
  description: string
}

export interface EnsurePermissionOptions {
  guideToSetting?: boolean
  meta?: Partial<PermissionMeta>
}

const PERMISSION_META: Record<PermissionScope, PermissionMeta> = {
  'scope.userLocation': {
    title: '位置权限',
    description: '需要获取位置权限后才能继续使用该功能。'
  },
  'scope.writePhotosAlbum': {
    title: '相册权限',
    description: '需要保存到相册权限后才能继续使用该功能。'
  },
  'scope.record': {
    title: '录音权限',
    description: '需要录音权限后才能继续使用该功能。'
  },
  'scope.camera': {
    title: '摄像头权限',
    description: '需要摄像头权限后才能继续使用该功能。'
  }
}

function getPermissionMeta(scope: PermissionScope, meta?: Partial<PermissionMeta>) {
  return {
    ...PERMISSION_META[scope],
    ...(meta || {})
  }
}

export async function getPermissionStatus(scope: PermissionScope) {
  const setting = await Taro.getSetting()
  return setting.authSetting[scope]
}

export async function openPermissionSetting(scope: PermissionScope) {
  const setting = await Taro.openSetting()
  return setting.authSetting[scope] === true
}

export async function ensurePermission(scope: PermissionScope, options: EnsurePermissionOptions = {}) {
  const status = await getPermissionStatus(scope)
  if (status === true)
    return true

  try {
    await Taro.authorize({ scope })
    return true
  }
  catch {
    if (options.guideToSetting === false) {
      toastInfo('未获得授权，暂无法继续使用该功能')
      return false
    }

    const meta = getPermissionMeta(scope, options.meta)
    const shouldOpenSetting = await confirm({
      title: meta.title,
      content: `${meta.description} 是否前往设置开启？`,
      confirmText: '去设置',
      cancelText: '取消'
    })

    if (!shouldOpenSetting)
      return false

    return openPermissionSetting(scope)
  }
}

export function ensureLocationPermission(options?: EnsurePermissionOptions) {
  return ensurePermission('scope.userLocation', options)
}

export function ensureAlbumPermission(options?: EnsurePermissionOptions) {
  return ensurePermission('scope.writePhotosAlbum', options)
}

export function ensureRecordPermission(options?: EnsurePermissionOptions) {
  return ensurePermission('scope.record', options)
}

export function ensureCameraPermission(options?: EnsurePermissionOptions) {
  return ensurePermission('scope.camera', options)
}

