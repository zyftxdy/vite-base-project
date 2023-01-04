import { createPinia } from 'pinia'
export { useAppStore, useAppStoreWithOut } from './modules/app'
export { useCancelStore, useCancelStoreWithOut } from './modules/cancel'
export { useMenuStore, useMenuStoreWithOut } from './modules/menu'
export { useTabStore, useTabStoreWithOut } from './modules/tab'
export { useUserStore, useUserStoreWithOut } from './modules/user'
export { useRouteParamsStore } from './modules/routeParams'

const store = createPinia()

// store.use((plugin) => {
//   console.log('pinia', plugin)
// })

export default store
