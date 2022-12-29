import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { ElMessage } from 'element-plus'
import cookieCache from '@/utils/cache/auth'
import { useAppStore, useMenuStore, useUserStore } from '@/store'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import type { RouteMenu } from '#/menu'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// no redirect whitelist
const whiteList = ['/login']

router.beforeEach((to) => {
  const token = cookieCache.get()
  NProgress.start()
  if (token) {
    if (to.path === '/login') {
      return '/'
    } else {
      // 加载动态菜单和路由
      return addDynamicMenuAndRoutes(to)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      NProgress.done()
    } else {
      NProgress.done()
      return 'login'
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

/**
* 加载动态菜单和路由
*/
async function addDynamicMenuAndRoutes(to: RouteLocationNormalized) {
  const appStore = useAppStore()
  const menuStore = useMenuStore()
  const data = menuStore.routerData
  // 动态路由已存在或者没有动态改变权限的操作
  if(appStore.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return to.path === '/' ? `/${data[0].path}` : true
  }
  try {
    const data = await menuStore.getMenu()
    if (!data) {
      ElMessage.error('菜单为空，请联系管理员!')
      return loginOut()
    }
    // 保存菜单树
    menuStore.menuData.forEach(d => {
      deepNavTree(d)
    })
    // 保存
    menuStore.SET_NAVTREE(menuStore.menuData)
    // 保存加载状态
    appStore.setRouteLoaded(true)
    data.forEach(route => {
      router.addRoute('layout', route as RouteRecordRaw)
    })
    router.addRoute({path: '/:pathMatch(.*)',redirect:'/404'})
    // next({ ...to, replace: true }) 确保addRoute()时动态添加的路由已经被完全加载上去
    return to.path === '/' ? `/${data[0].path}` : { ...to, replace: true }
  } catch (err){
    return loginOut()
  }
}

function deepNavTree(navTree: RouteMenu) {
  if(navTree) {
    navTree.children = navTree.children.filter(c => !c.hidden)
    navTree.children.forEach(c => deepNavTree(c))
  }
}

async function loginOut() {
  const userStore = useUserStore()
  await userStore.FedLogOut()
  return 'login'
}
