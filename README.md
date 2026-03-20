# taro-react-base

基于 `taro-react-starter-main` 的轻量思路，吸收 `boot-taro-react` 的工程化优点后整理出的新基础框架。

## 技术栈

- Taro 4
- React 18
- TypeScript 5
- TailwindCSS + weapp-tailwindcss
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
- `src/api/template/` 提供推荐的 API module + hooks 写法
- `src/components/` 提供 PageWrapper、空态、加载态、错误态等页面级基础设施

## 下一步建议

1. 安装依赖：`pnpm install`
2. 本地运行：`pnpm dev:weapp` 或 `pnpm dev:h5`
3. 接入真实登录接口，替换 `loginApi`
4. 补充 `refresh token` 真正的刷新逻辑
5. 按业务模块继续扩展 `api/endpoints` 和 `hooks`
