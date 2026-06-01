# taro-react-base

基于 `taro-react-starter-main` 的轻量思路，吸收 `boot-taro-react` 的工程化优点后整理出的新基础框架。

## 技术栈

- Taro 4
- React 18
- TypeScript 5
- TailwindCSS + weapp-tailwindcss
- lucide-react-taro
- Zustand
- React Query
- Taro.request 封装请求层
- Typed Cache
- 类型安全路由
- mock 开发数据
- refresh token 基础链路
- 统一错误处理

## 目录设计

```txt
src
├── api            # 请求层与接口定义
│   ├── core       # request、auth、errors、queryKeys 等基础设施
│   └── template   # 推荐的 API 模块模板
├── components     # PageWrapper、LoadingState、EmptyState、ErrorState 等页面基础组件
├── cache          # typed cache
├── constants      # 常量和路由定义
├── errors         # 错误分类、标准化和用户友好文案
├── feedback       # toast、loading、confirm 等统一反馈 API
├── hooks          # 业务 hooks
├── lib            # 第三方库初始化
├── models         # Zustand store
├── pages          # 页面
├── permissions    # 小程序授权检查与引导
├── router         # 类型安全路由
├── theme          # 主题配置
└── utils          # 启动与工具函数
```

## 设计原则

- 保持 starter 的轻量、易懂、低门槛
- 吸收 boot 的类型化路由、服务端状态管理和缓存思路
- 不强绑定重型 UI 库，先把基础设施做稳
- 让它既适合单人快速起步，也适合后续逐步扩展

## 已补充的正式能力

- `mock/index.ts` 提供开发期 mock 登录、刷新 token、当前用户和异常场景
- `src/api/core/http.ts` 提供统一错误处理和 toast 反馈
- `src/api/core/auth.ts` 提供 token 持久化、清理和 refresh token 串行刷新
- `src/api/template/` 和 `templates/business-module/` 提供推荐的业务模块写法
- `src/components/` 提供 PageWrapper、空态、加载态、错误态等页面级基础设施
- `src/theme/` 和 `src/models/theme.ts` 提供 light/dark 主题切换与持久化
- `src/errors/` 和 `src/feedback/` 提供统一错误分类、友好文案和用户反馈 API
- `src/utils/updateManager.ts` 提供小程序版本更新检测和重启提示
- `src/permissions/` 提供位置、相册、录音、摄像头等授权检查与设置引导

## 错误与反馈

请求错误会被标准化为 `AppError` / `RequestError`，并按网络异常、未授权、参数校验、服务端错误、业务错误等类型生成用户友好文案。业务代码优先使用 `src/feedback` 暴露的 `toastSuccess`、`toastError`、`showLoading`、`confirm`，页面错误态可直接把 error 传给 `ErrorState`。

## Mock 场景

开发期 mock 支持成功、登录失败、401、500、空用户和 refresh token 失败等场景，可通过 `/mock/scenario`、请求 query、请求 header 或 `MOCK_SCENARIO` 环境变量切换。详细用法见 `docs/mock-scenarios.md`。

## 权限能力

小程序授权封装在 `src/permissions`。业务使用 `ensureLocationPermission`、`ensureAlbumPermission`、`ensureRecordPermission`、`ensureCameraPermission` 等方法即可完成“检查授权 -> 请求授权 -> 拒绝后引导设置”的流程。

## 主题扩展

主题入口在 `src/theme/index.ts`，当前内置 `light` 和 `dark`。主题切换能力默认需要在“我的”页启用，未启用时统一使用默认浅色主题。新增主题时，在 `THEMES` 中补充主题配置，再在 `src/app.scss` 中增加对应的 `.app-theme-<name>` CSS 变量即可。页面和组件优先使用 `app-card`、`app-text-primary`、`app-text-muted`、`app-button` 等语义类，避免直接写固定颜色。

原生 tabBar 不属于页面 DOM，主题切换时通过 `Taro.setTabBarStyle` 和 `Taro.setTabBarItem` 同步颜色与图标。新增主题如果需要不同 tabBar 图标，需要准备对应 PNG 并写入主题配置的 `tabBar.list`。

## 登录守卫

路由权限配置在 `src/constants/routes.ts` 的 `ROUTE_AUTH_CONFIG`。受保护页面调用 `useAuthGuard()` 后，会在未登录时跳转到登录页，并携带当前页面作为 `redirect` 参数。登录成功后通过 `redirectAfterLogin()` 回到原页面；如果原页面是 tabBar 页面，会自动使用 `switchTab`。

## 业务模块规范

新增业务优先按 `api/endpoints/<module>.ts`、`hooks/use<Module>.ts`、`pages/<module>` 三层拆分。接口类型和 API 方法放在 endpoints，React Query 状态和缓存失效放在 hooks，页面只消费 hooks 并处理展示状态。

更完整的约定见 `docs/business-module.md`，可复制模板见 `templates/business-module`。

## 下一步建议

1. 安装依赖：`pnpm install`
2. 本地运行：`pnpm dev:weapp` 或 `pnpm dev:h5`
3. 复制 `.env.example` 为本地环境文件，并填入真实 API 地址
4. 接入真实登录接口，按账号、手机号或微信登录传入 `loginApi`
5. 补充 `refresh token` 真正的刷新逻辑
6. 按业务模块继续扩展 `api/endpoints` 和 `hooks`
