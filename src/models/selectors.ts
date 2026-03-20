import type { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export function createSelectors<S extends UseBoundStore<StoreApi<object>>>(_store: S) {
  const store = _store as WithSelectors<typeof _store>
  store.use = {} as WithSelectors<typeof _store>['use']
  for (const key of Object.keys(store.getState())) {
    ;(store.use as Record<string, () => unknown>)[key] = () => store((state) => state[key as keyof typeof state])
  }
  return store
}
