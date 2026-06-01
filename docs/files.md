# Files

文件能力封装位于 `src/files`，用于统一处理上传、下载和打开文件。

## Upload

```ts
import { uploadFile } from '@/files'

const result = await uploadFile<{ url: string }>({
  url: '/files/upload',
  filePath: tempFilePath,
  name: 'file',
  formData: {
    bizType: 'avatar'
  },
  showLoading: true,
  showSuccessToast: true,
  onProgress: progress => {
    console.log(progress.progress)
  }
})
```

## Download

```ts
import { downloadFile } from '@/files'

const result = await downloadFile({
  url: '/files/report.pdf',
  showLoading: true,
  onProgress: progress => {
    console.log(progress.progress)
  }
})
```

## Download And Open

```ts
import { downloadAndOpenFile } from '@/files'

await downloadAndOpenFile({
  url: '/files/report.pdf',
  fileType: 'pdf',
  showMenu: true,
  showLoading: true
})
```

默认会自动拼接 `TARO_APP_API_BASE`，并携带 `Authorization`。如果上传或下载的是完整 URL，可以直接传 `https://...`。如需跳过登录态，传 `skipAuth: true`。

