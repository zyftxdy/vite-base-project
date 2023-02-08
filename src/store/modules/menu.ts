import { useAppStore } from '@/store'
import { menu, perms } from '@/api/modules/menu'
import { ElMessage } from 'element-plus'
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
    if (menu?.children.length >= 1) {
      temp = temp.concat(menu.children)
    }
    if (menu.type === 'DIR' && menu?.children.length >= 1) {
      menu.redirect = menu.children[0].path
    }
    if (menu.path && /\S/.test(menu.path) && menu.component) {
      // 创建路由配置
      const url = `../../views/${menu.component}.vue`
      const route: AppRouteRecordRaw = {
        path: menu.path,
        component: modules[url],
        name: menu.name,
        meta: menu.meta,
        title: menu.title,
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

interface menuState {
  navTree: RouteMenu[]
  routerData: AppRouteRecordRaw[]
  menuData: RouteMenu[]
  userPerms: string[]
}

export const useMenuStore = defineStore('menu', {
  state: (): menuState => ({
    navTree: [], // 左侧导航菜单树 -- 渲染用
    routerData: [], // router数据(处理过的menuData) -- 跳转页面用
    menuData: [], // 菜单树原始数据
    userPerms: [] // 用户权限
  }),
  actions: {
    SET_NAVTREE(navTree: RouteMenu[]) {
      // 设置导航菜单树
      this.navTree = navTree
    },
    getMenu() {
      return new Promise<AppRouteRecordRaw[]>((resolve, reject) => {
        menu()
          .then(res => {
            // const { siteName } = storeToRefs(useAppStore())
            // 后端说让前端进行菜单过滤
            // res.data = siteName.value !== 'sxxh' ?
            //   res.data.filter((item: Recordable) => item.resourceId !== '09444fd98fc1f87594') : res.data
            const data = addDynamicRoutes(res.data)
            this.menuData = res.data
            this.routerData = data
            this.getPerms()
            resolve(data)
          })
          .catch(err => {
            ElMessage.error(err)
            reject()
          })
      })
    },
    getPerms() {
      perms()
        .then(res => {
          this.userPerms = res.data
        })
        .catch(err => {
          ElMessage.error(err)
        })
    }
  }
})

// Need to be used outside the setup
export function useMenuStoreWithOut() {
  return useMenuStore(store)
}
