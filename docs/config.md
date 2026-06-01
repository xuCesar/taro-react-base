# Config

项目配置中心位于 `src/config/app.ts`，用于集中管理小程序运行期需要的前端配置。

## 环境变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `TARO_APP_API_BASE` | 空字符串 | API 基础地址。为空时保持相对路径，适合本地 mock。 |
| `TARO_APP_REQUEST_TIMEOUT` | `15000` | 普通请求超时时间，单位毫秒。 |
| `TARO_APP_FILE_TIMEOUT` | `30000` | 文件上传、下载超时时间，单位毫秒。 |
| `TARO_APP_THEME_SWITCH_ENABLED` | `false` | 主题切换能力是否默认启用。用户本地设置会优先于该默认值。 |
| `TARO_APP_MOCK_SCENARIO` | 空字符串 | 开发期 mock 场景。设置后请求会自动携带 `x-mock-scenario`。 |

## 使用约定

- 业务代码不要直接读取 `process.env.TARO_APP_*`，优先从 `appConfig` 获取。
- API 地址拼接统一使用 `buildApiUrl`，避免不同模块自行处理 base URL。
- 如果新增配置项，优先补充 `.env.example` 和本文档，确保本地开发和协作环境一致。

## 示例

```bash
TARO_APP_API_BASE=http://localhost:3000
TARO_APP_REQUEST_TIMEOUT=15000
TARO_APP_FILE_TIMEOUT=30000
TARO_APP_THEME_SWITCH_ENABLED=false
TARO_APP_MOCK_SCENARIO=unauthorized
```

