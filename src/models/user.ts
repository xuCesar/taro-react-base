import { create } from 'zustand'
import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import { createSelectors } from './selectors'

interface UserState {
  accessToken: string
  isLogged: boolean
  setAccessToken: (token: string) => void
  clearAuth: () => void
}

const storage: StateStorage = {
  getItem: (key) => getStorageSync(key) ?? null,
  setItem: (key, value) => setStorageSync(key, value),
  removeItem: (key) => removeStorageSync(key)
}

const userStore = create<UserState>()(
  persist(
    (set) => ({
      accessToken: '',
      isLogged: false,
      setAccessToken: token => set({ accessToken: token, isLogged: !!token }),
      clearAuth: () => set({ accessToken: '', isLogged: false })
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => storage)
    }
  )
)

export const useUserStore = createSelectors(userStore)
