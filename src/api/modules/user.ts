import ZHttp from '@/utils/axios'
import type { LoginRef } from '#/base'

// 登陆
export const login = (params: LoginRef) => {
  return ZHttp.post({
    url: '/user/login',
    data: params
  })
}

// 用户列表
export const userList = (params: any) => {
  return ZHttp.get({
    url: '/user/list',
    method: 'get',
    params: params
  })
}

// 用户信息
export const userInfo = (params: any) => {
  return ZHttp.get({
    url: '/user/info',
    method: 'get',
    params: params
  })
}

// 添加用户
export const userAdd = (params: any) => {
  return ZHttp.post({
    url: '/user/add',
    method: 'post',
    data: params
  })
}

// 修改用户
export const userUpdate = (params: any) => {
  return ZHttp.post({
    url: '/user/edit',
    method: 'post',
    data: params
  })
}

// 删除用户
export const userDel = (params: any) => {
  return ZHttp.post({
    url: '/user/del',
    method: 'post',
    data: params
  })
}

// 注销用户
export const userLogout = () => {
  return ZHttp.post({
    url: '/user/logout',
    method: 'post'
  })
}
