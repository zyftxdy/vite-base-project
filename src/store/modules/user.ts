import cookieCache from '@/utils/cache/auth'
import localCache from '@/utils/cache/storage'
import store from '../index'
import type { LoginRef } from '#/base'

interface userState {
  name: string
  token: string | undefined
}

export const useUserStore = defineStore('user', {
  state: (): userState => ({
    name: '',
    token: cookieCache.get()
  }),
  actions: {
    SET_TOKEN(token: string) {
      this.token = token
    },
    SET_NAME(name: string) {
      this.name = name
    },
    Login(info: LoginRef) {
      return new Promise<boolean>((resolve, reject) => {
        // 此处做登录接口
        this.SET_TOKEN('123456789')
        this.SET_NAME('admin')
        const userInfo = {
          name: 'admin',
          mobile: 13333333333,
          userId: '20211202'
        }
        localCache.set('userInfo', userInfo)
        cookieCache.set('123456789')
        resolve(true)
      })
    },
    // 前端 登出
    async FedLogOut() {
      return new Promise<void>(resolve => {
        this.SET_TOKEN('')
        localCache.remove('userInfo')
        cookieCache.remove()
        resolve()
      })
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
