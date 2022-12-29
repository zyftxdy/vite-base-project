import { defineStore } from 'pinia'
import store from '../index'

const defaultLogo = 'https://quanqizhixiao-public-1251355418.cos.ap-shanghai.myqcloud.com/channel/logo.png'
const defaultLlogo = 'https://quanqizhixiao-public-1251355418.cos.ap-shanghai.myqcloud.com/channel/LOGO1.png'
const defaultBg = 'https://quanqizhixiao-public-1251355418.cos.ap-shanghai.myqcloud.com/channel/loginBg.png'

interface AppState {
  siteName: string,
  appName: string,
  appLogo: string,
  loginLogo: string,
  loginText: string,
  loginBgImg: string,
  themeColor: string,
  oldThemeColor: string,
  collapse: boolean,
  menuRouteLoaded: boolean
}

export const useAppStore = defineStore('app', () => {
  const state = reactive<AppState>({
    siteName: 'qxzx',
    appName: "全栖智校教培商户管理系统",  // 银行名称
    appLogo: defaultLogo, // 银行logo
    loginLogo: defaultLlogo, // 登陆页银行logo
    loginText: '欢迎来到全栖智校', // 登陆页欢迎语
    loginBgImg: defaultBg, // 登陆页背景
    themeColor: "#467DD8",  // 主题颜色
    oldThemeColor: "#467DD8",   // 上一次主题颜色
    collapse: false,  // 导航栏收缩状态
    menuRouteLoaded: false   // 菜单和路由是否已经加载
  })

  const setCollapse = () => {
    state.collapse = !state.collapse
  }
  const setThemeColor = (themeColor: string) => {  // 改变主题颜色
    state.oldThemeColor = state.themeColor
    state.themeColor = themeColor
  }
  const setRouteLoaded = (boole: boolean) => {  // 改变菜单和路由的加载状态
    state.menuRouteLoaded = boole
  }
  const setSiteName = (siteName: unionType) => {
    state.siteName = siteName || 'qxzx'
  }
  const SET_APPNAME = (appName: unionType) => {
    state.appName = appName || '全栖智校教培商户管理系统'
  }
  const SET_APPLOGO = (appLogo: unionType) => {
    state.appLogo  = appLogo || defaultLogo
  }
  const SET_LOGINLOGO = (loginLogo: unionType) => {
    state.loginLogo  = loginLogo || defaultLlogo
  }
  const SET_LOGINTEXT = (loginText: unionType) => {
    state.loginText  = loginText || '欢迎来到全栖智校'
  }
  const SET_LOGINBG = (loginBgImg: unionType) => {
    state.loginBgImg  = loginBgImg || defaultBg
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
