# Business Module Template

业务模块按“接口定义、数据 hooks、页面消费”拆分，页面不直接调用 `request`，也不直接拼接口地址。

## Recommended Layout

```txt
src
├── api
│   └── endpoints
│       └── order.ts
├── hooks
│   └── useOrder.ts
└── pages
    └── order
        ├── index.config.ts
        └── index.tsx
```

如果模块会继续变大，可以把页面内的局部组件放到 `src/pages/order/components`。跨页面复用的组件再提升到 `src/components`。

## Naming Rules

- 接口文件使用业务名：`src/api/endpoints/order.ts`
- hooks 文件使用 `use + 业务名`：`src/hooks/useOrder.ts`
- 接口方法使用动作后缀：`getOrderListApi`、`getOrderDetailApi`、`createOrderApi`
- hooks 使用业务语义：`useOrderList`、`useOrderDetail`、`useCreateOrder`
- query key 统一放在 `src/api/core/queryKeys.ts`，每个业务模块有自己的一级 key

## Data Flow

```txt
page -> hook -> api endpoint -> createApiModule -> request -> Taro.request
```

页面只关心 `data`、`isLoading`、`isError`、`mutate` 等状态。登录态、token 刷新、错误 toast 继续留在请求层处理。

## Add A New Module

1. 在 `src/api/core/queryKeys.ts` 增加模块 key。
2. 在 `src/api/endpoints/<module>.ts` 定义请求参数、响应类型和 API 方法。
3. 在 `src/hooks/use<Module>.ts` 封装 `useQuery` 和 `useMutation`。
4. 在 `src/pages/<module>` 消费 hooks，并复用 `PageWrapper`、`LoadingState`、`ErrorState`、`EmptyState`。
5. 开发期需要 mock 时，在 `mock/index.ts` 增加同路径接口。

可复制模板在 `templates/business-module`。
