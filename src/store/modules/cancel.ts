import { defineStore } from 'pinia'
import store from '@/store'
import type { Canceler } from 'axios'

export const useCancelStore = defineStore('cancel', () => {
  const cancelMap = ref<Map<string, Canceler>>(new Map())

  const addMap = (url: string, method: Canceler) => {
    cancelMap.value.set(url, method)
  }

  const removeMap = (url: string) => {
    const cancel = unref(cancelMap)
    if (!cancel.has(url)) {
      return
    }
    cancel.delete(url)
  }

  const clearMap = () => {
    const cancel = unref(cancelMap)
    for (const key of cancel.keys()) {
      cancel.get(key)?.()
    }
    cancel.clear()
  }

  return {
    cancelMap,
    addMap,
    clearMap,
    removeMap
  }
})

// Need to be used outside the setup
export function useCancelStoreWithOut() {
  return useCancelStore(store)
}
