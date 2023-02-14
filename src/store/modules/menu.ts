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
function addDynamicRoutes(
  menuList: RouteMenu[] = [],
  routes: AppRouteRecordRaw[] = []
): AppRouteRecordRaw[] {
  let temp: RouteMenu[] = []
  for (let i = 0; i < menuList.length; i++) {
    const menu = menuList[i]
    if (menu?.children?.length) {
      temp = temp.concat(menu.children)
    }
    if (menu.type === 'DIR' && menu?.children?.length) {
      menu.redirect = menu.children[0].path
    }
    if (menu.path && /\S/.test(menu.path) && menu.component) {
      // 创建路由配置
      const url = `../../views/${menu.component.replace(/(^\/)/g, '')}.vue`
      const route: AppRouteRecordRaw = {
        path: menu.path,
        component: modules[url],
        name: menu.name,
        meta: menu.meta,
        redirect: menu.redirect
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}
function deepNavTree(navTree: RouteMenu) {
  if (navTree) {
    navTree.children = navTree.children?.filter(c => !c.hidden)
    navTree.children?.forEach(c => deepNavTree(c))
  }
}

interface menuState {
  navTree: RouteMenu[]
  routerData: AppRouteRecordRaw[]
  userPerms: string[]
}

export const useMenuStore = defineStore('menu', {
  state: (): menuState => ({
    navTree: [], // 左侧导航菜单树 -- 渲染用
    routerData: [], // router数据 -- 添加到router对象用
    userPerms: [] // 用户权限
  }),
  actions: {
    getMenu() {
      return new Promise<AppRouteRecordRaw[]>((resolve, reject) => {
        // 此处做菜单接口请求
        this.routerData = addDynamicRoutes(baseRouters)
        baseRouters.forEach(d => {
          deepNavTree(d)
        })
        this.navTree = baseRouters
        this.getPerms()
        resolve(this.routerData)
      })
    },
    getPerms() {}
  }
})

// Need to be used outside the setup
export function useMenuStoreWithOut() {
  return useMenuStore(store)
}
