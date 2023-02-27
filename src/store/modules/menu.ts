import { baseRouters } from '@/router/base'
import store from '../index'
import type { RouteMenu } from '#/menu'
import type { AppRouteRecordRaw } from '@/router/types'

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
// import.meta.glob 动态导入，构建时，会分离为独立的 chunk
// import.meta.globEager 直接导入
const modules = import.meta.glob('../../views/**/*.vue')
const Layout = import.meta.glob('../../layout/components/page.vue')
function addDynamicRoutes(
  menuList: RouteMenu[] = []
): AppRouteRecordRaw[] {
  let routes: AppRouteRecordRaw[] = []
  for (let i = 0; i < menuList.length; i++) {
    const menu = menuList[i]
    if (menu.path && /\S/.test(menu.path) && menu.component) {
      const url = `../../views/${menu.component.replace(/(^\/)/g, '')}.vue`
      const layoutUrl = '../../layout/components/page.vue'
      let component
      if (menu.component === 'Layout' || menu.component === 'subLayout' || menu.type === 'DIR') {
        component = Layout[layoutUrl]
      } else {
        component = modules[url]
      }
      if (menu.children?.length) {
        menu.children = addDynamicRoutes(menu.children)
      }
      const route: AppRouteRecordRaw = {
        path: menu.path,
        component: component,
        name: menu.name,
        meta: menu.meta,
        redirect: menu.redirect,
        children: menu.children
      }
      routes.push(route)
    }
  }
  return routes
}

interface menuState {
  menuData: AppRouteRecordRaw[]
  userPerms: string[]
}

export const useMenuStore = defineStore('menu', {
  state: (): menuState => ({
    menuData: [],
    userPerms: []
  }),
  actions: {
    getRoutes() {
      return new Promise<AppRouteRecordRaw[]>((resolve, reject) => {
        // 此处做菜单接口请求
        this.menuData = addDynamicRoutes(baseRouters)
        this.getPerms()
        resolve(this.menuData)
      })
    },
    getPerms() {}
  }
})

// Need to be used outside the setup
export function useMenuStoreWithOut() {
  return useMenuStore(store)
}
