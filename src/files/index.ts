import Taro from '@tarojs/taro'
import { ensureAccessToken } from '@/api/core/auth'
import { appConfig, buildApiUrl } from '@/config/app'
import { AppErrorType, RequestError } from '@/errors'
import { hideLoading, showLoading, toastError, toastSuccess } from '@/feedback'

type Header = Record<string, unknown>

export interface FileRequestOptions {
  url: string
  header?: Header
  timeout?: number
  skipAuth?: boolean
  showLoading?: boolean
  loadingText?: string
  showSuccessToast?: boolean
  successText?: string
  showErrorToast?: boolean
}

export interface UploadFileOptions extends FileRequestOptions {
  filePath: string
  name?: string
  formData?: Record<string, unknown>
  onProgress?: (progress: Taro.UploadTask.OnProgressUpdateCallbackResult) => void
}

export interface DownloadFileOptions extends FileRequestOptions {
  filePath?: string
  onProgress?: (progress: Taro.DownloadTask.OnProgressUpdateCallbackResult) => void
}

export interface DownloadAndOpenFileOptions extends DownloadFileOptions {
  fileType?: keyof Taro.openDocument.FileType
  showMenu?: boolean
}

async function buildHeader(options: FileRequestOptions) {
  const header: Header = {
    ...(options.header || {})
  }
  const token = options.skipAuth ? null : await ensureAccessToken()
  if (!options.skipAuth && token)
    header.Authorization = `Bearer ${token}`

  return header
}

function createFileError(message: string, options: { statusCode?: number, details?: unknown } = {}) {
  return new RequestError(message, {
    statusCode: options.statusCode,
    details: options.details,
    type: options.statusCode ? undefined : AppErrorType.NETWORK
  })
}

function handleFileError(error: unknown, showErrorToast = true): never {
  if (showErrorToast)
    toastError(error)
  throw error
}

function parseUploadResponse<T>(data: string) {
  if (!data)
    return undefined as T

  try {
    return JSON.parse(data) as T
  }
  catch {
    return data as T
  }
}

export async function uploadFile<T = unknown>(options: UploadFileOptions) {
  const shouldShowLoading = options.showLoading === true
  if (shouldShowLoading)
    showLoading(options.loadingText || '上传中')

  try {
    const task = Taro.uploadFile({
      url: buildApiUrl(options.url),
      filePath: options.filePath,
      name: options.name || 'file',
      formData: options.formData,
      timeout: options.timeout || appConfig.fileTimeout,
      header: await buildHeader(options)
    })

    if (options.onProgress)
      task.onProgressUpdate(options.onProgress)

    const result = await task
    if (result.statusCode < 200 || result.statusCode >= 300) {
      throw createFileError('文件上传失败', {
        statusCode: result.statusCode,
        details: result
      })
    }

    const data = parseUploadResponse<T>(result.data)
    if (options.showSuccessToast)
      toastSuccess(options.successText || '上传成功')

    return data
  }
  catch (error) {
    return handleFileError(error, options.showErrorToast !== false)
  }
  finally {
    if (shouldShowLoading)
      hideLoading()
  }
}

export async function downloadFile(options: DownloadFileOptions) {
  const shouldShowLoading = options.showLoading === true
  if (shouldShowLoading)
    showLoading(options.loadingText || '下载中')

  try {
    const task = Taro.downloadFile({
      url: buildApiUrl(options.url),
      filePath: options.filePath,
      timeout: options.timeout || appConfig.fileTimeout,
      header: await buildHeader(options)
    })

    if (options.onProgress)
      task.onProgressUpdate(options.onProgress)

    const result = await task
    if (result.statusCode < 200 || result.statusCode >= 300) {
      throw createFileError('文件下载失败', {
        statusCode: result.statusCode,
        details: result
      })
    }

    if (options.showSuccessToast)
      toastSuccess(options.successText || '下载成功')

    return result
  }
  catch (error) {
    return handleFileError(error, options.showErrorToast !== false)
  }
  finally {
    if (shouldShowLoading)
      hideLoading()
  }
}

export async function downloadAndOpenFile(options: DownloadAndOpenFileOptions) {
  const result = await downloadFile(options)
  const filePath = result.filePath || result.tempFilePath

  await Taro.openDocument({
    filePath,
    fileType: options.fileType,
    showMenu: options.showMenu
  })

  return result
}
