# Mock Scenarios

开发环境启用 `@tarojs/plugin-mock` 后，`mock/index.ts` 会提供可切换的接口场景。

## Scenarios

- `success`：默认成功场景。
- `login-failed`：登录接口返回账号或密码错误。
- `unauthorized`：用户信息和 refresh token 返回 401。
- `server-error`：登录和用户信息接口返回 500。
- `empty-user`：当前用户接口返回空用户信息。
- `refresh-failed`：refresh token 返回 401。

## Switch Scenario

查看当前场景：

```bash
curl http://127.0.0.1:9527/mock/scenario
```

切换默认场景：

```bash
curl -X POST http://127.0.0.1:9527/mock/scenario \
  -H 'Content-Type: application/json' \
  -d '{"scenario":"unauthorized"}'
```

也可以只影响单次请求：

```bash
curl http://127.0.0.1:9527/user/me?scenario=server-error
```

或通过 header：

```bash
curl http://127.0.0.1:9527/user/me \
  -H 'x-mock-scenario: empty-user'
```

启动 Taro 前也可以通过环境变量设置默认场景：

```bash
TARO_APP_MOCK_SCENARIO=login-failed pnpm dev:weapp
```

`MOCK_SCENARIO` 仍然兼容，但新代码优先使用 `TARO_APP_MOCK_SCENARIO`。该变量会被配置中心读取，并在请求时自动注入 `x-mock-scenario`。
