export const queryKeys = {
  auth: {
    all: ['auth'] as const
  },
  template: {
    all: ['template'] as const,
    list: (params?: unknown) => ['template', 'list', params] as const,
    detail: (id: string) => ['template', 'detail', id] as const
  },
  user: {
    all: ['user'] as const,
    current: () => ['user', 'current'] as const
  }
}
