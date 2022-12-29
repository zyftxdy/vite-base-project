import { defineStore } from 'pinia'
import store from '../index'
import type { RouteTab } from '@/router/types'
import type { RouteRecordName } from 'vue-router'

interface tabState {
  mainTabs: RouteTab[],
  mainTabsActiveName: RouteRecordName
}

export const useTabStore = defineStore('tab', {
  state: (): tabState => ({
    // 主入口标签页
    mainTabs: [],
    // 当前标签页名
    mainTabsActiveName: ''
  }),
  actions: {
    UPDATE_MAINTABS(tabs: RouteTab[]) {
      this.mainTabs = tabs
    },
    UPDATE_ACTIVENAME(name: RouteRecordName) {
      this.mainTabsActiveName = name
    }
  }
})

// Need to be used outside the setup
export function useTabStoreWithOut() {
  return useTabStore(store)
}
