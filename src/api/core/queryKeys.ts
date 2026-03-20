export const queryKeys = {
  auth: {
    all: ['auth'] as const
  },
  user: {
    all: ['user'] as const,
    current: () => ['user', 'current'] as const
  }
}
