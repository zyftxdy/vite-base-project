import { useTabStore } from '@/store'

export default function useTabs() {
  const store = useTabStore()

  const mainTabs = computed({
    get: () => store.mainTabs,
    set: val => {
      store.UPDATE_MAINTABS(val)
    }
  })
  const mainTabsActiveName = computed({
    get: () => store.mainTabsActiveName,
    set: val => {
      store.UPDATE_ACTIVENAME(val)
    }
  })

  return {
    mainTabs,
    mainTabsActiveName
  }
}
