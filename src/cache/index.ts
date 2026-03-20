import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro'

export interface CacheSchema {
  accessToken: string
  refreshToken: string
  expiresAt: string
  privacyAgreed: boolean
}

const defaults: CacheSchema = {
  accessToken: '',
  refreshToken: '',
  expiresAt: '',
  privacyAgreed: false
}

class TypedCache {
  get<K extends keyof CacheSchema>(key: K): CacheSchema[K] {
    const value = getStorageSync(key)
    return (value === '' || value === undefined || value === null)
      ? defaults[key]
      : value
  }

  set<K extends keyof CacheSchema>(key: K, value: CacheSchema[K]) {
    setStorageSync(key, value)
  }

  remove<K extends keyof CacheSchema>(key: K) {
    removeStorageSync(key)
  }

  reset() {
    Object.keys(defaults).forEach((key) => {
      removeStorageSync(key)
    })
  }
}

export const cache = new TypedCache()
