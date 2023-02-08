import setting from '@/settings'
import store from '../index'

interface AppState {
  siteName: string
  appName: string
  appLogo: string
  loginLogo: string
  loginText: string
  loginBgImg: string
  themeColor: string
  collapse: boolean
  menuRouteLoaded: boolean
}

export const useAppStore = defineStore('app', () => {
  const state = reactive<AppState>({
    siteName: 'qxzx',
    appName: setting.appName, // 银行名称
    appLogo: setting.appLogo, // 银行logo
    loginLogo: setting.loginLogo, // 登陆页银行logo
    loginText: setting.loginText, // 登陆页欢迎语
    loginBgImg: setting.loginBgImg, // 登陆页背景
    themeColor: setting.themeColor, // 主题颜色
    collapse: false, // 导航栏收缩状态
    menuRouteLoaded: false // 菜单和路由是否已经加载
  })

  const setCollapse = () => {
    state.collapse = !state.collapse
  }
  const setThemeColor = (themeColor: string) => {
    // 改变主题颜色
    state.themeColor = themeColor
  }
  const setRouteLoaded = (boole: boolean) => {
    // 改变菜单和路由的加载状态
    state.menuRouteLoaded = boole
  }
  const setSiteName = (siteName: unionType) => {
    state.siteName = siteName || 'qxzx'
  }
  const SET_APPNAME = (appName: unionType) => {
    state.appName = appName || setting.appName
  }
  const SET_APPLOGO = (appLogo: unionType) => {
    state.appLogo = appLogo || setting.appLogo
  }
  const SET_LOGINLOGO = (logo: unionType) => {
    state.loginLogo = logo || setting.loginLogo
  }
  const SET_LOGINTEXT = (loginText: unionType) => {
    state.loginText = loginText || setting.loginText
  }
  const SET_LOGINBG = (loginBgImg: unionType) => {
    state.loginBgImg = loginBgImg || setting.loginBgImg
  }

  return {
    ...toRefs(state),
    setCollapse,
    setThemeColor,
    setRouteLoaded,
    setSiteName,
    SET_APPNAME,
    SET_APPLOGO,
    SET_LOGINLOGO,
    SET_LOGINTEXT,
    SET_LOGINBG
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
