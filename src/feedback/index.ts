import Taro from '@tarojs/taro'
import { getUserErrorMessage } from '@/errors'

export function toastSuccess(title: string, duration = 1800) {
  return Taro.showToast({
    title,
    icon: 'success',
    duration
  })
}

export function toastInfo(title: string, duration = 1800) {
  return Taro.showToast({
    title,
    icon: 'none',
    duration
  })
}

export function toastError(error: unknown, duration = 2200) {
  return Taro.showToast({
    title: getUserErrorMessage(error),
    icon: 'none',
    duration
  })
}

export function showLoading(title = '加载中') {
  return Taro.showLoading({
    title,
    mask: true
  })
}

export function hideLoading() {
  return Taro.hideLoading()
}

export async function confirm(options: {
  title: string
  content: string
  confirmText?: string
  cancelText?: string
}) {
  const result = await Taro.showModal({
    title: options.title,
    content: options.content,
    confirmText: options.confirmText || '确定',
    cancelText: options.cancelText || '取消'
  })

  return result.confirm
}

