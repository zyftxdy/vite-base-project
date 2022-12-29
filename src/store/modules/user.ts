import cookieCache from '@/utils/cache/auth'
import localCache from '@/utils/cache/storage'
import { login } from '@/api/modules/user'
import { defineStore } from 'pinia'
import store from '../index'
import type { LoginRef } from '#/base'

interface userState {
  name: string,
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
      return new Promise<any>((resolve, reject) => {
        login(info).then(res => {
          const data = res.data // token
          this.SET_TOKEN(data.token)
          this.SET_NAME(data.name)
          const userInfo = {
            name: data.name,
            mobile: data.mobile,
            userId: data.userId
          }
          localCache.set('userInfo', userInfo)
          cookieCache.set(data.token ?? '')
          resolve(res)
        }).catch(error => {
          reject(error)
        })
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
