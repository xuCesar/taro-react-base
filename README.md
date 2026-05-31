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
├── hooks          # 业务 hooks
├── lib            # 第三方库初始化
├── models         # Zustand store
├── pages          # 页面
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

- `mock/index.ts` 提供开发期 mock 登录、刷新 token 和当前用户接口
- `src/api/core/http.ts` 提供统一错误处理和 toast 反馈
- `src/api/core/auth.ts` 提供 token 持久化、清理和 refresh token 串行刷新
- `src/api/template/` 和 `templates/business-module/` 提供推荐的业务模块写法
- `src/components/` 提供 PageWrapper、空态、加载态、错误态等页面级基础设施
- `src/theme/` 和 `src/models/theme.ts` 提供 light/dark 主题切换与持久化

## 主题扩展

主题入口在 `src/theme/index.ts`，当前内置 `light` 和 `dark`。主题切换能力默认需要在“我的”页启用，未启用时统一使用默认浅色主题。新增主题时，在 `THEMES` 中补充主题配置，再在 `src/app.scss` 中增加对应的 `.app-theme-<name>` CSS 变量即可。页面和组件优先使用 `app-card`、`app-text-primary`、`app-text-muted`、`app-button` 等语义类，避免直接写固定颜色。

原生 tabBar 不属于页面 DOM，主题切换时通过 `Taro.setTabBarStyle` 和 `Taro.setTabBarItem` 同步颜色与图标。新增主题如果需要不同 tabBar 图标，需要准备对应 PNG 并写入主题配置的 `tabBar.list`。

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
