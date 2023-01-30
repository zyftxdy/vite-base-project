import ZHttp from '@/utils/axios'

// 菜单
export const menu = () => {
  return ZHttp.get({
    url: '/resource/menu'
  })
}

// 权限
export const perms = () => {
  return ZHttp.get({
    url: '/resource/perms'
  })
}
