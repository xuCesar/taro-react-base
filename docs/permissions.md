# Permissions

权限封装位于 `src/permissions`，用于统一处理小程序常见授权流程。

## Supported Scopes

- `scope.userLocation`：位置权限。
- `scope.writePhotosAlbum`：保存到相册权限。
- `scope.record`：录音权限。
- `scope.camera`：摄像头权限。

## Usage

```ts
import { ensureLocationPermission } from '@/permissions'

async function openMapFeature() {
  const granted = await ensureLocationPermission()
  if (!granted)
    return

  // Continue with location feature.
}
```

自定义引导文案：

```ts
await ensureLocationPermission({
  meta: {
    title: '开启定位',
    description: '需要定位权限为你推荐附近内容。'
  }
})
```

只请求授权，不引导用户打开设置：

```ts
await ensureLocationPermission({
  guideToSetting: false
})
```

