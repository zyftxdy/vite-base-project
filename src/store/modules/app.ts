import setting from '@/settings'
import store from '../index'

interface AppState {
  appName: string
  appLogo: string
  loginLogo: string
  loginText: string
  loginBgImg: string
  themeColor: string
  menuBgColor: string
  subMenuBgColor: string
  menuRouteLoaded: boolean
}

export const useAppStore = defineStore('app', () => {
  const state = reactive<AppState>({
    appName: setting.appName,
    appLogo: setting.appLogo,
    loginLogo: setting.loginLogo,
    loginText: setting.loginText,
    loginBgImg: setting.loginBgImg,
    themeColor: setting.themeColor,
    menuBgColor: setting.menuBgColor,
    subMenuBgColor: setting.subMenuBgColor,
    menuRouteLoaded: false // 菜单和路由是否已经加载
  })

  const setThemeColor = (themeColor: string) => {
    // 改变主题颜色
    state.themeColor = themeColor
  }
  const setRouteLoaded = (boole: boolean) => {
    // 改变菜单和路由的加载状态
    state.menuRouteLoaded = boole
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
    setThemeColor,
    setRouteLoaded,
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
